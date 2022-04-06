import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

@WebSocketGateway(8000, {cors: true })
export class ChatGateway {
	@WebSocketServer()
	server;

	@SubscribeMessage('chat')
	handleMessage(@MessageBody() message: string): void {
		this.server.emit('message', message);
	}
}