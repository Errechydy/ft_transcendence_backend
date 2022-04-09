var http = require('http');

var app = http.createServer(function(req,res){
    res.setHeader('Content-Type', 'application/json');



    const data = {

	"user":{
		"user_name" : "mel-ghar",
		"id": 1
	}
      };


    res.end(JSON.stringify(data));
});
app.listen(3000);
