var express=require('express');
var bodyParser=require('body-parser');


var {mongoose}=require('./db/mongoose');
var {User}=require('./models/User');
var {Todo}=require('./models/Todo');


var app=express();

app.use(bodyParser.json());

//post
app.post('/todos',(req,res)=>{
   
   var todo=new Todo({
       text:req.body.name
   });

   todo.save().then((docs)=>{
       res.send(docs);
   }).catch((error)=>{
       res.status(400).send(error);
   });
   
});

//get

app.get('/todos',(req,res)=>{
    
    Todo.find().then((docs)=>{
        res.send({
            docs
        });
    }).catch((err)=>{
       res.status(400).send(err);
    });
});

app.listen(3000,()=>{
    console.log('Starting port 3000');
});

module.exports={app};



