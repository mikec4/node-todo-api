// const MongoClient=require('mongodb').MongoClient;

var {MongoClient,ObjectID}=require('mongodb');
 
var obj=new ObjectID();
console.log(obj);
 
 var promise=new Promise((resolve,reject)=>{

 
var url='mongodb://localhost:27017/TodoApp';

MongoClient.connect(url,(error,db)=>{

if(error){
    reject('Unable to connect to mongodb server');
}


// db.collection('Todos').insertOne({
//     text:'Something to do',
//     completed:false

// },(error,result)=>{

// if(error){
//     return console.log('Unable to insert into Todo',error);
// }

// console.log(JSON.stringify(result.ops,undefined,2));
// });

 
db.collection('Todos').insertOne({
    name:"Ruki",
    age:23,
    Completed:true
},(error,result)=>{

   if(error){
      reject('Failed to insert data into users');
   }
   else{

       resolve(result.ops);

   }

});


db.close();

});




 });

 promise.then((succ)=>{
    console.log(succ);
 }).catch((error)=>{
     console.log(error);
 });