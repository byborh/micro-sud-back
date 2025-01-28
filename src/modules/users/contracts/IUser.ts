// Interface of the user
export interface UserContract {
    id: string;
    email: string;
    password: string;
    salt: string;
    firstname?: string;
    lastname?: string;
    pseudo?: string;
    telnumber?: string;
}