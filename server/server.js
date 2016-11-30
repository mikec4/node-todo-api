var express=require('express');
var bodyParser=require('body-parser');


var {mongoose}=require('./db/mongoose');
var {User}=require('./models/User');
var {Todo}=require('./models/Todo');


var app=express();

app.use(bodyParser.json());

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

app.listen(3000,()=>{
    console.log('Starting port 3000');
});





