const HealthPackage = require("../models/healthPackages");
const Patient = require("../models/patientModel");
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const FamilyMembers = require("../models/familyMembersModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Appointment = require("../models/appointmentModel");
const Notification = require("../models/notificationModel");
const Email = require("../utils/email");
const Chat = require("../models/chatModel");

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked order

  const hp = await HealthPackage.findOne({ _id: req.params.id });
  const patient = await Patient.findOne({ user: req.user._id });
  let id = req.user._id.toString();
  if (req.query.fm) {
    const familyMember = await FamilyMembers.findOne({ _id: req.query.fm });
    id =
      familyMember.patientId.toString() == patient._id.toString()
        ? familyMember.linkedPatientId
        : familyMember.patientId;
    const patientToBe = await Patient.findOne({ _id: id });
    id = patientToBe.user._id;
  }

  let price = hp.price;
  // const familyMember = await FamilyMembers.findOne()

  if (req.query.fm && patient.package) {
    const pkg = await HealthPackage.findOne({ _id: patient.package });
    price = price - (pkg.familyMemberSubDiscount * price) / 100;
  } else {
    let familyMemberFound;
    const familyMembers = await FamilyMembers.find({
      $or: [{ patientId: patient._id }, { linkedPatientId: patient._id }],
    })
      .populate("patientId")
      .populate("linkedPatientId")
      .exec();
    let pkgFound;
    for (const familyMember of familyMembers) {
      if (familyMember.patientId?.package) {
        pkgFound = familyMember.patientId.package;
      }
      if (familyMember.linkedPatientId?.package) {
        pkgFound = familyMember.linkedPatientId?.package;
      }
    }
    if (pkgFound) {
      const pkg = await HealthPackage.findOne({ _id: pkgFound });
      if (pkg) price = price - (pkg.familyMemberSubDiscount * price) / 100;
    }
  }
  // 2) Create checkout session
  const lineItems = [
    {
      price_data: {
        currency: "usd",
        unit_amount: price * 100,
        product_data: {
          name: hp.name,
        },
      },
      quantity: 1,
    },
  ];
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    client_reference_id: id?.toString(),
    line_items: lineItems,
    mode: "payment",
    success_url: `http://localhost:3000/patient/health`, // Adjust success and cancel URLs
    cancel_url: `http://localhost:3000/patient/health`,
    metadata: {
      hp: req.params.id,
      pkgBuyer: req.user._id,
    },
  });
  res.status(200).json({
    status: "success",
    session,
  });
});

const createSubscriptionsCheckout = async (session) => {
  const userId = session.client_reference_id;

  await Patient.findOneAndUpdate(
    { user: userId },
    {
      package: session.metadata.hp,
      pkgBuyer: session.metadata.pkgBuyer,
      subscriptionStatus: "subscribed",
      renewalDate: Date.now() + 365 * 24 * 60 * 60 * 1000, //+1 year
    }
  );
};

exports.webhookCheckout = async (req, res, next) => {
  const signature = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(err);

    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    if (event.data.object.metadata.reserve === "true") {
      createAppointmentReservation(event.data.object);
    } else {
      createSubscriptionsCheckout(event.data.object);
    }
    res.status(200).json({ received: true });
  }
};

