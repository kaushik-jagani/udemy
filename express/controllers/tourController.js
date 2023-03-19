const Tour = require('../models/tourModel');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    //1) Filtering
    const queryObj = { ...this.queryString };
    const excludeFeilds = ['page', 'sort', 'limit', 'fields'];
    excludeFeilds.forEach((el) => {
      delete queryObj[el];
    });

    //2) advance filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|eq)\b/g,
      (match) => `$${match}`
    );
 
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;

    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

//handlers
exports.getAllTours = async (req, res) => {
  try {
    //Build query
    //1) Filtering
    // const queryObj = {...req.query};
    // const excludeFeilds =['page','sort','limit','fields'];
    // excludeFeilds.forEach(el=>{
    //   delete queryObj[el];
    // })

    // //2) advance filtering
    // let queryStr =JSON.stringify(queryObj);
    // queryStr=queryStr.replace(/\b(gte|gt|lte|lt|eq)\b/g,match => `$${match}`);

    // //{difficultty :'easy',duration:{gte:'5}};
    // let query =Tour.find(JSON.parse(queryStr));

    //3) sorting
    // if(req.query.sort){
    //   const sortBy=req.query.sort.split(',').join(' ');
    //   query=query.sort(sortBy);
    // }else{
    //   query=query.sort('-createdAt');
    // }

    //4) feild lmitting
    // if(req.query.fields){
    //   const fields=req.query.fields.split(',').join(' ');
    //   query=query.select(fields);
    // }else{
    //   query=query.select('-__v');
    // }

    //5 paggination
    // const page=req.query.page*1 || 1;
    // const limit =req.query.limit*1 ||100;

    // const skip=(page-1)*limit;
    // query=query.skip(skip).limit(limit);

    // if(req.query.page){
    //   const numTours= await Tour.countDocuments();
    //   if(skip>=numTours) throw new Error('This page does not exist');
    // }
    //Execute The Query
    const features = new APIfeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();
    const tours = await features.query;

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
