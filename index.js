var express = require("express")
	, path = require("path")
	, hbs = require("hbs")
	, tools = require("./libs/tools");

var routes = require("./routes");

var app = express();
tools();

hbs.registerHelper("addNull", function(num, context){
	var result = "";
	for(var i=0; i<num; i++){
		result += "&nbsp;&nbsp;&nbsp;";
	}
	return result;
});
hbs.registerHelper("format", function(dateline, context){
	return new Date(parseInt(dateline)).Format("yyyy-MM-dd hh:mm");
});
hbs.registerPartials(__dirname+"/views");

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname+"/views"));
app.set("view engine", "html");
app.engine("html", hbs.__express);

app.use("/common/", express.static(__dirname+"/static/common"));
app.use("/wx/", express.static(__dirname+"/static/weixin"));

routes(app);

app.listen(app.get("port"), function(){
	console.log("listen to "+app.get("port"));
});