import { Component } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { Conversation } from 'src/app/core/models/conversation.interface';
import { SupportService } from 'src/app/core/services/support.service';

@Component({
    selector: 'app-support',
    templateUrl: './support.component.html',
})
export class SupportComponent {

    public readonly conversations: Conversation[] = [];

    constructor(
        private support: SupportService
    ) {
        lastValueFrom(this.support.getConversations()).then(conversations => {
            this.conversations.push(...conversations);
        });
    }

    public createConversation(title: string, description: string): void {
        lastValueFrom(this.support.createConversation({title, description})).then(conversation => {
            this.conversations.push(conversation);
        });
    }

}
