const mongodb=require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017/trucar1';

MongoClient.connect(url,function (err,db) {
if(err){
    console.log(err);
}else{
    console.log('connected');}}
    )

 module.exports= {
     fetchTo: function (cb) {
         MongoClient.connect(url,function (err,db) {
             if(err){
                 console.log(err);
             }else{
                 console.log('connected');
                 var collection = db.collection('car')
                 collection.find().toArray(function (err, res) {
                     if (err) {
                         console.log(err);
                     }
                     else if (res.length) {
                         console.log(res);
                     }
                     db.close();
cb(res);
                 })

             }
         })
     },
     CarforBrand:function (cb) {
         MongoClient.connect(url,function (err,db) {
             if(err){
                 console.log(err);
             }else{
                 console.log('connected');
                 var collection = db.collection('brand')
                 collection.find().toArray(function (err, res) {
                     if (err) {
                         console.log(err);
                     }
                     else if (res.length) {
                         console.log(res);

                     }
                     cb(res);
                     db.close();

                 })

             }
         })
     }
}



