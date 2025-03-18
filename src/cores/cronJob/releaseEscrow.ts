import { getRepository } from "@core/db/databaseGuards";
import { getDatabase } from "@db/DatabaseClient";
import { getPaymentProvider } from "@modules/payment/config/payment/PaymentFactory";
import { ITransactionRepository } from "@modules/payment/modules/transaction/repositories/contract/ITransactionRepository";
import { TransactionRepositoryMongo } from "@modules/payment/modules/transaction/repositories/drivers/TransactionRepositoryMongo";
import { TransactionRepositorySQL } from "@modules/payment/modules/transaction/repositories/drivers/TransactionRepositorySQL";
import { TransactionRepositoryRedis } from "@modules/payment/modules/transaction/repositories/drivers/TransactionRepostoryRedis";
import cron from "node-cron";

// Cron job to release escrow every hour
cron.schedule("0 * * * *", async () => { // Execution every minute
    console.log("Running escrow release check...");

    // Get payment provider
    const paymentProvider = getPaymentProvider();

    // Get transactions
    const myDB = await getDatabase();
    const transactionRepository = getRepository(myDB, TransactionRepositorySQL, TransactionRepositoryRedis, TransactionRepositoryMongo) as ITransactionRepository;

    // Get pending escrow transactions
    const pendingTransactions = await transactionRepository.getPendingEscrowTransactions();

    // Capture escrow
    paymentProvider.releaseEscrowPayments(pendingTransactions);
});
