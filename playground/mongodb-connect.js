const MongoClient=require('mongodb').MongoClient;


 var promise=new Promise((resolve,reject)=>{


MongoClient.connect('mongodb://localhost:27017/TodoApp',(error,db)=>{

if(error){
  return  console.log('Unable to connect to mongodb server');
}

console.log('Connected to MongoDb ');

// db.collection('Todos').insertOne({
//     text:'Something to do',
//     completed:false

// },(error,result)=>{

// if(error){
//     return console.log('Unable to insert into Todo',error);
// }

// console.log(JSON.stringify(result.ops,undefined,2));
// });

 
db.collection('Users').insertOne({
    name:"Michael",
    age:25,
    location:"Dar es salaam"
},(error,result)=>{

   if(error){
      return reject('Failed to insert users collection');
   }
   else{

       console.log(resolve(JSON.stringify(result.ops,undefined,2)));

   }

});


db.close();

});


});

