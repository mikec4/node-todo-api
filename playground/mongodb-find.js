// const MongoClient=require('mongodb').MongoClient;

var {MongoClient,ObjectID}=require('mongodb');
 

 
var url='mongodb://localhost:27017/TodoApp';

MongoClient.connect(url,(error,db)=>{

    if(error){
        return console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to mongodb server');
   
  var promise= db.collection('Todos').find({name:"mike"}).toArray();
  
  promise.then((docs)=>{
      
      console.log(JSON.stringify(docs,undefined,2));
  },(error)=>{
      console.log('error',error);
  });
   db.close();

});





