var {mongoose}=require('../db/mongoose');


var User=mongoose.model('Users',{
    email:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    }
},'Users');

// var user=new User({
//       email:'clarantirniga@gmail.com '
// });

module.exports={User};