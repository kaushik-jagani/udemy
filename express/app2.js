const express = require('express');
const morgan = require('morgan');
// const rateLimit = require('express-rate-limit');
// const helmet = require('helmet');
// const mongoSanitize = require('express-mongo-sanitize');
// const xss = require('xss-clean');
// const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoute');
 
const app = express();

//1) middleware section
//middleware handle incoming requests.
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//easy to read and efficient way
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//error handling

app.all('*', (req, res, next) => {
  next(new AppError(`cant find ${req.originalUrl} on this server..`,400));
});

app.use(globalErrorHandler);

module.exports = app;
 