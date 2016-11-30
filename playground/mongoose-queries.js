const {ObjectId}=require('mongodb');

const mongoose=require('./../server/db/mongoose');
const {Todo}=require('./../server/models/todo');


var id="583e916bfa231240036cb8e4";
 var tester=ObjectId.isValid(id);

 if(!tester){
     console.log('The id is invalid')
 }

Todo.findById(id).then((doc)=>{
    if(!doc){
        return console.log('User not found');
    }
    console.log(doc);
}).catch((error)=>console.log(error));

