import { getRepository } from "@core/db/databaseGuards";
import { getDatabase } from "@db/DatabaseClient";
import { getPaymentProvider } from "@modules/payment/config/payment/PaymentFactory";
import { ITransactionRepository } from "@modules/payment/modules/transaction/repositories/contract/ITransactionRepository";
import { TransactionRepositoryMongo } from "@modules/payment/modules/transaction/repositories/drivers/TransactionRepositoryMongo";
import { TransactionRepositorySQL } from "@modules/payment/modules/transaction/repositories/drivers/TransactionRepositorySQL";
import { TransactionRepositoryRedis } from "@modules/payment/modules/transaction/repositories/drivers/TransactionRepostoryRedis";
import cron from "node-cron";

console.log("Starting cron job for escrow release...");

// Cron job to release escrow every hour
cron.schedule("* * * * *", async () => { // Every minute
    try {
        console.log("Running escrow release check...");

        const paymentProvider = getPaymentProvider();
        let myDB;

        // S'assurer de récuéperer la base de donnée
        (async () => {
            myDB = await getDatabase();
            console.log("Database connected:", myDB);
        })();

        
        const transactionRepository = getRepository(myDB, TransactionRepositorySQL, TransactionRepositoryRedis, TransactionRepositoryMongo) as ITransactionRepository;

        console.log("Fetching pending transactions...");
        const pendingTransactions = await transactionRepository.getPendingEscrowTransactions();

        console.log(`Found ${pendingTransactions.length} pending transactions.`);

        console.log("Releasing escrow payments...");
        paymentProvider.releaseEscrowPayments(pendingTransactions);

        console.log("Escrow release job completed.");
    } catch (error) {
        console.error("Error in cron job:", error);
    }
});
