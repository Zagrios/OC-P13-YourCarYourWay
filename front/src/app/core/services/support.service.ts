import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { ApiServices } from '../models/api-services.enum';
import { Observable } from 'rxjs';
import { CreateConversationRequest } from '../models/dto/support/requests/create-conversation-request.interface';
import { Conversation } from '../models/conversation.interface';

@Injectable({
  providedIn: 'root'
})
export class SupportService {

    private readonly SERVICE = ApiServices.SUPPORT;

    constructor(
        private api: ApiService,
    ) { }

    private get<T = unknown>(action: string, params?: unknown): Observable<T> {
        return this.api.get<T>(this.SERVICE, action, params);
    }

    private post<T = unknown>(action: string, body: unknown): Observable<T> {
        return this.api.post<T>(this.SERVICE, action, body);
    }

    public getConversations(): Observable<Conversation[]> {
        return this.get('conversations');
    }

    public createConversation(req: CreateConversationRequest): Observable<Conversation> {
        return this.post('conversations', req);
    }

    public getConversation(id: number): Observable<Conversation> {
        return this.get(`conversations/${id}`);
    }

}