exports.createOrder = catchAsync(async (req, res, next) => {
  const hp = await HealthPackage.findOne({ _id: req.params.id });
  const patient = await Patient.findOne({ user: req.user._id });
  let id = req.user._id.toString();
  if (req.query.fm) {
    const familyMember = await FamilyMembers.findOne({ _id: req.query.fm });
    id =
      familyMember.patientId.toString() == patient._id.toString()
        ? familyMember.linkedPatientId
        : familyMember.patientId;
    const patientToBe = await Patient.findOne({ _id: id });
    id = patientToBe.user._id;
  }

  let price = hp.price;

  if (req.query.fm && patient.package) {
    const pkg = await HealthPackage.findOne({ _id: patient.package });
    price = price * ((100 - pkg.familyMemberSubDiscount) / 100);
  } else {
    let familyMemberFound;
    const familyMembers = await FamilyMembers.find({
      $or: [{ patientId: patient._id }, { linkedPatientId: patient._id }],
    })
      .populate("patientId")
      .populate("linkedPatientId")
      .exec();
    let pkgFound;
    for (const familyMember of familyMembers) {
      if (familyMember.patientId?.package) {
        pkgFound = familyMember.patientId.package;
      }
      if (familyMember.linkedPatientId?.package) {
        pkgFound = familyMember.linkedPatientId?.package;
      }
    }
    if (pkgFound) {
      const pkg = await HealthPackage.findOne({ _id: pkgFound });
      if (pkg) price = price * ((100 - pkg.familyMemberSubDiscount) / 100);
    }
  }
  const user = req.user;
  if (req.body.paymentMethod === "wallet") {
    if (price > user.wallet)
      return next(new AppError("Not enough wallet", 400));
    else {
      user.wallet = user.wallet - price;
      req.body.isPaid = true;
      await user.save({ validateBeforeSave: false });
    }
  }
  const patient2 = await Patient.findOneAndUpdate(
    { user: id },
    {
      package: req.params.id,
      subscriptionStatus: "subscribed",
      renewalDate: Date.now() + 365 * 24 * 60 * 60 * 1000, //+1 year
      pkgBuyer: req.user._id,
    }
  );

  res.status(200).json({
    message: "success",
    data: {
      patient2,
    },
  });
});

////////////////////////////////////////////////////////////////////////////

exports.getReservationCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) GET DR ID, PATIENTID

  // 2) PRICE, DATE

  // 3) SUBSCIRBED TO HP, THEN DISCOUNT (HANDLED IN FE)

  // 4) CHECK IF RESERVING FOR FAM MEMBER

  const patient = await Patient.findOne({ user: req.user._id });
  const doctor = await Doctor.findById(req.params.id); //dr id
  let id = patient._id.toString();
  if (req.query.fm) {
    const familyMember = await FamilyMembers.findOne({ _id: req.query.fm });
    id =
      familyMember.patientId.toString() == patient._id.toString()
        ? familyMember.linkedPatientId
        : familyMember.patientId;
  }

  let price = parseFloat(req.params.price);
  price = parseInt(price);

  // if(patient.package) {
  //     const pkg = await HealthPackage.findOne( {_id: patient.package})
  //     price = price * ((100-pkg.doctorDiscount)/100)
  // }
  // 2) Create checkout session
  const lineItems = [
    {
      price_data: {
        currency: "usd",
        unit_amount: price * 100,
        product_data: {
          name: doctor.name + "s Session",
        },
      },
      quantity: 1,
    },
  ];
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    client_reference_id: id?.toString(),
    line_items: lineItems,
    mode: "payment",
    success_url: `http://localhost:3000/patient/appointments`, // Adjust success and cancel URLs
    cancel_url: `http://localhost:3000/patient/appointments`,
    metadata: {
      dr: req.params.id,
      date: req.query.date,
      reserve: "true",
      paidUser: req.user._id,
      paid: price,
    },
  });
  res.status(200).json({
    status: "success",
    session,
  });
});

