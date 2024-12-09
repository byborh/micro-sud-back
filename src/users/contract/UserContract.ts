// Interface de l'utilisateur
export interface UserContract {
    id: number;
    firstname?: string;
    lastname?: string;
    pseudo?: string;
    email: string;
    password: string;
    telnumber?: string;
}