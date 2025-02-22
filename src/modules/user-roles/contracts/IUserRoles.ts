import { RoleAbstract } from "@modules/roles/entity/Role.abstract";
import {  } from "@modules/roles/entity/sql/Role.entity";
import { UserSQLEntity } from "@modules/users/entity/sql/User.entity";

// Interface of the user roles
export interface UserRolesContract {
  user_id: string;
  role_id: string;
  user?: UserSQLEntity;
  role?: RoleAbstract
}