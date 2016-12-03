const express=require('express');
const bodyParser=require('body-parser');
const _=require('lodash');


var {mongoose}=require('./db/mongoose');
var {User}=require('./models/user');
var {Todo}=require('./models/todo');
var {ObjectId}=require('mongodb');

const port=process.env.PORT || 3000;


var app=express();

app.use(bodyParser.json());


//post
app.post('/todos',(req,res)=>{
   
   var todo=new Todo({
       name:req.body.name,
       completed:req.body.completed
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

//Remove all
app.get('/todos',(res,req)=>{

    Todo.remove().then((docs)=>{
        if(docs){
            res.status(200).send({docs});
        }
    }).
    catch((err)=>res.send(err));
});

app.delete('/todos/:id',(res,req)=>{
    //get the id
     var id=req.params.id;
     var isValidId=ObjectId.isValid(id);
    //validate the id or if not return 404
     if(!isValid){
         return res.status(404).send();
     }
    //remove todo by id
    Todo.findByIdAndRemove(id).then((result)=>{
        if(result){
           return res.status(200).send(result);
        }
        return res.status(404).send();
    
    }).catch((err)=>{
        res.status(400).send();
    });
    //success 
    //if no doc send 404
    //if doc found send 200 with the particular removed doc
    //error if send empty array with 400 error code
});

app.patch('/todos/:id',(req,res)=>{

    var id=req.params.id;
    var body=_.pick(req.body,['name','completed']);
      
      if(!ObjectId.isValid(id)){
          return res.status(404).send();
      }
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt=new Date().getTime();
    }
    else{
        body.completed=false;
        body.completedAt=null;
    }

     Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((result)=>{
         if(!result){
           return res.status(404).send();
         }

         return res.send({result});

     }).catch((error)=>{
           res.status(400).send();
     });


});



app.listen(port,()=>{
    console.log(`Started at port  ${port}`);
});

module.exports={app};



