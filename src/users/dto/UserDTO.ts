import { UserContract } from "../contract/UserContract";

export interface UserDTO extends Omit<UserContract, "password"> {} // Omit exclut l'attribut password
// Les mots de passe ne devraient jamais être stockés ou transmis sous forme claire