import { Conversation } from "./conversation.interface";
import { Subject, Observable } from "rxjs"
import { Message } from "./message.interface";
// @ts-ignore
import SockJS from "sockjs-client/dist/sockjs"
import * as Stomp from 'stompjs';
import { SendMessageWs } from "./dto/support/requests/send-message-ws.interface";

export class WsConversation {

    public static fromConversation(conversation: Conversation): WsConversation {
        return new WsConversation(conversation)
    }

    private stompClient: Stomp.Client | undefined;

    private constructor(private readonly conversation: Conversation){
        this.conversation.messages ||= [];
    }

    public get messages$(): Observable<Message[]>{ 
        return new Observable<Message[]>(obs => {

            const socket = new SockJS('http://localhost:9091/ws');
            this.stompClient = Stomp.over(socket);
            this.stompClient.connect({}, () => {

                obs.next(this.conversation.messages);
    
                this.stompClient!.subscribe(`/sub/conversation/${this.conversation.id}`, msg => {
                    const message: Message = JSON.parse(msg.body);
                    this.conversation.messages!.push(message);
                    obs.next(this.conversation.messages);
                });

            });

            socket.onclose = () => {
                obs.complete();
            }

            return () => {
                socket.close();
            }

        });
    }

    public sendMessage(message: SendMessageWs): void {
        if(!this.stompClient){ throw new Error("Stomp client is not connected"); }
        this.stompClient!.send(`/conversation/${this.conversation.id}`, {}, JSON.stringify(message));
    }

}