const EventEmitter = require('events');
const http =require('http');

class sales extends EventEmitter{
    constructor(){
        super();
    }
}
const myEmitter = new EventEmitter();

myEmitter.on("newsal",()=>{
    console.log("there was a new sale");
});

myEmitter.on("newsal",()=>{
    console.log("costumer name : kaushik");
});

myEmitter.on("newsal",stock =>{
    console.log(`there are now ${stock} items left in stock.`);
});

myEmitter.emit("newsal",10);


//***********************************//

const server =http.createServer();

server.on("request",(req,res)=>{
    console.log("request recivied");
    res.end("request recivied");
});

server.on("request",(req,res)=>{
    console.log("anther request recivied");
})

server.on("close",(req,res)=>{
    console.log("server closed");
    
})

server.listen(2000);