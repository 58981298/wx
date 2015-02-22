var route_err = require("./err")
	, url = require("url")
	, path = require("path")
	, fs = require("fs")
	, crypto = require("crypto");
var markdown = require('markdown-js');

var root_views = __dirname + "/../views"

module.exports = function(app){
	app.get("^/[^/]*/$", function(req, res){
		console.log(123123);
		if( path.existsSync(root_views+req.url) ){
			fs.writeFileSync( path.join(root_views+req.url+"index.html")
				, markdown.makeHtml( fs.readFileSync(path.join(root_views+req.url+"index.md"),"utf-8") )
			);
			console.log( path.join(req.url+"index").substr(1) );
			res.render( path.join(req.url+"index").substr(1),{});
		} else {
			res.send("Can I help you?");
		}
	})
	app.get("*", function(req, res){
		res.send("Can I help you?");
	});
}