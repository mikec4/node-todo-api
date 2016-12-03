const {ObjectId}=require('mongodb');

const mongoose=require('./../server/db/mongoose');
const {Todo}=require('./../server/models/todo');

// Todo.remove({}).then((result)=>{
    
//     console.log(result);
// }).catch((err)=>console.log(err));
var id="5841dda07aa998dcbf2a34d4";
Todo.findOneAndRemove();
Todo.findByIdAndRemove(id).then((result)=>{
        console.log(result);
}).catch((err)=>console.log(err));




  
