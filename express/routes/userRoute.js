const express =require('express')

const {updateUsers,getAllUsers,createUsers,deleteUsers,getUsers}=require('./../controllers/userController');


const router =express.Router();

router.route('/').get(getAllUsers).post(createUsers);

router.route('/:id').get(getUsers).patch(updateUsers).delete(deleteUsers);

module.exports = router; 