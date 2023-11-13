const HealthPackage = require('../models/healthPackages');
const Patient = require('../models/patientModel');
const User = require('../models/userModel');
const Doctor = require('../models/doctorModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const FamilyMembers = require('../models/familyMembersModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Appointment = require('../models/appointmentModel');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
    // 1) Get the currently booked order

    const hp = await HealthPackage.findOne( {_id: req.params.id})
    const patient = await Patient.findOne({user: req.user._id})
    let id = req.user._id.toString();
    if(req.query.fm) {
        const familyMember = await FamilyMembers.findOne({_id: req.query.fm});
        id = familyMember.patient === req.user._id ? familyMember.linkedPatient: familyMember.patient;
    }
    
    let  price = hp.price
    // const familyMember = await FamilyMembers.findOne()

    if(req.query.fm && patient.package) {
        const pkg = await HealthPackage.findOne( {_id: patient.package})
        price = price * ((100-pkg.familyMemberSubDiscount)/100)
        console.log(price)
    }
    else {
        let familyMemberFound;
        const familyMembers = await FamilyMembers.find({
            $or: [
                { patient: req.user._id},
                { linkedPatient: req.user._id }
            ]
        }).populate('patient').populate('linkedPatient').exec();
        for (const familyMember of familyMembers) {
            if (familyMember.package) {
                familyMemberFound = familyMember;
            }
        }
        if(familyMemberFound) {
            const pkg = await HealthPackage.findOne( {_id: familyMemberFound.package})
            if(pkg)
                price = price * ((100-pkg.familyMemberSubDiscount)/100)
        }
    }
    // 2) Create checkout session
    const lineItems = [
        {
        price_data: {
          currency: 'usd',
          unit_amount: price * 100,
          product_data: {
            name: hp.name,
          },
        },
        quantity: 1,
    }
      ]
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      client_reference_id:id ,
      line_items: lineItems,
      mode:'payment',
      success_url: `http://localhost:3000/patients/${req.user._id}`, // Adjust success and cancel URLs
      cancel_url: `http://localhost:3000/patients/${req.user._id}`, 
      metadata: {
        hp: req.params.id
          }
    }
      
    );
    res.status(200).json({
      status: 'success',
      session,
    });
  });
  

  
  const createSubscriptionsCheckout = async session => {
    const userId = session.client_reference_id;
    
    await Patient.findOneAndUpdate({user: userId},{
        package: session.metadata.hp,
        subscriptionStatus: 'subscribed',
        renewalDate: Date.now() + 365*24*60*60*1000 //+1 year

    })
  };
  
  exports.webhookCheckout = async(req, res, next) => {
  
    const signature = req.headers['stripe-signature'];
    console.log("here")
  
    let event;
    
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
      console.log("here")
    } catch (err) {
      console.error(err);
      console.log("here")
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed'){
        if(event.data.object.metadata.reserve === "true") {
            createAppointmentReservation(event.data.object)
            
        console.log("here event")
        }
        else {
             createSubscriptionsCheckout(event.data.object);
        }
      res.status(200).json({ received: true });
    }
  };

exports.createOrder = catchAsync(async (req,res, next) => {
    const hp = await HealthPackage.findOne( {_id: req.params.id})
    const patient = await Patient.findOne({user: req.user._id})
    let id = req.user._id.toString();
    if(req.query.fm) {
        const familyMember = await FamilyMembers.findOne({_id: req.query.fm});
        id = familyMember.patient === req.user._id ? familyMember.linkedPatient: familyMember.patient;
    }
    
    let  price = hp.price

    if(req.query.fm && patient.package) {
        const pkg = await HealthPackage.findOne( {_id: patient.package})
        price = price * ((100-pkg.familyMemberSubDiscount)/100)
        console.log(price)
    }
    else {
        let familyMemberFound;
        const familyMembers = await FamilyMembers.find({
            $or: [
                { patient: req.user._id},
                { linkedPatient: req.user._id }
            ]
        }).populate('patient').populate('linkedPatient').exec();
        for (const familyMember of familyMembers) {
            if (familyMember.package) {
                familyMemberFound = familyMember;
            }
        }
        if(familyMemberFound) {
            const pkg = await HealthPackage.findOne( {_id: familyMemberFound.package})
            if(pkg)
                price = price * ((100-pkg.familyMemberSubDiscount)/100)
        }
    }
    const user = req.user
    if(req.body.paymentMethod === "wallet") {
            if(price > user.wallet) return next(new AppError("Not enough wallet", 400));

            else {
                user.wallet = user.wallet - price;
                req.body.isPaid = true;
            }
        }
        const patient2=    await Patient.findOneAndUpdate({user: id},{
                package: req.params.id,
                subscriptionStatus: 'subscribed',
                renewalDate: Date.now() + 365*24*60*60*1000 //+1 year
            })
           
        res.status(200).json({
            message: "success",
            data : {
                patient2,
                
            }
        })
});



