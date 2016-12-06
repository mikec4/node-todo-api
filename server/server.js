 require('./config/config.js')
const express=require('express');
const bodyParser=require('body-parser');
const _=require('lodash');


var {mongoose}=require('./db/mongoose');
var {User}=require('./models/user');
var {Todo}=require('./models/todo');
var {ObjectId}=require('mongodb');
var {authenticate}=require('./middleware/authenticate');

const port=process.env.PORT;


var app=express();

app.use(bodyParser.json());


//post
app.post('/todos',authenticate,(req,res)=>{
   
   var todo=new Todo({
       name:req.body.name,
       completed:req.body.completed,
       _creator:req.user._id
   });

   todo.save().then((docs)=>{
       res.send(docs);
   }).catch((error)=>{
       res.status(400).send(error);
   });
   
});

//get

app.get('/todos',authenticate,(req,res)=>{
    
    Todo.find({
        _creator:req.user._id
    }).then((docs)=>{
        res.send({
            docs
        });
    }).catch((err)=>{
       res.status(400).send(err);
    });
});

//get passing a url parameter
app.get('/todos/:id',authenticate,(req,res)=>{
     

    //  var id="583df7ec6d58d50816a55aa0";
      var id=req.params.id;
      
      
     var isValidId=ObjectId.isValid(id);

     if(!isValidId){
         return res.status(404).send('Invalid id');
     }

    Todo.findOne({
        _id:id,
        _creator:req.user._id
    }).then((succ)=>{
       if(succ){
         return  res.send({succ});
       }
       return res.status(404).send(succ);
    }).catch((err)=>{
        res.status(400).send(res.body);
    });
});

//Remove all
app.get('/todos',authenticate,(req,res)=>{

    Todo.remove({
        _creator:req.user._id
    }).then((docs)=>{
        if(docs){
            res.status(200).send({docs});
        }
    }).
    catch((err)=>res.send(err));
});

app.delete('/todos/:id',authenticate,(res,req)=>{
    //get the id
     var id=req.params.id;
     var isValid=ObjectId.isValid(id);
    //validate the id or if not return 404
     if(!isValid){
         return res.status(404).send();
     }
    //remove todo by id
    Todo.findOneAndRemove({
        _id:id,
        _creator:req.user._id
    }).then((result)=>{
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


//Post users

app.post('/users',(req,res)=>{

  var body=_.pick(req.body,['email','password']);
   
  var user=new User(body);

  user.save().then(()=>{
    //   if(!docs){
    //       return res.status(404).send();
    //   }

      return user.generateAuthToken();
  }).then((token)=>{
    
    res.header('x-auth',token).send(user);

  }).catch((err)=>{
       res.status(400).send(err);
  });
});

//Create a middleware


//private api
 app.get('/users/me',authenticate,(req,res)=>{

     // var token=req.header('x-auth');
     //  User.FindByToken(token).then((user)=>{
     //      if (!user){
     //     return Promise.reject();
     //      }
     //      return res.send(user);
     //  }).catch((e)=>{
     //      res.status(401).send();
     //  });

     res.send(req.user);
 });

 //post /users/login

 app.post('/users/login',function (req, res) {
     //first we need to get the user with same email and password as provided by the
     //logged in users
     var body=_.pick(req.body,['email','password']);
     User.FindUserByCredentials(body.email,body.password).
         then((user)=>{
          return user.generateAuthToken().then((token)=>{
               res.header('auth',token).send(user);
           });
     }).catch((e)=>{
      res.statics(400).send();
     });
 });

 //logout users
 app.delete('/users/me/token',authenticate,(req,res)=>{
     req.user.removeToken(req.token).then(()=>{
         res.status(200).send();
     },()=>{
         res.status(400).send();
     });
 });


app.listen(port,()=>{
    console.log(`Started at port  ${port}`);
});

module.exports={app};



