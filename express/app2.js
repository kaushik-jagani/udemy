const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

//1) middleware section

//middleware handle incoming requests.
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hii, i am a middleware call');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2).ROUTE HANDLERS

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json/`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  //1st method
  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Innvalid Id',
    });
  }

  //2nd method
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Innvalid Id',
    });
  }

  console.log(tour);
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json/`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Innvalid Id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<updated tour here..>',
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Innvalid Id',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const getAllUsers =(req,res)=>{
    res.status(500).json({
        status:'Error',
        message : 'this function not defined yet!!'
    });
};

const getUsers =(req,res)=>{
    res.status(500).json({
        status:'Error',
        message : 'this function not defined yet!!'
    });
};

const createUsers =(req,res)=>{
    res.status(500).json({
        status:'Error',
        message : 'this function not defined yet!!'
    });
};

const updateUsers =(req,res)=>{
    res.status(500).json({
        status:'Error',
        message : 'this function not defined yet!!'
    });
};

const deleteUsers = (req,res)=>{
    res.status(500).json({
        status:'Error',
        message : 'this function not defined yet!!'
    });
};


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


const tourRouter =express.Router();
const userRouter =express.Router();

tourRouter.route('/').get(getAllTours).post(createTour);

tourRouter
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

  userRouter.route('/').get(getAllUsers).post(createUsers);

  userRouter.route('/:id').get(getUsers).patch(updateUsers).delete(deleteUsers);

app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);

// 4). START SEVER
app.listen(2000, () => {
  console.log('app is running');
});
