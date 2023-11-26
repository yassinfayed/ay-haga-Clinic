const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const bodyParser = require('body-parser');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');

// Import routes
const adminRouter = require('./routes/adminRoutes.js');
const doctorRouter = require('./routes/doctorRoutes.js');
const patientRouter = require('./routes/patientRoutes.js');
const userRouter = require('./routes/userRoutes.js');
const exampleRouter = require('./routes/exampleRoutes.js');
const familyMembersRouter = require('./routes/familyMembersRoutes.js');
const healthPackagesRouter = require('./routes/healthPackagesRoutes.js');
const appointmentRouter = require('./routes/appointmentRoutes.js');
const paymentController = require('./controllers/paymentController.js');

dotenv.config({ path: './config.env' });

// Start express app
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Socket.io logic
io.on('connection', (socket) => {
  socket.emit('me', socket.id);

  socket.on('disconnect', () => {
    socket.broadcast.emit('callEnded');
  });

  socket.on('callUser', (data) => {
    io.to(data.userToCall).emit('callUser', {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on('answerCall', (data) => {
    io.to(data.to).emit('callAccepted', data.signal);
  });
});

// MongoDB connection
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}).then((con) => {
  console.log('Connected to DB');
});

// ... (rest of your middleware and route setup)

// Set up routes
app.use('/api/v1/example', exampleRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/doctor', doctorRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/patient', patientRouter);
app.use('/api/v1/appointment', appointmentRouter);
app.use('/api/v1/familyMembers', familyMembersRouter);
app.use('/api/v1/healthPackages', healthPackagesRouter);

// Handle 404 Error
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(globalErrorHandler);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Running on port ${port}`);
});
