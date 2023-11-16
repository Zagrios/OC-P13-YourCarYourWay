export interface UserDetailsResponse {
    readonly id: number,
    readonly username: string,
    readonly email: string
    readonly roles: string[],
}