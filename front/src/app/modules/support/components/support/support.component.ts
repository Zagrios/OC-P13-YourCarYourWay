import { Component, ViewChild, ElementRef } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { Conversation } from 'src/app/core/models/conversation.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { SupportService } from 'src/app/core/services/support.service';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-support',
    templateUrl: './support.component.html',
    host: {
        class: "flex flex-col justify-between items-center w-full h-full"
    }
})
export class SupportComponent {

    public readonly faChevronDown = faChevronDown;
    public readonly faChevronUp = faChevronUp;

    public readonly conversations: Conversation[] = [];

    @ViewChild('title') titleInput!: ElementRef;
    @ViewChild('description') descriptionInput!: ElementRef;

    public openConvForm = false;

    constructor(
        private support: SupportService,
        private auth: AuthService
    ) {
        lastValueFrom(this.support.getConversations()).then(conversations => {
            this.conversations.push(...conversations);
        });
    }

    public createConversation(title: string, description: string): void {
        lastValueFrom(this.support.createConversation({title, description})).then(conversation => {
            this.conversations.push(conversation);

            this.openConvForm = false;
            this.titleInput.nativeElement.value = '';
            this.descriptionInput.nativeElement.value = '';
        });
    }

}
