const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('./../utils/catchAsync.js');
//handlers
const getAllUsers =catchAsync(async (req,res,next)=>{
    const users =await User.find();
    res.status(200).json({
        status:'Success',
        results : users.length,
        data:{
            users
        }
    });
});

const getUsers =(req,res)=>{
    res.status(500).json({
        status:'Error',
        message : 'this route not defined yet!!'
    });
};

const createUsers =(req,res)=>{
    res.status(500).json({
        status:'Error',
        message : 'this route not defined yet!!'
    });
};

const updateUsers =(req,res)=>{
    res.status(500).json({
        status:'Error',
        message : 'this route not defined yet!!'
    });
};

const deleteUsers = (req,res)=>{
    res.status(500).json({
        status:'Error',
        message : 'this route not defined yet!!'
    });
};

module.exports={getAllUsers,getUsers,createUsers,deleteUsers,updateUsers}