import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Readable } from "stream";

export class S3Service {
    private s3Client: S3Client;

    constructor() {
        this.s3Client = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
            }
        });
    }

    async uploadPdf(pdfFile: Uint8Array, fileName: string): Promise<string> {
        const bucketName = process.env.AWS_BUCKET_NAME!;
        
        const params = {
            Bucket: bucketName,
            Key: fileName,
            Body: pdfFile,
            ContentType: 'application/pdf'
        };

        try {
            await this.s3Client.send(new PutObjectCommand(params));
            const fileUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
            return fileUrl;
        } catch (error) {
            console.error('Error uploading PDF:', error);
            throw error;
        }
    }

    async downloadPdf(pdfLink: string): Promise<Uint8Array> {
        const bucketName = process.env.AWS_BUCKET_NAME!;
        const fileName = pdfLink.split("/").pop();

        if (!fileName) {
            throw new Error("Invalid PDF link format");
        }

        const params = {
            Bucket: bucketName,
            Key: fileName
        };

        try {
            const response = await this.s3Client.send(new GetObjectCommand(params));

            if (!response.Body) {
                throw new Error("Empty response body");
            }

            const stream = response.Body as Readable;
            const chunks: Uint8Array[] = [];

            for await (const chunk of stream) {
                chunks.push(chunk as Uint8Array);
            }

            return Buffer.concat(chunks);
        } catch (error) {
            console.error("Error downloading PDF:", error);
            throw error;
        }
    }

}