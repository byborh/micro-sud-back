// Interface de l'utilisateur
export interface UserContract {
    id: string;
    firstname?: string;
    lastname?: string;
    pseudo?: string;
    email: string;
    password: string;
    telnumber?: string;
}