////////////////////////////////////////////////////////////////////////////

exports.getReservationCheckoutSession = catchAsync(async (req, res, next) => {
    // 1) GET DR ID, PATIENTID

    // 2) PRICE, DATE

    // 3) SUBSCIRBED TO HP, THEN DISCOUNT (HANDLED IN FE)

    // 4) CHECK IF RESERVING FOR FAM MEMBER

    const patient = await Patient.findOne({user: req.user._id})
    const doctor = await Doctor.findById(req.params.id) //dr id
    let id = patient._id.toString();
    if(req.query.fm) {
        const familyMember = await FamilyMembers.findOne({_id: req.query.fm});
        id = familyMember.patient === req.user._id ? familyMember.linkedPatient: familyMember.patient;
    }
    
    let  price = req.params.price

    if(patient.package) {
        const pkg = await HealthPackage.findOne( {_id: patient.package})
        price = price * ((100-pkg.familyMemberSubDiscount)/100)
    }
    // 2) Create checkout session
    const lineItems = [
        {
        price_data: {
          currency: 'usd',
          unit_amount: price * 100,
          product_data: {
            name: doctor.name + 's Session',
          },
        },
        quantity: 1,
    }
      ]
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      client_reference_id:id ,
      line_items: lineItems,
      mode:'payment',
      success_url: `http://localhost:3000/patients/Appointments`, // Adjust success and cancel URLs
      cancel_url: `http://localhost:3000/patients/Appointments`, 
      metadata: {
        dr: req.params.id,
        date: req.query.date,
        reserve: "true"
          }
          
    }
      
    );
    res.status(200).json({
      status: 'success',
      session,
    });
  });   

 createAppointmentReservation = async session => {
    const patientId = session.client_reference_id;
    const doctorId = session.metadata.dr;
    const date = session.metadata.date;

    // 1 Create a new appointment
    await Appointment.create({
        patientId: patientId,
        doctorId: doctorId,
        date: date
    })

    
    console.log("here app")

    // 2 Update DR WALLET AND AVAILABILE DATES
     const doctor = await Doctor.findById(doctorId);

     const user = await User.findById(doctor.user);
     user.wallet += doctor.HourlyRate * 0.9; // +HOURLY_RATE REGARDLEESS OF DISCOUNT??

     const indexToRemove = doctor.availableDates.findIndex(
        (availableDate) => availableDate.getTime() === new Date(date).getTime()
    );

    if (indexToRemove !== -1) {
        doctor.availableDates.splice(indexToRemove, 1);
    }

    // Save the updated doctor
    await doctor.save({validateBeforeSave: false})
    await user.save({validateBeforeSave: false})

  };

  exports.createAppointmentReservation = catchAsync(async (req,res,next)  => {

    const patient = await Patient.findOne({user: req.user._id})



    const patientId = patient._id;
    const doctorId = req.params.id;
    const date = req.body.date;

    let id = patientId.toString();
    if(req.query.fm) {
        const familyMember = await FamilyMembers.findOne({_id: req.query.fm});
        id = familyMember.patient === req.user._id ? familyMember.linkedPatient: familyMember.patient;
    }
    
    let  price = req.params.price

    if(patient.package) {
        const pkg = await HealthPackage.findOne( {_id: patient.package})
        price = price * ((100-pkg.familyMemberSubDiscount)/100)
    }
    // if(req.user.wallet < price) return next(new AppError(400,"Not enough money"));

    req.user.wallet -= price;
    req.user.save({validateBeforeSave: false});


    await Appointment.create({
        patientId: id,
        doctorId: doctorId,
        date: date
    })
    
    // 2 Update DR WALLET AND AVAILABILE DATES
     const doctor = await Doctor.findById(doctorId);

     const user = await User.findById(doctor.user);
     user.wallet += doctor.HourlyRate * 0.9; // +HOURLY_RATE REGARDLEESS OF DISCOUNT??
     console.log(user.wallet)

     const indexToRemove = doctor.availableDates.findIndex(
        (availableDate) => availableDate.getTime() === new Date(date).getTime()
    );

    if (indexToRemove !== -1) {
        doctor.availableDates.splice(indexToRemove, 1);
    }

    // Save the updated doctor
    await doctor.save({validateBeforeSave: false})
    await user.save({validateBeforeSave: false})

  })
