const http =require('http');
const fs = require('fs');
const url =require('url');

//top level code execution once in allover program
const data =  fs.readFileSync('./data.json','utf-8');
const dataObj =JSON.parse(data);



const server = http.createServer((req,res)=>{
    const pathname =req.url;

    if(pathname === '/about'){
        res.end('this is home about');
    }else if(pathname === '/api'){
      
        res.writeHead(200,{'Content-type':'application/json'});
        res.end(data);
             
    }else{
        res.end('hello welcome to the local web server');
    }
})

server.listen(4000,()=>{
    console.log('local server start successfully .....');
})