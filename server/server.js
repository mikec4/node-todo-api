var express=require('express');
var bodyParser=require('body-parser');


var {mongoose}=require('./db/mongoose');
var {User}=require('./models/User');
var {Todo}=require('./models/Todo');
var {ObjectId}=require('mongodb');




var app=express();

app.use(bodyParser.json());

//post
app.post('/todos',(req,res)=>{
   
   var todo=new Todo({
       name:req.body.name
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

//get passing a url parameter
app.get('/todos/:id',(req,res)=>{
     

    //  var id="583df7ec6d58d50816a55aa0";
      var id=req.params.id;
      
     var isValidId=ObjectId.isValid(id);

     if(!isValidId){
         return res.status(404).send('Invalid id');
     }

    Todo.findById(id).then((succ)=>{
       if(succ){
         return  res.send({succ});
       }
       return res.status(404).send(succ);
    }).catch((err)=>{
        res.status(400).send(res.body);
    });
});




app.listen(3000,()=>{
    console.log('Starting port 3000');
});

module.exports={app};



