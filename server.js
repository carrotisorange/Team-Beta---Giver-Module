var http = require('http');
var express = require('express');
var session = require('express-session');
var mysql = require('mysql');
var fs = require('fs');
var util = require('util');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var multipart = require('connect-multiparty');
var Datauri = require('datauri');
var BufferList = require('bl');
var dateFormat = require('dateformat');


//environments
var sess;
var app = express();
var now = new Date();
var date = dateFormat(now, 'fullDate');
var multipartMiddleware = multipart();
var datauri = new Datauri();
app.use(session({
  secret: 'secretsession',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: false
  }
}));
app.use('/',express.static(__dirname + '/'));
app.use('/static',express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine('.html', require('ejs').__express);
app.set('view engine','html');

//sql connection
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dbase',
  dateStrings: 'date'
});

app.get('/', function(request, response){
  response.render('index');
});

app.get('/give',function(request, response){
    connection.query('SELECT concat(fname, " ", lname) name,prod_image FROM users INNER JOIN products ON userid = donorid WHERE email = ?', sess.email, function(err, results, fields){
    if(err)throw err;

    response.render('give',{
    user: 'Welcome' + " " + results[0].name
    });
  });
});

app.get('/giver', function(request, response){
  connection.query('SELECT concat(fname, " ", lname) name, prodid, description, category, prod_image FROM users INNER JOIN products ON userid = donorid WHERE email = ?', sess.email, function(err, results, fields){
              if(err)throw err;
              var imgArr = [];
              var who = [];
              for(var i = 0; i < results.length; i++){
              imgArr.push(datauri.format('.png', results[i].prod_image));
              imgArr[i] = imgArr[i].content;
            }
            response.render('givemain', {
              results: results,
              user: 'Welcome' + " " + results[0].name,
              img: imgArr,
              takername: results

            });
            //renew

      });
});
app.post('/giver', function(request, response){
  sess = request.session;
  sess.email = request.body.email;
  var email = request.body.email;
  var pass = request.body.password;
  pass = crypto.createHash('md5').update(pass).digest('hex');
  connection.query('SELECT userid, email, password, status FROM users  WHERE users.email = ?', sess.email , function(error,results,fields){
      if (error) throw error;
      try{
      if(results[0].email !== undefined){
        if(pass == results[0].password){
          if(results[0].status == 'customer'){
            sess.email;
            connection.query('SELECT concat(fname, " ", lname) name, prodid, description, category, prod_image FROM users INNER JOIN products ON userid = donorid WHERE email = ?', sess.email, function(err, results, fields){
              if(err)throw err;
              var imgArr = [];
              var who = [];
              for(var i = 0; i < results.length; i++){
              imgArr.push(datauri.format('.png', results[i].prod_image));
              imgArr[i] = imgArr[i].content;
            }
            response.render('givemain', {
              results: results,
              user: 'Welcome' + " " + results[0].name,
              img: imgArr,
              takername: results

            });
            //renew

      });
    }else{response.render('errorpen');}
  }else{response.render('errorpass');}
    }}catch(err){
      response.render('errorreg');
    };
    });

});


app.get('/registration.html', function(request, response){
  response.send('registration.html');

});

app.post('/registration', function(request, response){
  var fname = request.body.fname;
  var lname = request.body.lname;
  var email = request.body.email;
  var address = request.body.address;
  var contactNum = request.body.contactnum;
  var pass = request.body.pass;
  connection.query('INSERT INTO users SET userid = (FLOOR(RAND() * 1000) + 10),fname = ?,lname = ?,email = ?, address = ?, password = ?, contactNum = ?, status = ?',[ fname,lname,email, address, contactNum, pass,'costumer'], function(err, results, fields){
      if(err)throw err;
  });
  response.redirect('registration.html');
  response.end();
});

app.post('/giveprod', multipartMiddleware, function(request, response){
  connection.query('SELECT users.userid FROM users WHERE email = ?', sess.email, function(err, result, rows){
  var prodname = request.body.prodname;
  var category = request.body.selectCateg;
  var quantity = request.body.quantity;
  fs.readFile(request.files.image.path, function(err, data){
    if(err)throw err;

    connection.query('INSERT INTO products SET description = ?, isApproved = ?, isTaken = ?, category = ?, datePosted = ?, dateApproved = ?, donorid = ?, prod_image = ?', [prodname, 'N', 'N', category, now , '0000-00-00', result[0].userid , data],  function(error,results,fields){
        if(error) throw error;
        connection.query('SELECT concat(fname, " ", lname) name, prodid, description, category, prod_image FROM users INNER JOIN products ON userid = donorid WHERE email = ?', sess.email, function(err, result, fields){
                    if(err)throw err;
                    var imgArr = [];
                    var who = [];
                    for(var i = 0; i < result.length; i++){
                    imgArr.push(datauri.format('.png', result[i].prod_image));
                    imgArr[i] = imgArr[i].content;
                  }
                  response.render('givemain', {
                    results: result,
                    user: 'Welcome' + " " + result[0].name,
                    img: imgArr,
                    takername: result

                  });
                  //renew

            });

    });
  });
  });
});


