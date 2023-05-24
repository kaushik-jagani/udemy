const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const factory =require('./handlerFactory');

exports.getAllreviews =catchAsync(async(req,res,next)=>{
    let filter = {};
    if(req.params.tourId) filter = {tour :  req.params.tourId} ;

    const reviwes =await Review.find(filter);

    res.status(200).json({
        status:'success',
        results:reviwes.length,
        data:{
            reviwes
        }
    });
});

exports.setTourUserIds =(req,res,next)=>{
    if(!req.body.tour) req.body.tour = req.params.tourId;

    if(!req.body.user) req.body.user = req.user.id;

    next();
};

exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
