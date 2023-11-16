import { UserDetailsResponse } from "./dto/auth/responses/user-details-response.interface";
import { Message } from "./message.interface";

export interface Conversation {
    readonly id: number,
    readonly title: string,
    readonly description: string,
    readonly creator: UserDetailsResponse,
    messages: Message[] | undefined,
    readonly creationDate: number
}