const dotenv =require('dotenv');
dotenv.config({path : './config.env'})
const app = require('./app2');

// console.log(app.get('env'));
console.log(process.env.PORT);
app.listen(2000, () => {
    console.log('app is running');
});
