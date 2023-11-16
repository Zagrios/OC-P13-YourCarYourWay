import { UserDetailsResponse } from "./dto/auth/responses/user-details-response.interface";

export interface Message {
    readonly id: number,
    readonly message: string,
    readonly creationDate: number,
    readonly sender: UserDetailsResponse
}