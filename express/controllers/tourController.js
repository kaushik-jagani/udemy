const express = require('express');
const fs = require('fs');
const Tour =require('../models/tourModel');

//->use for read in local file
// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json/`)
// );

exports.checkId =(req,res,next,val)=>{
    console.log(`Tour id is ${val}`);

    if (req.params.id*1 > tours.length) {
        return res.status(404).json({
          status: 'fail',
          message: 'Innvalid Id',
        });
      }
    next();  
}

exports.checkBody =(req,res,next)=>{
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status:'fail',
            message : 'Missing Name or Body'
        });
    }
    next();
};
//handlers
exports.getAllTours = (req, res) => {
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours,
      },
    });
  };
  
  exports.getTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;
    const tour = tours.find((el) => el.id === id);
  
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
  
    console.log(tour);
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tour,
      },
    });
  };
  
  exports.createTour = (req, res) => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  };
  
  exports.updateTour = (req, res) => {
    // if (req.params.id > tours.length) {
    //   return res.status(404).json({
    //     status: 'fail',
    //     message: 'Innvalid Id',
    //   });
    // }
  
    res.status(200).json({
      status: 'success',
      data: {
        tour: '<updated tour here..>',
      },
    });
  };
  
  exports.deleteTour = (req, res) => {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  };
