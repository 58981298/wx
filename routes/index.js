var route_err = require("./err")
	, url = require("url")
	, path = require("path")
	, fs = require("fs")
	, crypto = require("crypto");
var markdown = require('markdown-js');

var root_views = __dirname + "/../views"

module.exports = function(app){
	// app.use(function(req, res, next) {
	//     var err = new Error('Not Found');
	//     err.status = 404;
	//     next(err);
	// });
	
	app.get("*", function(req, res){
		console.log( path.existsSync(root_views+req.url) );
		if( path.existsSync(root_views+req.url) ){
			fs.writeFileSync( path.join(root_views+req.url+"index.html")
				, markdown.makeHtml( fs.readFileSync(path.join(root_views+req.url+"index.md"),"utf-8") )
			);
			console.log( path.join(req.url+"index").substr(1) );
			res.render( path.join(req.url+"index").substr(1),{});
			// res.send( req.url );
		} else {
			res.send("safasdf");
		}
	})


	app.get('/md5/', function(req, res){
		res.send( crypto.createHash('md5').update( req.query.password ).digest('base64') );
	});
	//app.get("*", route_err.http404 );

}