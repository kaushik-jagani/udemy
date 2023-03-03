const express =require('express');
const fs = require('fs');

const app =express();
//middleware handle incoming requests.
app.use(express.json());

// app.get('/',(req,res)=>{
//     // res.status(200).send("hello world i am kaushik");

//     res.status(200).json({message:"value of key 1",app: "value of key 2"});
// });

// app.post('/',(req,res)=>{
//     res.status(200).send(`i am  a post method..0`);
// })

// app.get('/sex',(req,res)=>{
//     // res.status(200).send("hello world i am kaushik");

//     res.status(200).json({SexMessage:"value of sex key 1",SexApp: "value of sex key 2"});
// });

// app.post('/sex',(req,res)=>{
//     res.status(200).json({SexMessage:"value of sex key 1",SexApp: "value of sex key 2"});
// })

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json/`));

app.get('/api/v1/tours',(req,res)=>{
    res.status(200).json({
            status:'success',
            results : tours.length,
            data:{
                tours
            }
    });
});

//? after variable is use for optional routee rguments.
//we can give multiple variable using :(colan);

app.get('/api/v1/tours/:id/:var?',(req,res)=>{
    console.log(req.params);
    const id =req.params.id*1;
    const tour = tours.find((el)=> el.id===id
    )

    //1st method
    if(id > tours.length){
        return res.status(404).json({
            status : 'fail',
            message : 'Innvalid Id'
        });
    };

    //2nd method
    if(!tour){
        return res.status(404).json({
            status : 'fail',
            message : 'Innvalid Id'
        });
    };
    
    console.log(tour);
    res.status(200).json({
            status:'success',
            results : tours.length,
            data:{
               tour
            }
    });
});

app.post('/api/v1/tours',(req,res)=>{
    
    const newId =tours[tours.length-1].id+1;
    const newTour = Object.assign({id : newId},req.body);

    tours.push(newTour);
      
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json/`,JSON.stringify(tours),err =>{
        res.status(201).json({
            status:'success',
            data : {
                tour : newTour
            }
        });
    })

});

//for update data method is put or patch
app.patch('/api/v1/tours/:id', (req,res)=>{
    if(req.params.id > tours.length){
        return res.status(404).json({
            status : 'fail',
            message : 'Innvalid Id'
        });
    };

    res.status(200).json({
        status : 'success',
        data:{
            tour : '<updated tour here..>'
        }
    })
});

app.delete('/api/v1/tours/:id', (req,res)=>{
    if(req.params.id > tours.length){
        return res.status(404).json({
            status : 'fail',
            message : 'Innvalid Id'
        });
    };

    res.status(204).json({
        status : 'success',
        data: null
    });
});

app.listen(2000,()=>{
    console.log("app is running");
}) 