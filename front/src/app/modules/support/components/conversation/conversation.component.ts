import { Component } from '@angular/core';
// @ts-ignore
import SockJS from "sockjs-client/dist/sockjs"
import { Message } from 'src/app/core/models/message.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { SupportService } from 'src/app/core/services/support.service';
import { switchMap, Observable } from 'rxjs';
import * as Stomp from 'stompjs';
import { ActivatedRoute } from '@angular/router';
import { WsConversation } from 'src/app/core/models/WsConversation.class';
import { SendMessageWs } from 'src/app/core/models/dto/support/requests/send-message-ws.interface';
 
@Component({
    selector: 'app-conversation',
    templateUrl: './conversation.component.html'
})
export class ConversationComponent {

    public readonly messages$: Observable<Message[]>;
    private wsConversation: WsConversation | undefined;
    public readonly currentUserId: number; 

    constructor(
        private support: SupportService,
        private auth: AuthService,
        private route: ActivatedRoute
    ) {

        this.currentUserId = this.auth.userData!.id;
        const conversationId = this.route.snapshot.params["id"];

        this.messages$ = this.support.getConversation(conversationId).pipe(
            switchMap(conversation => {
                this.wsConversation = WsConversation.fromConversation(conversation);
                return this.wsConversation.messages$;
            })
        );
    }

    public sendMessage(message: string): void {
        if(!this.wsConversation){ throw new Error("WsConversation is not initialized"); }
        const wsMessage: SendMessageWs = { message };
        this.wsConversation.sendMessage(wsMessage);
    }



}
