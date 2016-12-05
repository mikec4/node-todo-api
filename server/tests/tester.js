

const bycript=require('bcryptjs');

var password='mike';

bycript.genSalt(10,(err,salt)=>{
     bycript.hash(password,salt,(err,hash)=>{
           console.log('hash',hash);
     });

});

