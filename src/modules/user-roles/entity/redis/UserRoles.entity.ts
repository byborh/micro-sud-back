import { UserRolesAbstract } from "../UserRoles.abstract";

export class UserRolesEntity extends UserRolesAbstract {
    user_id: string;
    role_id: string;

    constructor(user_id: string, role_id: string) {
        super({user_id, role_id});
        this.user_id = user_id;
        this.role_id = role_id;
    }

    getUser_id(): string | null {return this.user_id;}
    getRole_id(): string | null {return this.role_id;}

    setUser_id(user_id: string): void {this.user_id = user_id;}
    setRole_id(role_id: string): void {this.role_id = role_id;}
}