const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllreviews =catchAsync(async(req,res,next)=>{
    const reviwes =await Review.find();

    res.status(200).json({
        status:'success',
        results:Review.length,
        data:{
            reviews
        }
    });
});

exports.createReview = catchAsync(async (req,res,next)=>{
    const newReview = await Review.create(req.body);

    res.status(200).json({
        
    })
})
