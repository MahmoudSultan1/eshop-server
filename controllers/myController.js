var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../db');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Sample Post request
router.post('/register', function (req, res) {
  console.log("got register post request");
  var name = req.query.name;
  var password = req.query.password;
  var email = req.query.email;
  var sql = "insert into users (name, password, email) values ('"+name+"','"+password+"','"+email+"');"
  db.mycon.query(sql, function (err, result) {
    console.log(email, name,password, "Result: " + JSON.stringify(result));
    if(err){
      res.send(err);
    } else {
      res.sendStatus(200) 
    }
      });
});
router.get('/login', function (req, res) {
  console.log("login"); 
  var email = req.query.email;
  var password = req.query.password;
  let sql = "select * from users where email = '"+email+"' and password = '"+password+"';"
  db.mycon.query(sql, function (err, result) {
    console.log(result)
    if(err){
      res.sendStatus(400);
    } else {
      if(result[0]!=undefined){
        res.sendStatus(200);
      }
      else
        res.sendStatus(403);
    }
  });
});

router.get('/sentSMS', function (req, res) {
  console.log("got sentSMS");
  let sql = "update mytable set sent = 1 where ID ="+ req.query.ID+ ";";
  db.mycon.query(sql, function(err, result){
    if(err){
      res.status(400).send("error");
    }else{
      res.status(200).send({"message":"OK"});
    }
  })
});

// Added in today's session
router.post('/add', function (req, res) {
  let body = req.body; // let is like var, but scoped
  let num1 = body.num1;
  let num2 = body.num2;

  let result = num1 + num2;

  return res.json({
    "result": result
  });
});

router.get('/countrycodes', function (req, res) {
  var sql = "Select * from Country;"
  db.mycon.query(sql, function (err, result) {
    console.log("Result: " + JSON.stringify(result));
    if(err){
      res.send(err);
    }else {
      for (let i = 0; i < result.length; i++) {
        result[i]["code"] = "😂"; // Replace all country codes with annoying emoji
      }
      return res.send(result);
    }
  });
});
    


module.exports = router;
