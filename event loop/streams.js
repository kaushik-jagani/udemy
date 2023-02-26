const fs=require('fs');
const server =require('http').createServer();

server.on('request',(req,res)=>{
    //solution 1 I/O
    // fs.readFile("test-file.txt",(err,data)=>{
    //     if(err) console.log(err);
    //     res.end(data);
    // });

    //solution 2 : streams
    // const readable =fs.createReadStream("test-file.txt");
    // readable.on("data",chunk=>{
    //     res.write(chunk);
    // });
    // readable.on("end",()=>{
    //     res.end();
    // })
    // readable.on("error",(err)=>{
    //     console.log(err);
    //     res.statusCode=500;
    //     res.end("file not found!!");
    // })

    //solution 3: faster using pipe->readable and res is writable stream

     const readable =fs.createReadStream("test-file.txt"); 
     //readablesource.pipe(writeabledest)

     readable.pipe(res);
})

server.listen(4000,()=>{
    console.log('server running....');
})