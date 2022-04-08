const socket = io("http://localhost:7000")

const message = document.getElementById('message');
const messages = document.getElementById('messages');

const myJwtId = 3; 
const roomName = '1-3'; // smallest id - biggest id
const userId = 1; // send message to userId = 3

// send message
const handleSubmitNewMessage = () => {
	socket.emit(
				'private-chat',
				{ 
					data: {
						roomName: roomName,
						from: myJwtId,
						to: userId,
						message: message.value
					}
				},
				// send message callback
				(response) => {
					console.log(response.status); // ok
				}
			)
		}

// join room
socket.emit(
	'join-room',
	{ 
		data: {
			from: myJwtId,
			roomName: roomName
		}
	},
	(response) => {
		// join-room callback
		if(response.status)
		{
			console.log("joined"); // ok
		}
		else
		{
			console.log("Error joining the room"); // ok
		}
	}
)

// receive message
socket.on("message", ({ data }) => {

	console.log(data);
	handleNewMessage(data.message);
})

const handleNewMessage = (message) => {
	messages.appendChild(buildNewMessage(message));
}

const buildNewMessage = (message) => {
	const li = document.createElement("li");
	li.appendChild(document.createTextNode(message))
	return li;
}


