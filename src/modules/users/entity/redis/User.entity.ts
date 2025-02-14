import { UserContract } from '../../contracts/IUser';

export class UserRedisEntity implements UserContract { // I think, i'll change the name to User
    id: string;
    firstname?: string | null;
    lastname?: string | null;
    pseudo?: string | null;
    email: string;
    password: string;
    telnumber?: string | null;
    salt: string;
    createdAt: Date;
    updatedAt: Date;

    data: Record<string, any> | null;

    constructor(data: Partial<UserRedisEntity>) {
        Object.assign(this, data); // il faut commenter pour comprendre ce que c'est
    }


    // Convert object to Redis hash
    toRedisHash(): { [key: string]: string } {
        return {
            id: this.id,
            email: this.email,
            password: this.password,
            salt: this.salt,
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
            firstname: this.firstname ?? "",
            lastname: this.lastname ?? "",
            pseudo: this.pseudo ?? "",
            telnumber: this.telnumber ?? ""
        };
    }


    // Convert Redis hash to object
    static fromRedisHash(hash: { [key: string]: string }): UserRedisEntity {
        return new UserRedisEntity({
            id: hash.id,
            email: hash.email,
            password: hash.password,
            salt: hash.salt,
            createdAt: hash.createdAt ? new Date(hash.createdAt) : new Date(),
            updatedAt: hash.updatedAt ? new Date(hash.updatedAt) : new Date(),
            firstname: hash.firstname || null,
            lastname: hash.lastname || null,
            pseudo: hash.pseudo || null,
            telnumber: hash.telnumber || null
        });
    }


    getId(): string {
        return this.id;
    }

    setId(id: string): void {
        this.id = id;
    }

    getFirstname(): string | null {
        return this.firstname;
    }

    setFirstname(firstname: string): void {
        this.firstname = firstname;
    }

    getLastname(): string | null {
        return this.lastname;
    }

    setLastname(lastname: string): void {
        this.lastname = lastname;
    }

    getPseudo(): string | null {
        return this.pseudo;
    }

    setPseudo(pseudo: string): void {
        this.pseudo = pseudo;
    }

    getEmail(): string {
        return this.email;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    getPassword(): string {
        return this.password;
    }

    setPassword(password: string): void {
        this.password = password;
    }

    getTelnumber(): string | null {
        return this.telnumber;
    }

    setTelnumber(telnumber: string): void {
        this.telnumber = telnumber;
    }

    getSalt(): string | null {
        return this.salt;
    }

    setSalt(salt: string): void {
        this.salt = salt;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    setCreatedAt(date: Date): void {
        this.createdAt = date;
    }

    getUpdatedAt(): Date {
        return this.updatedAt;
    }

    setUpdatedAt(date: Date): void {
        this.updatedAt = date;
    }
}