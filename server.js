/**
 * Created by Vaidika Tibrewal on 6/7/2017.
 */
const express=require('express');
const app=express();
const bodyparser=require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
const mongodb = require('./mongodb');
app.set("view engine", "hbs");

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/trucar1';

let row=[];
let row1=[];
let row2=[];
let row3=[];
//let pro_nam=[];


app.get('/',function(req,res) {

    mongodb.fetchTo(function (row) {
        res.render('mainpage', {row:row});

    })
})
app.use('/', express.static(__dirname + "/public_static"));

var resultarray=[];
var resultarray1=[];
var resultarray2=[];
app.get('/carforbrand',function(req,res,next) {
    resultarray=[];
    console.log(req.query);
    MongoClient.connect(url, function (err, db) {

        if (err) {
            console.log(err);
        } else {
var x=req.query.value;
            console.log('connected');
            var collection = db.collection('brand')
          var cursor=collection.find({"Brand": req.query.value})
            cursor.forEach(function(doc,err){

                    if(err){
                        console.log(err);
                    }

                    else {

                        resultarray.push(doc);
                    }

            },
                function (){
                    res.render('mainpage1',{row1:resultarray});


            }

            )
        }
    })

})
app.get('/carforvariant',function(req,res,next) {
    resultarray1=[];

    console.log(req.query);
    MongoClient.connect(url, function (err, db) {

        if (err) {
            console.log(err);
        } else {

            console.log('connected');
            var collection = db.collection('variant')
            var cursor=collection.find({"Car": req.query.value})
            cursor.forEach(function(doc,err){

                    if(err){
                        console.log(err);
                    }

                    else {
console.log(doc);
                        resultarray1.push(doc);
                    }

                }


            )
        }
    })
next();
},
    function (req,res){
        res.render('mainpage2',{row2:resultarray1});


    })
var cursor;
app.get('/pricecheckbox',function(req,res) {
    resultarray2 = [];
    console.log("checkbox")
    console.log(req.query.id);
    MongoClient.connect(url, function (err, db) {

        if (err) {
            console.log(err);
        } else {

            console.log('connected');
            var collection = db.collection('variant')
            if (req.query.id == "checkbox1") {
                 cursor = collection.find({"Fuel": "Petrol"})
            }
            else if (req.query.id == "checkbox2") {
                cursor = collection.find({"Fuel": "Diesel"})
            }
            else if (req.query.id == "checkbox3") {
                cursor = collection.find({"Fuel": "CNG"})
            }else db.close();

                cursor.forEach(function (doc, err) {

                        if (err) {
                            console.log(err);
                        }

                        else {
                            resultarray2.push(doc);
                            console.log(resultarray2)
                        }

                    },
                    function () {
                        res.render('mainpage3', {row3: resultarray2});


                    }
                )


        }
    })


})

app.listen(3451,function(){
    console.log("server started at localhost:3451")
});
