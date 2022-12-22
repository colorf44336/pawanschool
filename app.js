const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser");
var mongoose = require('mongoose');
const { stringify } = require("querystring");
mongoose.connect("mongodb://0.0.0.0:27017/contactdance",{useNewUrlParser:true,useUnifiedTopology:true},mongoose.set('strictQuery', true))
.then(()=>{
    console.log("ok")
})
.catch((err)=>{
    console.log(err)
});
const port = 202;

var contactschema =  new mongoose.Schema({
    name:String,
    surname:String,
    phonenumber:String,
   address:String
    

});

contactschema.methods.speak = function () {
    var greeting =  "My name is " + this.name
    // console.log(greeting);
  };

  var contact = mongoose. model('contact',contactschema);


app.use('/static',express.static('static'));//for serving static files
app.use(express.urlencoded());


app.set('view engine','pug');//set the template engine as pug 
app.set('views',path.join(__dirname,"views"));//set the view directly 


app.get ('/',(req,res)=>{
   
    
    res.status(200).render('home.pug');
});
app.get ('/contact',(req,res)=>{
   
    
    res.status(200).render('contact.pug');
});
app.get ('/aboutus',(req,res)=>{
   
    
    res.status(200).render("#footer");
});
app.get ('/faculties',(req,res)=>{
   
    
    res.status(200).render('faculties.pug');
});
app.get ('/sports',(req,res)=>{
   
    
    res.status(200).render('sports.pug');
});

app.post  ('/contact',(req,res)=>{
   var mydata = new contact(req.body);
   mydata.save();
    
   
});


app.listen(port,()=>{
    console.log(`the application started successfully on port ${port}`);
});
