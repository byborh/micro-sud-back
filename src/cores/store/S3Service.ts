import { PutObjectCommand, S3Client, DeleteObjectCommand, ObjectCannedACL } from "@aws-sdk/client-s3";

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

    private getMimeType(fileName: string): string {
        const ext = fileName.split('.').pop()?.toLowerCase();
        const mimeTypes: Record<string, string> = {
            jpg: 'image/jpeg',
            jpeg: 'image/jpeg',
            png: 'image/png',
            webp: 'image/webp',
            gif: 'image/gif'
        };
        return mimeTypes[ext || ''] || 'application/octet-stream';
    }
    

    // UploadImg
    /*
        1 - Get image from client
        2 - Upload image to S3
    */

    async uploadImg(imgFile: Uint8Array, fileName: string): Promise<string> {
        const bucketName = process.env.AWS_BUCKET_NAME!;
        
        const params = {
            Bucket: bucketName,
            Key: fileName,
            Body: imgFile,
            ContentType: this.getMimeType(fileName),
            ACL: 'public-read' as ObjectCannedACL
        };

        try {
            await this.s3Client.send(new PutObjectCommand(params));
            const fileUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
            return fileUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    }

    // DownloadImg
    /*
        1 - Get image from S3
        2 - Send image to client
    */

    async deleteImg(fileName: string): Promise<void> {
        const bucketName = process.env.AWS_BUCKET_NAME!;
        const params = { Bucket: bucketName, Key: fileName };
        try {
            await this.s3Client.send(new DeleteObjectCommand(params));
        } catch (error) {
            console.error('Error deleting image:', error);
            throw error;
        }
    }
}