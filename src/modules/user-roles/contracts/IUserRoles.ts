import { Role } from "@modules/roles/entity/typeorm/Role.entity";
import { User } from "@modules/users/entity/typeorm/User.entity";

// Interface of the user roles
export interface UserRolesContract {
  user_id: string;
  role_id: string;
  user: User;
  role: Role
}