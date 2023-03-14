const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs =require('fs');
const Tour =require('../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB =process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose.connect(DB,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:false
}).then(con => {
  // console.log(con.connections);
  console.log('database connection successful!!');
});

//read JSON file

const tours =JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8'));

//IMPORT DATA DB

const importData = async ()=>{
    try{
        await Tour.create(tours);
        process.exit();

    }catch(err){
        console.log(err);
        process.exit();
    }
} 

//DELETE ALL DATA FROM DATABASE

const deleteData = async ()=>{
    try{
        await Tour.deleteMany();
        process.exit();
    }catch(err){
        console.log(err);
        process.exit();
    }
}

if(process.argv[2] === '--import'){
    importData();
}else if(process.argv[2] === '--delete'){
    deleteData();
}