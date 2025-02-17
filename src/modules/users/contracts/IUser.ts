// Interface of the user
export interface UserContract {
    id: string;
    firstname?: string;
    lastname?: string;
    pseudo?: string;
    email: string;
    password: string;
    salt: string;
    telnumber?: string;
    createdAt: Date;
    updatedAt: Date;

    // Setters
    setFirstname(firstname: string): void;
    setLastname(lastname: string): void;
    setPseudo(pseudo: string): void;
    setEmail(email: string): void;
    setPassword(password: string): void;
    setSalt(salt: string): void;
    setTelnumber(telnumber: string): void;
    setCreatedAt(createdAt: Date): void;
    setUpdatedAt(updatedAt: Date): void;
}