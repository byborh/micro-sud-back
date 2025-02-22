import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { UserSQLEntity } from "@modules/users/entity/sql/User.entity";
import { RoleSQLEntity } from "@modules/roles/entity/sql/Role.entity";
import { UserRolesAbstract } from "../UserRoles.abstract";

@Entity("user_role")
export class UserRolesEntity extends UserRolesAbstract {
    @PrimaryColumn({ type: 'varchar', length: 255 })
    user_id: string;

    @PrimaryColumn({ type: 'varchar', length: 255 })
    role_id: string;

    @ManyToOne(() => UserSQLEntity, user => user.userRoles, { onDelete: 'CASCADE', orphanedRowAction: 'delete' }) 
    @JoinColumn({ name: 'user_id' })
    user: UserSQLEntity;

    @ManyToOne(() => RoleSQLEntity, role => role.userRoles, { onDelete: 'CASCADE', orphanedRowAction: 'delete' }) 
    @JoinColumn({ name: 'role_id' })
    role: RoleSQLEntity;

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