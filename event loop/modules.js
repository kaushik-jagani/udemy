// console.log(arguments);
// console.log(require("module").wrapper); 
// --------------------

// const C =require('./test-module');
// const calc1 = new C();
// console.log(calc1.add(2,8));
// ------------------------

// const kj =require('./test-module2');
// console.log(kj.add(10,20));
// console.log(kj.multiply(10,20));
// console.log(kj.divide(10,20));
// ----------------------------

const {add,multiply,divide}=require('./test-module2');
console.log(add(10,20));
console.log(multiply(10,20));
console.log(divide(10,20));
// ---------------------------------

//caching
require('./test-module3')(); 
require('./test-module3')(); 
