const Tour = require('../models/tourModel');

//handlers
exports.getAllTours = async (req, res) => {
  try {
    //Build query
    const queryObj = {...req.query};
    const excludeFeilds =['page','sort','limit','fields'];

    //1st way to write mongoose query
    // const tours=await Tour.find( 
    //   {
    //     duration :5
    //   }
    // ); 
    
      //Execute The Query

    const query =Tour.find(queryObj);
    const tours = await query;

    //2nd method to write mongoose query
    // const tours = await Tour
    //   .find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      }, 
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      mesaage: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    //tour.findOne({_id:req.params.id}) ->same run above

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      mesaage: err,
    });
  }

  //1st method
  // if (id > tours.length) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'Innvalid Id',
  //   });
  // }

  // //2nd method
  // if (!tour) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'Innvalid Id',
  //   });
  // }
};

exports.createTour = async (req, res) => {
  try {
    

    // const newTour =new Tour({});
    // newTour.save().then()

    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      mesaage: 'invalid data sent!!',
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      mesaage: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      mesaage: err,
    });
  }
};
