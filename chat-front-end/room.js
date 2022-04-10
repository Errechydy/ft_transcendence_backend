
//:::::::::::::::::::::::::::::::::::::::::::::::::::://
//:::::::::::::::::::::::::::::::::::::::::::::::::::://
//:::::::::::::::::::::::::::::::::::::::::::::::::::://
//:::::::::::::::::::::::::::::::::::::::::::::::::::://
const socket = io("http://localhost:8000")
const message = document.getElementById('message');
const messages = document.getElementById('messages');

const myJwtId = 2; 
const roomName = '2';

// send message
const handleSubmitNewMessage = () => {
	socket.emit(
				'chat-room',
				{ 
					data: {
						from: myJwtId,
						roomName: roomName,
						message: message.value
					}
				},
				// send message callback
				(response) => {
					console.log(response.status); // ok
				}
			)
		}

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



// join room
const leaveTheRoom = () => {
	socket.emit(
		'leave-room',
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
				console.log("You left this room"); // ok
			}
			else
			{
				console.log("Error leaving the room"); // ok
			}
		}
	)
}

// receive message
socket.on("message", ({ data }) => {

	// TODO: if data.from is in my blocked list then don't show this message
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
//:::::::::::::::::::::::::::::::::::::::::::::::::::://
//:::::::::::::::::::::::::::::::::::::::::::::::::::://
//:::::::::::::::::::::::::::::::::::::::::::::::::::://
//:::::::::::::::::::::::::::::::::::::::::::::::::::://