createAppointmentReservation = async (session) => {
  const patientId = session.client_reference_id;
  const doctorId = session.metadata.dr;
  const date = session.metadata.date;

  // 1 Create a new appointment
  const appointment = await Appointment.create({
    patientId: patientId,
    doctorId: doctorId,
    date: date,
    paidUser: session.metadata.paidUser,
  });
  const existingChat = await Chat.findOne({
    members: { $all: [patientId.toString(), doctorId.toString()] },
  });

  if (!existingChat) {
    await Chat.create({
      members: [patientId.toString(), doctorId.toString()],
    });
  }

  // 2 Update DR WALLET AND AVAILABILE DATES
  const doctor = await Doctor.findById(doctorId);

  const patient = await Patient.findById(appointment.patientId);

  const user = await User.findById(doctor.user);
  user.wallet += doctor.HourlyRate * 0.9; // +HOURLY_RATE REGARDLEESS OF DISCOUNT??

  const indexToRemove = doctor.availableDates.findIndex(
    (availableDate) => availableDate.getTime() === new Date(date).getTime()
  );

  if (indexToRemove !== -1) {
    doctor.availableDates.splice(indexToRemove, 1);
  }

  // Save the updated doctor
  await doctor.save({ validateBeforeSave: false });
  await user.save({ validateBeforeSave: false });
  const userP = await User.findById(patient.user);
  const userD = await User.findById(doctor.user);
  await new Email(patient).N(appointment.date);
  await new Email(doctor).N(appointment.date);
  const newNotification = new Notification({
    title: "New Appointment",
    text:
      "Your appointment with dr." +
      doctor?.name +
      "has been reserved on: " +
      date,
    user: userP._id,
  });
  const newNotification2 = new Notification({
    title: "New Appointment",
    text:
      "New appointment with patient: " +
      patient?.name +
      " has been reserved on: " +
      date,
    user: userD._id,
  });
  await newNotification.save();
  await newNotification2.save();
};

exports.createAppointmentReservation = catchAsync(async (req, res, next) => {
  const patient = await Patient.findOne({ user: req.user._id });

  const patientId = patient._id;
  const doctorId = req.params.id;
  const date = req.body.date;

  let id = patientId.toString();
  if (req.query.fm) {
    const familyMember = await FamilyMembers.findOne({ _id: req.query.fm });
    id =
      familyMember.patientId.toString() == patient._id.toString()
        ? familyMember.linkedPatientId
        : familyMember.patientId;
  }

  let price = parseFloat(req.params.price);
  price = parseInt(price);
  // if(req.user.wallet < price) return next(new AppError(400,"Not enough money"));

  req.user.wallet -= price;
  req.user.save({ validateBeforeSave: false });

  const appointment = await Appointment.create({
    patientId: id,
    doctorId: doctorId,
    date: date,
    paidUser: req.user._id,
    paid: price,
  });

  // 2 Update DR WALLET AND AVAILABILE DATES
  const doctor = await Doctor.findById(doctorId);
  const existingChat = await Chat.findOne({
    members: { $all: [patientId.toString(), doctorId.toString()] },
  });

  if (!existingChat) {
    await Chat.create({
      members: [patientId.toString(), doctorId.toString()],
    });
  }
  const user = await User.findById(doctor.user);
  user.wallet += doctor.HourlyRate * 0.9; // +HOURLY_RATE REGARDLEESS OF DISCOUNT??

  const indexToRemove = doctor.availableDates.findIndex(
    (availableDate) => availableDate.getTime() === new Date(date).getTime()
  );

  if (indexToRemove !== -1) {
    doctor.availableDates.splice(indexToRemove, 1);
  }
  await doctor.save({ validateBeforeSave: false });
  await user.save({ validateBeforeSave: false });

  // Save the updated doctor

  res.status(200).json({ message: "success" });

  await doctor.save({ validateBeforeSave: false });
  await user.save({ validateBeforeSave: false });
  const userP = await User.findById(patient.user);
  const userD = await User.findById(doctor.user);
  await new Email(patient).N(appointment.date);
  await new Email(doctor).N(appointment.date);
  const newNotification = new Notification({
    title: "New Appointment",
    text:
      "Your appointment with dr." +
      doctor?.name +
      "has been reserved on: " +
      date,
    user: userP._id,
  });
  const newNotification2 = new Notification({
    title: "New Appointment",
    text:
      "New appointment with patient: " +
      patient?.name +
      " has been reserved on: " +
      date,
    user: userD._id,
  });
  await newNotification.save();
  await newNotification2.save();
});
