import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {

	private messages: any = [
		{
			id: 1,
			fromName: "User 1",
			fromId: 5426,
			msg: "hello",
			timeStamp: 545656526 
		}
	]


	getChatList() : any {
		return [{
			id: 10,
			fromId: 2,
			fromName: "User 3",
			lastMsg: "hi",
			timeStamp: 65876468764 
		}]
	}

	getMessagesWith() {
		return this.messages;
	}

	saveMessage() {
		return this.messages;
	}
	
}
