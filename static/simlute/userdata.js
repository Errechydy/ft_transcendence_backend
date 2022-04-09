const { createServer } = require('http');

const server = createServer((req, res) => {
	res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
	
    const data = {

	"user":{
		"user_name" : "mel-gh",
		"user_id": 1,
		"avatar_file_name": "user.jpeg"

	}
      };
	res.write(JSON.stringify(data));
	return res.end();
});


server.listen(3000);
