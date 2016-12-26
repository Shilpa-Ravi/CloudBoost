// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// configuration ===========================================
	
// config files
var db = require('./config/db');

var port = process.env.PORT || 8080; // set our port
var ipInfo ;
var ipArr=[];
// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)
function getIPAddr(){
var getIP = require('ipware')().get_ip;
	app.use(function(req, res, next) {
	    ipInfo = getIP(req);
	    console.log("ip info is",ipInfo);
	  
	   
	    // { clientIp: '127.0.0.1', clientIpRoutable: false }
	    next();

	});
}
getIPAddr();
function checkAndAdd(name) {
	//console.log("chk arr",name)
  var id = ipArr.length + 1;
  var found = ipArr.some(function (el) {
  		console.log("chk arr",el.ipInfo.clientIp ,name)
    return el.ipInfo.clientIp === name;
  });
  if (!found) { ipArr.push({ipInfo }); }
}

 app.get('/api/ip',function(req, res){
 	//adding ip related info 
 	checkAndAdd(ipInfo.clientIp);
	// ipArr.push(ipInfo);
	  console.log("val in IP arr:",ipArr)
        return res.json({ipArr });
    });

 app.post('/api/ipRemove',function(req, res){
 	getIPAddr();

 	console.log('obg to b removed',ipInfo);
 	var index = ipArr.findIndex(function(o){
     return o.ipInfo.clientIp === ipInfo.clientIp;
		})
		ipArr.splice(index, 1);
		console.log("val in IP arr:",ipArr)
 });

console.log('app info',app);

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./app/routes')(app); // pass our application into our

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app