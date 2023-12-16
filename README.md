![Logo](https://flowbite.com/docs/images/logo.svg)

# Vite Clinics

Vite Clinics is an innovative virtual healthcare platform designed to revolutionize the patient and healthcare provider experience in Egypt. By leveraging the power of digital technology, Vite Clinics facilitates a comprehensive suite of services for both doctors and patients through an accessible online portal. The platform's primary aim is to streamline the process of healthcare delivery by offering a range of functionalities from appointment scheduling to telemedicine consultations.

## Motivation

The motivation behind Vite Clinics stems from the need to improve healthcare accessibility and convenience in today's fast-paced world. Challenges such as extended wait times, travel constraints, and the difficulty of managing health records and prescriptions are addressed head-on with Vite Clinics. The platform is crafted to empower patients with immediate access to healthcare services and information, while providing doctors with a robust tool to manage their practice efficiently. The motivation is further driven by the goal to digitize health records, making them easily accessible, and to facilitate seamless communication between patients and healthcare providers.

## Build Status

- The project is currently in development.
- All core tests are passed
- The development team is utilizing GitHub for version control
- To ensure a structured and organized development process, we have adopted the GitFlow workflow.

## Code Style

### Formatting:

- Prettier: we use Prettier as an opinionated code formatter. It enforces a consistent style by parsing code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary.

### Code Reviews:

- Pull Requests: All code changes are submitted through pull requests on GitHub, which are then reviewed by peers. This process ensures adherence to our coding standards and allows for collective ownership of the code.

### Consistency:

- Naming Conventions: We use clear, meaningful variable and function names, following camelCase for JavaScript variables and functions, PascalCase for React component names, UPPER_SNAKE_CASE for constants, and kebab-case for css classes.

- File Structure: We maintain a logical file structure, grouping related files in dedicated folders, and following a consistent naming convention for files and directories.

## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

## Demo

Insert gif or link to demo

## Tech/Framework Used

![Mongo DB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)![Expree.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Node.JS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white) ![VS code](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)

### MERN stack (MongoDB, Express.js, React, Node.js)

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

### Other technologies used

- [Mongoose](https://mongoosejs.com/)
- [Redux](https://redux.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Stripe](https://stripe.com/)
- [Javascript](https://www.javascript.com/)
- [Github](https://github.com/)
- [Mailjet](https://www.mailjet.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Postman](https://www.postman.com/)
- [VSCode](https://code.visualstudio.com/)
- [tremor](https://www.tremor.so/)
- [Mailtrap](https://mailtrap.io/)

## Features

<details>
<summary>For Admins </summary>

- User Management: Ability to view, add, and manage all users on the platform, including patients, doctors, and other admins. Admins also can delete user accounts when necessary.
- Doctor Approval and Management: Oversee doctor registrations and grant approvals for new doctors joining the clinic. Admins have the ability to accept or reject doctors, including the handling of employment contracts, and Access to view and manage all doctors' details, including specializations, qualifications, and availability.
- Patient Oversight: Monitor and manage patient accounts, and have Access to view all registered patients and their medical records, appointments, and health package subscriptions.
- Appointment Management: Oversee all appointments scheduled in the clinic. Ability to view, reschedule, or cancel appointments as required for operational efficiency.
- Health Package Management: Create, update, and manage health packages offered by the clinic. Set pricing, features, and terms for each health package.
- Prescription Oversight: Monitor and manage the prescription records within the clinic. Access to all prescription details, including medication, dosage, and doctor's notes.
- Notifications and Alerts: Manage and oversee the notification system. Ensure timely and accurate delivery of notifications to patients, doctors, and other relevant parties.
- Reporting and Analytics: Access to comprehensive reports and analytics tools. Ability to generate reports on clinic operations, user activities, financial metrics, and other key performance indicators.
- Security and Data Privacy: Ensure the security and confidentiality of all user data on the platform. Implement and oversee data privacy policies in compliance with healthcare regulations.
- Feedback and Complaints Management: Address and manage feedback and complaints from users. Implement measures to improve user satisfaction and service quality.
</details>

<details>
<summary>For Doctors: </summary>

- Profile Management: Doctors can update personal information, including email, hourly rates, and hospital affiliations.
- Employment Contract Management: The ability to view and accept employment contracts digitally.
- Scheduling: Doctors can add available time slots for patient appointments.
- Patient Management: Features include viewing patient information, health records filtering patients by various criteria, and managing follow-ups.
- Appointment Management: Doctors can view, accept, filter, reschedule, and cancel appointments.
- Prescription Management: The platform allows the addition, deletion, and updating of medicines and dosages on prescriptions. Doctors can also download prescriptions in PDF format.
- Health Records: Input new health records for patients, ensuring all medical information is up-to-date and easily accessible.
</details>

<details>
<summary>For Patients: </summary>

- Appointment Management: Patients can filter appointments by date and status, view upcoming and past appointments, and manage cancellations and rescheduling.
- Health Record Access: Patients have access to their health records and prescriptions, with the ability to download them.
- Telemedicine: The platform supports video calls and chats with doctors, offering a real-time telemedicine experience.
- Health Packages: Patients can subscribe and unsubscribe to health packages which gives them discounts on appointments for them and their family members.
- Family Member Linking: Patients can add new family member or link existing patient as their own family member.
- Family Member Management: Patients can manage appointments, and Health Packages for themselves and linked family members, enhancing the platform's convenience.
</details>

<details>
<summary> Common Features for Doctors and Patients:</summary>

- Notifications: Both parties receive notifications of appointments and changes to them via the system and email.
- Communication: A chat feature is available for instant communication between patients and doctors.
- Appointment Filtering: Both roles can filter appointments by various criteria, including date and status.
- Wallet Management: Users can view the amount in their wallet, which for patients could include funds for services, and for doctors, represent earnings.

</details>

## Code Examples

<details>
    
<summary> User Login </summary>

```javascript
exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new AppError("Please provide a username and a password", 400));
  }
  const user = await User.findOne({ username }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Invalid Credentials", 401));
  }
  const doct = await Doctor.find({ user: user._id });
  if (user.role === enums.ROLE.DOCTOR && doct.isApproved === false) {
    return next(new AppError("Doctor is not approved", 400));
  }

  if (user.role === "doctor") {
    const doc = await Doctor.findOne({ user: user._id });
    user.doctor = doc;
  } else if (user.role === "patient") {
    const pat = await Patient.findOne({ user: user._id });
    user.patient = pat;
  }

  createSendToken(user, 200, req, res);
});
```

</details>

<details>
    
<summary> Appointment Cancellation </summary>

```javascript
exports.cancelAppointment = catchAsync(async (req, res, next) => {
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { status: "Cancelled" },
    {
      new: true,
    }
  )
    .populate("doctorId")
    .exec();
  const currentDate = new Date();
  const timeDifference = appointment.date.getTime() - currentDate.getTime();
  const hoursDifference = timeDifference / (1000 * 60 * 60);
  const patient = await Patient.findById(appointment.patientId);
  const userP = await User.findById(patient.user);
  const { doctorId } = await Appointment.findByIdAndUpdate(req.params.id);
  const doctor = await Doctor.findById(doctorId);
  const userD = await User.findById(appointment.doctorId.user);
  if (hoursDifference > 24 || req.user.role == "doctor") {
    userP.wallet += appointment.doctorId?.HourlyRate;
    await userP.save({ validateBeforeSave: false });

    userD.wallet -= appointment.doctorId?.HourlyRate;
    await userD.save({ validateBeforeSave: false });
  }

  doctor.availableDates.push(appointment.date);
  await doctor.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    results: 1,
    data: {
      data: appointment,
    },
  });

  await new Email(patient).cancel(appointment.date, "Cancelled");
  await new Email(doctor).cancel(appointment.date, "Cancelled");

  const newNotification = new Notification({
    title: "Appointment Cancelled",
    text: "Your appointment with dr." + doctor?.name + " has been cancelled",
    user: userP?._id,
  });

  const newNotification2 = new Notification({
    title: "Appointment Cancelled",
    text:
      "Your appointment with patient" + patient?.name + " has been cancelled",
    user: userD?._id,
  });

  await newNotification.save();
  await newNotification2.save();
});
```

</details>

<details>
    
<summary> Family Member Linking </summary>

```javascript
exports.linkFamilyMember = catchAsync(async (req, res, next) => {
  const { phone, relationToPatient, email } = req.body;
  const patient = await Patient.findOne({ user: req.user._id });
  let familymemberaspatient;
  if (email) {
    familymemberaspatient = await Patient.findOne({ email: email });
  }
  if (phone) {
    familymemberaspatient = await Patient.findOne({
      mobileNumber: phone,
    });
  }
  if (!familymemberaspatient) {
    return next(
      new AppError("No Patient found with that email or phone number", 404)
    );
  }
  const patientId = patient._id;
  const familyMemberId = familymemberaspatient._id;

  // Create a new family member instance using the Mongoose model
  const familyMember = new FamilyMember({
    name: familymemberaspatient.name,
    age: familymemberaspatient.age,
    gender: familymemberaspatient.gender,
    relationToPatient,
    patientId: patientId,
    linkedPatientId: familyMemberId,
  });

  // Save the family member to the database
  await familyMember.save();

  // Respond with a success message
  res.status(200).json({
    status: "success",
    data: {
      data: familyMember,
    },
  });
});
```

</details>

<details>
    
<summary> Downloading And Checking Prescription </summary>

```javascript
exports.downloadPrescription = catchAsync(async (req, res, next) => {
  try {
    const prescriptionId = req.params.id;
    const prescription = await Prescription.findById(prescriptionId).populate(
      "patient doctor"
    );

    if (!prescription) {
      return res.status(404).json({ error: "Prescription not found" });
    }

    const pdfDoc = new PDFDocument();
    const filename = `prescription_${prescriptionId}.pdf`;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    pdfDoc.pipe(res);

    pdfDoc.text(`Prescription Date: ${prescription.prescriptionDate}`);

    prescription.medicines.forEach((medicine, index) => {
      pdfDoc.text(`Medicine ${index + 1}: ${medicine.medicine}`);
      pdfDoc.text(`Dosage: ${medicine.dosage}`);
      pdfDoc.text(`Frequency: ${medicine.frequency}`);
      pdfDoc.text(`Start Date: ${medicine.startDate}`);
      pdfDoc.text(`End Date: ${medicine.endDate || "N/A"}`);
      pdfDoc.moveDown();
    });

    pdfDoc.text(`Instructions: ${prescription.instructions || "N/A"}`);
    pdfDoc.text(
      `Filled/Unfilled: ${prescription.filled_unfilled ? "Filled" : "Unfilled"}`
    );

    pdfDoc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

exports.checkPrescr = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });
  const patient = await Patient.findOne({ user: user._id });
  const name = req.body.medicine;
  const prescription = await Prescription.findOne({
    patientId: patient._id,
    "medicines.medicine": name,
    filled_unfilled: false,
  });

  if (!prescription) {
    return res.status(404).json({ error: "Prescription not found" });
  } else {
    prescription.filled_unfilled = true;
    await prescription.save({ validateBeforeSave: false });
    return res.status(200).json({ message: "Prescription found" });
  }
});
```

</details>

<details>
    
<summary> FamilyMember Routes </summary>

```javascript
router.use(authController.protect);
router.post(
  "/link",
  authController.restrictTo("patient"),
  familyMemberController.linkFamilyMember
);
router.post(
  "/",
  authController.restrictTo("patient"),
  familyMemberController.addFamilyMembers,
  authController.signup
);
router
  .route("/")
  .get(
    authController.restrictTo("patient"),
    familyMemberController.viewRegisteredFamilyMembers
  );
router.get(
  "/view-all-family-members",
  familyMemberController.viewAllFamilyMembersAndPatients
);
```

</details>

<details>
    
<summary> Modal </summary>

```javascript
<div
  style={{
    position: "absolute",
    width: "100vw",
    height: "100vmax",
    top: 0,
    left: 0,
    background: "rgba(0,0,0,0.75)",
    zIndex: 49,
    display: visible ? "block" : "none",
  }}
>
  <div
    style={{
      display: "flex",
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      minWidth: "500px",
      minHeight: `${famFlag ? "50px" : "500px"}`,
      zIndex: 50,
    }}
  >
    <Card className="flex flex-col flex-1 grow">
      <div className="flex flex-row w-100">
        <div
          role="button"
          onClick={() => setVisible(false)}
          className="ms-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {children}
    </Card>
  </div>
</div>
```

</details>

## API Reference

## Running Tests

We used [Postman](./Elha2ny.postman_collection.json) for API testing.

## Installation

Install with `npm`

```bash
> git clone https://github.com/advanced-computer-lab-2023/ay-haga-Clinic.git
> cd ay-haga-clinic/
> cd backend && npm i
> cd newfrontend && npm i
```

Frontend Dependencies

```bash
 "dependencies": {
    "@heroicons/react": "^2.0.18",
    "@material-tailwind/react": "^2.1.5",
    "@reduxjs/toolkit": "^1.9.5",
    "@stripe/stripe-js": "^2.2.0",
    "@tremor/react": "^3.5.0",
    "autoprefixer": "10.4.14",
    "axios": "^1.6.2",
    "eslint": "8.45.0",
    "eslint-config-next": "13.4.12",
    "heroicons": "^2.0.18",
    "lottie-react": "^2.4.0",
    "next": "13.4.12",
    "postcss": "8.4.27",
    "react": "18.2.0",
    "react-datetime-picker": "^5.6.0",
    "react-dom": "18.2.0",
    "react-icons": "^4.12.0",
    "react-ios-time-picker": "^0.2.2",
    "react-redux": "^8.1.3",
    "react-select": "^5.8.0",
    "simple-peer": "^9.11.1",
    "socket.io-client": "^4.7.2",
    "stripe": "^14.8.0",
    "tailwindcss": "3.3.3",
    "timeago.js": "^4.0.2"
  }
```

Backend Dependencies

```bash
 {
  "dependencies": {
    "archiver": "^6.0.1",
    "axios": "^1.6.2",
    "bcryptjs": "^2.4.3",
    "compression": "^1.7.4",
    "cookie-parser": "^1.4.4",
    "cors": "^2.8.5",
    "dotenv": "^7.0.0",
    "express": "^4.16.4",
    "express-mongo-sanitize": "^1.3.2",
    "express-rate-limit": "^3.5.0",
    "express-validator": "^7.0.1",
    "helmet": "^3.16.0",
    "hpp": "^0.2.2",
    "html-to-text": "^5.1.1",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.5.2",
    "morgan": "^1.9.1",
    "multer": "^1.4.4",
    "node-mailjet": "^6.0.5",
    "nodemailer": "^6.1.1",
    "nodemon": "^3.0.1",
    "pdfkit": "^0.14.0",
    "pug": "^2.0.3",
    "sharp": "^0.30.7",
    "slugify": "^1.3.4",
    "socket.io": "^4.7.2",
    "stripe": "^7.63.1",
    "validator": "^10.11.0",
    "xss-clean": "^0.1.1"
  },
  "devDependencies": {
    "eslint": "^5.16.0",
    "eslint-config-airbnb": "^17.1.0",
    "eslint-config-prettier": "^4.1.0",
    "eslint-plugin-import": "^2.17.2",
    "eslint-plugin-jsx-a11y": "^6.2.1",
    "eslint-plugin-node": "^8.0.1",
    "eslint-plugin-prettier": "^3.0.1",
    "eslint-plugin-react": "^7.12.4",
    "prettier": "^1.17.0"
  },
}
```

Make sure to configure the following environment variables in your `config.env` file:

- **NODE_ENV**: Set to "development" for the development environment.
- **PORT**: Port on which the server will run (e.g., 8000).
- **DATABASE**: MongoDB database connection URI.
- **DATABASE_PASSWORD**: Password for the MongoDB database.
- **JWT_SECRET**: Secret key for JWT token generation.
- **JWT_EXPIRES_IN**: JWT token expiration time (e.g., "90d" for 90 days).
- **JWT_COOKIES_EXPIRES_IN**: JWT cookie expiration time (e.g., "90").
- **EMAIL_USERNAME**: SMTP email username.
- **EMAIL_PASSWORD**: SMTP email password.
- **EMAIL_PORT**: SMTP email port.
- **EMAIL_HOST**: SMTP email host.
- **EMAIL_FROM**: Default "from" email address for outgoing emails.
- **SENDGRID_USERNAME**: SendGrid API username.
- **SENDGRID_PASSWORD**: SendGrid API password.
- **STRIPE_SECRET_KEY**: Stripe secret API key.
- **STRIPE_WEBHOOK_SECRET**: Stripe webhook secret.

## How To Use

```bash
> git clone https://github.com/advanced-computer-lab-2023/ay-haga-Clinic.git
> cd ay-haga-clinic/
```

open 2 terminals,
write the following in the first one:

```bash
> cd backend
> npm install
> npm start
```

write the following in the second one:

```bash
> cd newfrontend
> npm install
> npm run dev
```

## Contributing

Contributions are always welcome!
Contribution guidelines highlighting areas for improvement such as:

- Implementing responsive design for different device sizes.
- Using Mailjet templates for email communications.
- Optimizing heavy endpoints with NoSQL queries instead of manual looping.

## Credits

Acknowledgment of resources and tutorials that assisted in the project development:

- [Udemy courses for JavaScript and Node.js](https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/)
- [YouTube tutorials](https://www.youtube.com/@NetNinja)
- [ChatGPT](https://chat.openai.com/)
- [Stack Overflow](https://stackoverflow.com/)
- Technologies Documentations

## License

- [stripe](https://stripe.com/)
- [Apache 2.0] (https://www.apache.org/)
- [mailjet](https://www.mailjet.com/)
- [mailtrap](https://mailtrap.io/)