app.post('/logout', function(request,response){

  request.session.destroy(function(err) {
  if(err) {
  } else {
    response.render('index');
  }
  });
});

app.post('/gived', function(request, response){
  var json = request.body;
  var produid = Object.keys(json)[0];
  sess.prodId = produid;
  connection.query('SELECT CONCAT(fname," ",lname) name FROM users where email = ?', sess.email, function(err, qname, rows){

  connection.query('SELECT fname, lname, email, contactNum, requestId, prodid, takerid, reason, dateRequest, request.status FROM users join `request` on users.userid=request.takerid where request.prodid = ?', produid, function(err, results, rows){
    if(err)throw err;
    try{
      if(results[0].status == 'pending'){
    connection.query('SELECT * FROM products join users on users.userid = products.donorid where products.prodid = ?', produid , function(errr, result, row){
      if(err)throw err;
      response.render('givedetails', {
        user: 'Welcome '+qname[0].name,
        description: result[0].description,
        results: results,
        result: result,
        img: datauri.format('.png', result[0].prod_image).content,
        datePosted: result[0].datePosted,
        location: result[0].address,
        category: result[0].category,
        owner: result[0].fname + " " + result[0].lname,
        cNumber: result[0].contactNum,
        email: result[0].email
      });
    });}else{
      connection.query('SELECT * FROM products join users on users.userid = products.donorid where products.prodid = ?', produid , function(errr, result, row){
        if(err)throw err;
        response.render('giveaccepted', {
          user: 'Welcome '+qname[0].name,
          description: result[0].description,
          results: results,
          result: result,
          img: datauri.format('.png', result[0].prod_image).content,
          datePosted: result[0].datePosted,
          location: result[0].address,
          category: result[0].category,
          owner: result[0].fname + " " + result[0].lname,
          cNumber: result[0].contactNum,
          email: result[0].email
        });
      });
    }
  }catch(err){
    connection.query('SELECT CONCAT(fname," ",lname) name FROM users where email = ?', sess.email, function(err, qname, rows){
      connection.query('SELECT * FROM `request` join users on request.takerid=users.userid where request.prodid = ?', produid, function(err, results, rows){
        connection.query('SELECT * FROM products join users on users.userid = products.donorid where products.prodid = ?', produid , function(errr, result, row){
          response.render('givedetails', {
            user: 'Welcome '+qname[0].name,
            description: result[0].description,
            results: results,
            result: result,
            img: datauri.format('.png', result[0].prod_image).content,
            datePosted: result[0].datePosted,
            location: result[0].address,
            category: result[0].category,
            owner: result[0].fname + " " + result[0].lname,
            cNumber: result[0].contactNum,
            email: result[0].email
          });
        })
      });
      });
      }
    });
  });

});

app.post('/choose',function(request,response){
	var json = request.body;
	var key = Object.keys(json)[0];
	if(key == 'accept'){
      connection.query('SELECT * FROM `request` join users on request.takerid=users.userid where request.prodId = ?', sess.prodId, function(err, results, rows){
      for(var i = 0 ; i < results.length; i++){
        if(request.body.accept == results[i].requestId){
            connection.query('UPDATE request SET status = ? WHERE requestId = ?', ['accepted', results[i].requestId] , function(err, result, rows){
              connection.query('UPDATE products SET isTaken = ?, dateTaken = ? WHERE prodid = ?', ['Y', now, sess.prodId] , function(err, result, rows){

          if(err)throw err;
        });
        });
      }else{
        connection.query('UPDATE request SET status = ? WHERE requestId = ?', ['rejected', results[i].requestId], function(err, result, rows){
          if(err)throw err;
        });
      }
    }
   });
 };
  connection.query('SELECT CONCAT(fname," ",lname) name FROM users where email = ?', sess.email, function(err, qname, rows){
    connection.query('SELECT * FROM products join users on users.userid = products.donorid where products.prodid = ?', sess.prodId , function(errr, results, row){
      connection.query('SELECT * FROM products join users on users.userid = products.donorid where products.prodid = ?', sess.prodId, function(errr, result, row){
        response.render('giveaccepted', {
          user: 'Welcome '+qname[0].name,
          description: result[0].description,
          results: results,
          result: result,
          img: datauri.format('.png', result[0].prod_image).content,
          datePosted: result[0].datePosted,
          location: result[0].address,
          category: result[0].category,
          owner: result[0].fname + " " + result[0].lname,
          cNumber: result[0].contactNum,
          email: result[0].email
        });
      });
      });
      });
});

app.listen(8001, function () {
  console.log('Example app listening on port 8001!');
});
