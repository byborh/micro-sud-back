import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { UserRolesContract } from "../../contracts/IUserRoles";
import { UserSQLEntity } from "@modules/users/entity/sql/User.entity";
import { RoleRedisEntity } from "@modules/roles/entity/sql/Role.entity";

@Entity("user_role")
export class UserRoles implements UserRolesContract {
    @PrimaryColumn({ type: 'varchar', length: 255 })
    user_id: string;

    @PrimaryColumn({ type: 'varchar', length: 255 })
    role_id: string;

    @ManyToOne(() => UserSQLEntity, user => user.userRoles, { onDelete: 'CASCADE', orphanedRowAction: 'delete' }) 
    @JoinColumn({ name: 'user_id' })
    user: UserSQLEntity;

    @ManyToOne(() => RoleRedisEntity, role => role.userRoles, { onDelete: 'CASCADE', orphanedRowAction: 'delete' }) 
    @JoinColumn({ name: 'role_id' })
    role: RoleRedisEntity;

    constructor(user_id: string, role_id: string) {
        this.user_id = user_id;
        this.role_id = role_id;
    }


    getUser_id(): string | null {return this.user_id;}
    getRole_id(): string | null {return this.role_id;}

    setUser_id(user_id: string): void {this.user_id = user_id;}
    setRole_id(role_id: string): void {this.role_id = role_id;}
}