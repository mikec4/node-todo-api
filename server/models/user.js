const {mongoose}=require('../db/mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const _=require('lodash');



// {
//   email:"clarantiringa@gmail.com",
//   password:"123",
//   tokens:[{
//       access:"auth",
//       toke:"akdkajdkddkkd"
//   }]

// }


//custom npm validator libray is installed  



var userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        minlength:1,
        trim:true,
        unique:true,
        validate:{
           validator:validator.isEmail,
           message:`{email} is not a valid email`
        }
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    tokens:[{
         access:{
             type:String,
             required:true  
         },
         token:{
             type:String,
             required:true
         }
    }]
});

userSchema.methods.toJSON=function () {
    var user=this;
    var userObject=user.toObject();
    return _.pick(userObject,['_id','email']);
}
userSchema.methods.generateAuthToken=function(){
    var user=this;
    var access='auth';
    var token=jwt.sign({_id:user._id.toHexString(),access},'mike').toString();

    user.tokens.push({access,token});

    return user.save().then(()=>{
        return token;
    });
};

var User=mongoose.model('Users',userSchema);

// var user=new User({
//       email:'clarantirniga@gmail.com '
// });

module.exports={User};