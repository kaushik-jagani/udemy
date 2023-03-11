const dotenv = require('dotenv');
const app = require('./app2');
const mongoose = require('mongoose');

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



const port=process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app is running ${port}`);
});
 