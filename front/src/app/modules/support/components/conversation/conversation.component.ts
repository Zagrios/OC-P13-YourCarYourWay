import { Component, OnDestroy, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Message } from 'src/app/core/models/message.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { SupportService } from 'src/app/core/services/support.service';
import { switchMap, Observable, Subscription, debounceTime } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { WsConversation } from 'src/app/core/models/WsConversation.class';
import { SendMessageWs } from 'src/app/core/models/dto/support/requests/send-message-ws.interface';
import { Conversation } from 'src/app/core/models/conversation.interface';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
 
@Component({
    selector: 'app-conversation',
    templateUrl: './conversation.component.html',
    host: {
        class: "flex flex-col justify-between items-center w-full h-full max-w-4xl mx-auto"
    }
})
export class ConversationComponent implements OnDestroy {

    public readonly faArrowLeft = faArrowLeft;

    @ViewChild("messageInput")
    public messageInput!: ElementRef<HTMLInputElement>;

    public readonly messages$!: Observable<Message[]>;
    private wsConversation: WsConversation | undefined;
    public readonly currentUserId: number; 
    public readonly conversation$: Observable<Conversation>;

    private onNewMessageSub!: Subscription;

    constructor(
        private support: SupportService,
        private auth: AuthService,
        private route: ActivatedRoute,
    ) {

        const conversationId = this.route.snapshot.params["id"];

        this.conversation$ = this.support.getConversation(conversationId);
        this.currentUserId = this.auth.userData!.id;

        this.messages$ = this.support.getConversation(conversationId).pipe(
            switchMap(conversation => {
                this.wsConversation = new WsConversation(conversation);
                return this.wsConversation.messages$;
            })
        );

        this.onNewMessageSub = this.messages$.pipe(debounceTime(100)).subscribe({
            next: messages => this.scrollToMessage(messages[messages.length - 1])
        });
    }

    ngOnDestroy(): void {
        this.wsConversation?.destroy();
    }

    private scrollToMessage(message: Message): void {
        const element = document.getElementById(`message-${message.id}`);
        if(element){
            element.scrollIntoView({
                behavior: "smooth"
            });
        }
    }

    public sendMessage(message: string): void {
        if(!this.wsConversation){ throw new Error("WsConversation is not initialized"); }
        const wsMessage: SendMessageWs = { message };
        this.wsConversation.sendMessage(wsMessage);
        this.messageInput.nativeElement.value = "";
    }

    public isOwnMessage(message: Message): boolean {
        return message.sender.id === this.currentUserId;
    }

}
