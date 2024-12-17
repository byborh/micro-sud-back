// faire un contract avec l'interface de l'utilisateur (User)
import { UserContract } from '../contracts/UserContract';

export class User implements UserContract {
    public id: string;
    public firstname?: string;
    public lastname?: string;
    public pseudo?: string;
    public email: string;
    public password: string;
    public telnumber?: string;

    constructor(id: string, email: string, password: string, firstname?: string, lastname?: string, pseudo?: string, telnumber?: string) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.pseudo = pseudo;
        this.email = email;
        this.password = password; // il faut hasher le mot de passe
        this.telnumber = telnumber;
    }

    // A CHANGER :
    /* 
        Changer le type d'id, il faut le mettre en string
    */

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getFirstname(): string | undefined {
        return this.firstname;
    }

    public setFirstname(firstname: string): void {
        this.firstname = firstname;
    }

    public getLastname(): string | undefined {
        return this.lastname;
    }

    public setLastname(lastname: string): void {
        this.lastname = lastname;
    }

    public getPseudo(): string | undefined {
        return this.pseudo;
    }

    public setPseudo(pseudo: string): void {
        this.pseudo = pseudo;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public getTelnumber(): string | undefined {
        return this.telnumber;
    }

    public setTelnumber(telnumber: string): void {
        this.telnumber = telnumber;
    }
}