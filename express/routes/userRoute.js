const express =require('express')

//handlers
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


const router =express.Router();

router.route('/').get(getAllUsers).post(createUsers);

router.route('/:id').get(getUsers).patch(updateUsers).delete(deleteUsers);

module.exports = router; 