
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var Mongolian = require("mongolian");
var mongolian = new Mongolian("staff.mongohq.com:10013");
var app = express();


// Get database
bd = mongolian.db("sessiondeux");

bd.auth("etiennetest", "12345678");

app.bd = bd;
// Get some collections
var posts = bd.collection("posts");
var postsdeux = bd.collection("collection");
app.posts = posts;
app.postsdeux = postsdeux;

var routes = require('./routes')(app);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/post', routes.post);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
