var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path'); 
var quote = require('./model/quote.js');
var db = 'mongodb://127.0.0.1:27017/quoteapp';

mongoose.connect(db, {useNewUrlParser : true }, (err) => {
    if(err) console.log("Error connecting to DB");
    console.log("Connected");
});
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/public/quotes.html'));
});

app.get('/viewquotes',function(req,res){
    res.sendFile(path.join(__dirname+'/viewquotes/viewquotes.html'));
});
app.get('/newquote',function(req,res){
  res.redirect('/');
});
app.post('/post',function(req,res){
  var newQuote = new quote();
  newQuote.title = req.body.title;
  newQuote.body = req.body.body;
  newQuote.author = req.body.author;
  newQuote.save(function(err,savedObject){
      if(savedObject)
      {
        res.redirect('/viewquotes')
      }
      else {
        res.send(err);
      }
  });
});

app.get('/get/quotes',function(req,res){
  quote.find({},function(err,data){
    res.send(data);
  })
});

app.post('/delete/:id/quote',function(req,res){
  quote.findOneAndDelete({_id: req.params.id},function(deleteditem){
    res.redirect('/viewquotes')
  });
});
app.listen(8081);