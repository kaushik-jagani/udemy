const express =require('express')
const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json/`)
  );

//handlers
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

  
const router =express.Router();
router.route('/').get(getAllTours).post(createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
.delete(deleteTour);


module.exports= router; 
