const fs =require('fs');
const crypto =require('crypto');

const start =Date.now();
process.env.UV_THREADPOOL_SIZE=1;

setTimeout(()=> console.log("Timer 1 finished"),0);
setImmediate(()=> console.log("Immediate 1 finsihed.."));


fs.readFile("test-file.txt",()=>{
    console.log("I/o finished");
    console.log("..................\n");
    setTimeout(()=>console.log("Timer 3 finished"),3000)
    setTimeout(()=> console.log("Timer 2 finished"),0);
    setImmediate(()=> console.log("Immediate 2 finsihed.."));


    process.nextTick(()=>console.log("Process nextTick"));

    crypto.pbkdf2('password','salt',100000,1024,'sha512',() => {
        console.log(Date.now()-start,'password encrypted');
    })

    crypto.pbkdf2('password','salt',100000,1024,'sha512',() => {
        console.log(Date.now()-start,'password encrypted');
    })

    crypto.pbkdf2('password','salt',100000,1024,'sha512',() => {
        console.log(Date.now()-start,'password encrypted');
    })

    crypto.pbkdf2('password','salt',100000,1024,'sha512',() => {
        console.log(Date.now()-start,'password encrypted');
    })
});

console.log("hello from top level code");