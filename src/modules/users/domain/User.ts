// faire un contract avec l'interface de l'utilisateur (User)
import { UserContract } from '../contracts/IUser';

export class User implements UserContract {
    public id: string;
    public firstname?: string | null;
    public lastname?: string | null;
    public pseudo?: string | null;
    public email: string;
    public password: string;
    public telnumber?: string | null;
    public salt: string;

    constructor(id: string, email: string, password: string, salt: string, firstname?: string, lastname?: string, pseudo?: string, telnumber?: string) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.pseudo = pseudo;
        this.email = email;
        this.password = password; // il faut hasher le mot de passe | -> | EN COURS 
        this.telnumber = telnumber;
        this.salt = salt;
    }

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getFirstname(): string | null {
        return this.firstname;
    }

    public setFirstname(firstname: string): void {
        this.firstname = firstname;
    }

    public getLastname(): string | null {
        return this.lastname;
    }

    public setLastname(lastname: string): void {
        this.lastname = lastname;
    }

    public getPseudo(): string | null {
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

    public getTelnumber(): string | null {
        return this.telnumber;
    }

    public setTelnumber(telnumber: string): void {
        this.telnumber = telnumber;
    }

    public getSalt(): string | null {
        return this.salt;
    }

    public setSalt(salt: string): void {
        this.salt = salt;
    }
}