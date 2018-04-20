/**
  * Author : Nnamdi
  * Description : Simple app to store and retrieve quotes
  *               from an online mongodb 
  **/
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoDB = require('mongodb');
// Use app - pre set
app.use(bodyParser.urlencoded({extended:true}));
//Server
var dbo;
MongoDB.connect('mongodb://user:password@ds239029.mlab.com:39029/my_first_node', (err, client) => {
  if (err) return console.log(err);
  dbo = client.db('my_first_node');
});

app.set("view engine", "ejs");


/*
 * Home Route
*/
/*
app.get('/', function(request, response){
  response.sendFile(__dirname + '/view.html');
});
*/
app.get("/", (req, res) => {
  dbo.collection('quotes').find({}, {}).toArray(function(err,result){
    if (err) throw err;
    console.log(result);
  res.render("view", {quotes: result});
});
});

/**
 * Send Route - post
 */

 app.post('/send', (request, response) => {
   dbo.collection('quotes').save(request.body, (err, result) => {
     if (err) return console.log(err);
     console.log('Saved to Database');
     console.log(request.body);
     response.redirect('/');
   })

   //console.log(request.body);
 });

app.listen(3010, () => {
  console.log("server started");
});
