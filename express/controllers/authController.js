const util =require('util');
const jwt =require('jsonwebtoken');
const User =require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const bcrypt = require('bcryptjs');

const signupToken = id=>{
   return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}
exports.signup = catchAsync(async(req,res,next)=>{
    const newUser =await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        passwordConfirm:req.body.passwordConfirm
    });
    
    const token = signupToken(newUser._id)

    res.status(201).json({
        status:'success',
        token,
        data:{
            user:newUser
        }
    });
});

exports.login = catchAsync(async(req,res,next) =>{
    const {email,password}=req.body;

    //1)Check email and password exits
    if(!email || !password){
        next(new AppError('please provide email and password',400));
    }

    //2) check if user is exist and password is correct.
     const user = await User.findOne({email}).select('+password');
    const correct = await user.correctPassword(password,user.password);

    if(!user || !correct){
        return next(new AppError('Incorrect email or password',401));
    }


    //3)if everything is fine then send token to client
    const token=signupToken(user._id);

    res.status(200).json({
        status:'success',
        token
    });
});

exports.protect =catchAsync(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startWith('Bearer')){
        token =req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return next(new AppError('you are not logged in! Please log in to get access',401));
    }

    //2)verify token
    const decoded = await util.promisify(jwt.verify(token,process.env.JWT_SECRET));


    next();
});