// Interface of the credential data = SALT + HASHED_PASSWORD
export interface ICredentialData {
    id: string,
    userid: string,
    salt: string,
}