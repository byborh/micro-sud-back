import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { RoleContract } from "../contracts/IRole";
import { UserRoles } from "@modules/userRoles/entity/UserRoles.entity";

@Entity("roles")
export class Role implements RoleContract {
    @PrimaryColumn()
    id: string;
    @Column()
    name: string;
    @Column()
    description: string;

    @OneToMany(() => UserRoles, userRole => userRole.role) // ADD Cascade
    userRoles: UserRoles[];

    // @OneToMany(() => RolePermission, rolePermission => rolePermission.role)
    // rolePermissions: RolePermission[];

    constructor(id: string, name: string, description: string) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public getId(): string { return this.id; }
    public getName(): string { return this.name; }
    public getDescription(): string { return this.description; }

    public setId(id: string): void { this.id = id; }
    public setName(name: string): void { this.name = name; }
    public setDescription(description: string): void { this.description = description; }
}