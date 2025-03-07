import { getRepository } from "@core/db/databaseGuards";
import { getDatabase } from "@db/DatabaseClient";
import { PaymentMethod } from "@modules/payment/modules/transaction/contracts/TPaymentMethod";
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

    public async isAccountExist(email: string, payment_method: string): Promise<string | null> {
        try {
            const myDB = await getDatabase();
            const userRepository = getRepository(myDB, UserRepositorySQL, UserRepositoryRedis, UserRepositoryMongo) as IUserRepository;
            const user = await userRepository.findUserByEmail(email);

            if(!user) throw new Error("User not found for this email.");

            // Return Payment Account
            return payment_method as PaymentMethod === "stripe" ? user.getStripeCustomerId() : user.getPaypalCustomerId()
        } catch (error) {
            console.error("Error finding user in TransactionService:", error);
            throw new Error("Failed to find user.");
        }
    }
    
    
    public async updateUser(paymentId: string, email: string, payment_method: string): Promise<string | null> {
        try {
            // Verify if user exists
            const myDB = await getDatabase();
            const userRepository = getRepository(myDB, UserRepositorySQL, UserRepositoryRedis, UserRepositoryMongo) as IUserRepository;
            const user = await userRepository.findUserByEmail(email);
    
            if(!user) throw new Error("User not found for this email.");
            
            // Update correct payment method's id
            if(payment_method as PaymentMethod === "stripe") {
                user.setStripeCustomerId(paymentId);
            } else {
                user.setPaypalCustomerId(paymentId);
            }

            // Modify User in db
            const updatedUser = await userRepository.modifyUser(user);
            if(!updatedUser) throw new Error("Failed to update user.");
    
            // Return Payment Account
            return payment_method as PaymentMethod === "stripe" ? user.getStripeCustomerId() : user.getPaypalCustomerId()
        } catch (error) {
            console.error("Error finding user in TransactionService:", error);
            throw new Error("Failed to find user.");
        }
    }

}