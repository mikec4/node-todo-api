const {MongoClient}=require('mongodb');

var url='mongodb://localhost:27017/TodoApp';

MongoClient.connect(url,(error,db)=>{
    if(error){
        return console.log('Failed to connect to mongodb server');
    }
    
  db.collection('Users').findOneAndUpdate({name:"Michael"},{
     $set:{ 
         name:"Clara",
         sex:'Male',
         friends:['Michael','Ruki','Caro']

          },
          $inc:{
              age:1
          }
  },{
      returnOriginal:false

  }).then((res)=>{
    console.log(res);
  }).catch((err)=>{
      console.log("error",err);
  });
    
  db.close();

});