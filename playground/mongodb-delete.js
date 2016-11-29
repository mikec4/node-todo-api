const {MongoClient}=require('mongodb');

var url='mongodb://localhost:27017/TodoApp';

MongoClient.connect(url,(error,db)=>{
  
  if(error){
      return console.log('Failde to connect to mongodb servers');
  }

   var res=db.collection('Todos').deleteOne({name:"Ruki"}).then((result)=>{
      console.log(result);
  }).catch((error)=>{
      console.log(error);
  });

   db.close();
  
});

