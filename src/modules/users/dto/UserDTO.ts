import { UserContract } from "../contracts/UserContract";

/*
    The password is optional.
    It's required only in request (ex: when creating a new user).
    So it can be stored in the database.

    But it's not required in response (ex: when getting a user).
    It's more secure to not send the password in the response. (Only if user has the right permissions)
*/
export interface UserDTO extends Omit<UserContract, "password"> { // Omit excludes the password
    password?: string; // Password is optional
}