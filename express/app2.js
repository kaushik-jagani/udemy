const express = require('express');
const morgan = require('morgan');
const tourRouter =require('./routes/tourRoutes');
const userRouter =require('./routes/userRoute');

const app = express();

//1) middleware section

//middleware handle incoming requests.
if(process.env.NODE_ENV==='development'){

  app.use(morgan('dev')); 
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hii, i am a middleware call');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2).ROUTE HANDLERS

//3). ROUTES

// app.get('/api/v1/tours',getAllTours);

// //? after variable is use for optional routee rguments.
// //we can give multiple variable using :(colan);

// app.get('/api/v1/tours/:id/:var?',getTour);

// app.post('/api/v1/tours',createTour);

// //for update data method is put or patch
// app.patch('/api/v1/tours/:id',updateTour);

// app.delete('/api/v1/tours/:id', deleteTour);

//easy to read and efficient way

app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);

// 4). START SEVER
module.exports=app;