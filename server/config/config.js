var env=process.env.NODE_ENV || 'development';


if (env==='development' || env==='test'){
    var config=require('./config.json');
    var configVar=config[env];
    Object.keys(configVar).forEach((key)=>{
    process.env[key]=configVar[key];
    });
}
// if(env==='development'){
//     process.env.PORT=3000;
//     process.env.MONGODB_URI="mongodb://localhost:27017/TodoApp";
//
// }else if(env==='test'){
//    process.env.PORT=3000;
//    process.env.MONGODB_URI="mongodb://localhost:27017/TodoAppTest";
// }