const express =require('express')

const {updateUsers,getAllUsers,createUsers,deleteUsers,getUsers}=require('./../controllers/userController');
const authController =require('./../controllers/authController');

const router =express.Router();
 
router.post('/signup',authController.signup);

router.route('/').get(getAllUsers).post(createUsers);

router.route('/:id').get(getUsers).patch(updateUsers).delete(deleteUsers);

module.exports = router; 