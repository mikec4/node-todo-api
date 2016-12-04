const {SHA256}=require('crypto-js');
const jwt=require('jsonwebtoken');

var data={
    id:2
};
var token=jwt.sign(data,'mike');
console.log('Token',token);

var result=jwt.verify(token,'mik');
console.log('result',JSON.stringify(result).toString());