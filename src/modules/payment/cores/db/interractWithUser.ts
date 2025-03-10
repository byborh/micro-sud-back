import { getRepository } from "@core/db/databaseGuards";
import { getDatabase } from "@db/DatabaseClient";
import { paymentPovider } from "@modules/payment/modules/transaction/contracts/TPaymentProvider";
import { IUserRepository } from "@modules/users/repositories/contract/IUserRepository";
import { UserRepositoryMongo } from "@modules/users/repositories/drivers/UserRepositoryMongo";
import { UserRepositoryRedis } from "@modules/users/repositories/drivers/UserRepositoryRedis";
import { UserRepositorySQL } from "@modules/users/repositories/drivers/UserRepositorySQL";

export class InterractWithUser {
    private static instance: InterractWithUser;

    public static getInstance(): InterractWithUser {
        if(!InterractWithUser.instance) {
            InterractWithUser.instance = new InterractWithUser();
        }
        return InterractWithUser.instance;
    }

    public async isAccountExist(email: string, payment_provider: string): Promise<string | null> {
        try {
            const myDB = await getDatabase();
            const userRepository = getRepository(myDB, UserRepositorySQL, UserRepositoryRedis, UserRepositoryMongo) as IUserRepository;
            const user = await userRepository.findUserByEmail(email);
    
            if (!user) {
                throw new Error("User not found for this email.");
            }
    
            // Récupérer l'ID de paiement en fonction du fournisseur
            const paymentId = payment_provider === "stripe" ? user.getStripeCustomerId() : user.getPaypalCustomerId();
    
            // Vérifier que paymentId est une chaîne non vide
            if (paymentId && typeof paymentId === "string" && paymentId.trim() !== "") {
                return paymentId;
            }
    
            return null;
        } catch (error) {
            console.error("Error finding user in TransactionService:", error);
            throw new Error("Failed to find user.");
        }
    }
    
    
    public async updateUserPaymentId(paymentId: string, email: string, payment_provider: string): Promise<string | null> {
        try {
            // Verify if user exists
            const myDB = await getDatabase();
            const userRepository = getRepository(myDB, UserRepositorySQL, UserRepositoryRedis, UserRepositoryMongo) as IUserRepository;
            const user = await userRepository.findUserByEmail(email);
    
            if(!user) throw new Error("User not found for this email.");

            // Update correct payment method's id
            if(payment_provider as paymentPovider === "stripe") {
                user.setStripeCustomerId(paymentId);
            } else {
                user.setPaypalCustomerId(paymentId);
            }

            // Modify User in db
            const updatedUser = await userRepository.modifyUser(user);
            if(!updatedUser) throw new Error("Failed to update user.");

            // Return Payment Account
            return payment_provider === "stripe" ? user.getStripeCustomerId() : user.getPaypalCustomerId();
        } catch (error) {
            console.error("Error updating user in interractWithUser:", error);
            throw new Error("Failed to update user.");
        }
    }

}