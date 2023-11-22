import { Conversation } from "./conversation.interface";
import { Subject, Observable, shareReplay } from "rxjs"
import { Message } from "./message.interface";
// @ts-ignore
import SockJS from "sockjs-client/dist/sockjs"
import * as Stomp from 'stompjs';
import { SendMessageWs } from "./dto/support/requests/send-message-ws.interface";

export class WsConversation {

    private stompClient: Stomp.Client | undefined;

    constructor(private readonly conversation: Conversation){
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

            this.stompClient.ws.onclose = () => {
                obs.complete();
            }

            socket.onclose = () => {
                obs.complete();
            }

            return () => {
                this.stompClient?.disconnect(() => {});
                socket.close();
            }

        }).pipe(shareReplay(1));
    }

    public sendMessage(message: SendMessageWs): void {
        if(!this.stompClient){ throw new Error("Stomp client is not connected"); }
        this.stompClient!.send(`/conversation/${this.conversation.id}`, {}, JSON.stringify(message));
    }

    public destroy(): Promise<void>{
        if(!this.stompClient) { return Promise.resolve(); }

        return new Promise((resolve) => {
            this.stompClient!.disconnect(() => {
                this.stompClient?.ws.close();
                this.stompClient = undefined;
                resolve();
            });
        });
    }

}