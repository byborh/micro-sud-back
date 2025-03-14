import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

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

    async uploadPdf(pdfFile: Uint8Array, fileName: string): Promise<void> {
        
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: fileName,
            Body: pdfFile,
            ContentType: 'application/pdf'
        };

        try {
            const data = await this.s3Client.send(new PutObjectCommand(params));
            console.log('PDF uploaded successfully', data);
        } catch (error) {
            console.error('Error uploading PDF:', error);
            throw error;
        }
    }      
}