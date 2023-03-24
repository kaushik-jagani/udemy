const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException',err => {
  console.log(err.name,err.message);
    process.exit(1);
});


dotenv.config({ path: './config.env' });
const app = require('./app2');


const DB =process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose.connect(DB,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:false
}).then(con => {
  // console.log(con.connections);
  console.log('database connection successful!!');
});

const port=process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`app is running ${port}`);
});

process.on('unhandledRejection',err => {
  console.log(err.name,err.message);
  server.close(()=>{
    process.exit(1);
  });
});
