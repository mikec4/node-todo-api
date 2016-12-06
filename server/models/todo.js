var {mongoose}=require('../db/mongoose');

var Todo=mongoose.model('Todo',{

    name:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    },

    completed:{
        type:Boolean,
        default:false
    },
    completedAt:{
        type:Number,
        default:null
    },
   _creator:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
   }

},'todos');

// var todos=new Todo({
//     name:"Michael",

// });

module.exports={Todo};