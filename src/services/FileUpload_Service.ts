import { Request, Response, NextFunction } from 'express';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { Buffer } from 'buffer';
import { MAX_FILE_UPLOAD } from '@/constant/Upload_Service_Constant';
import { v4 as uuidv4 } from 'uuid';
import { i18n } from '@/constant/I18n_Constant';

class FileUploadService {
    private s3: S3Client;

    constructor() {
        if (!process.env.AWS_BUCKET_NAME) {
            throw new Error('AWS_BUCKET_NAME is not defined');
        }

        this.s3 = new S3Client({
            region: process.env.AWS_REGION,
            endpoint: `https://s3.${process.env.AWS_REGION}.amazonaws.com`,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
            }
        });
    }

    private getFileExtension(mimeType: string): string {
        switch (mimeType) {
            case 'image/jpeg':
                return 'jpg';
            case 'image/png':
                return 'png';
            case 'image/gif':
                return 'gif';
            default:
                return 'bin';
        }
    }

    public async uploadBase64(req: Request, res: Response, next: NextFunction) {
        const lang = req.headers["accept-language"] ?? "en";

        try {
            const { images } = req.body;

            if (!images) {
                return res.status(400).json({ message: i18n[lang].FILE_UPLOAD_NO_DATA });
            }

            // Ensure 'images' is either a single string or an array
            const imageArray = Array.isArray(images) ? images : [images];

            if (imageArray.length > MAX_FILE_UPLOAD) {
                return res.status(400).json({ message: i18n[lang].FILE_UPLOAD_LIMIT_EXCEEDED });
            }

            const imageUrls: string[] = [];

            for (const [index, image] of imageArray.entries()) {
                if (typeof image !== 'string' || !image.startsWith('data:image/')) {
                    continue; // Skip if image is not a valid base64 string with image data URI
                }

                const mimeType = image.match(/data:([^;]+);/)?.[1];
                if (!mimeType) {
                    continue; // Skip if MIME type is not found
                }

                const fileExtension = this.getFileExtension(mimeType);
                const buffer = Buffer.from(image.split(',')[1], 'base64');
                const fileName = `${uuidv4()}.${fileExtension}`; // Unique file name using UUID and extracted file extension

                const uploadParams = {
                    Bucket: String(process.env.AWS_BUCKET_NAME),
                    Key: fileName,
                    Body: buffer,
                    ContentType: mimeType // Set the correct MIME type
                };

                await this.s3.send(new PutObjectCommand(uploadParams));
                imageUrls.push(`https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`);
            }

            // Return a single URL string if only one image was uploaded, otherwise return an array
            req.body.images = imageUrls.length === 1 ? imageUrls[0] : imageUrls;

            next();
        } catch (error) {
            console.error('Error uploading base64 images:', error);
            res.status(500).json({ message: i18n[lang].FILE_UPLOAD_FAILED, error });
        }
    }

    public async deleteImage(imageUrl: string): Promise<void> {
        try {
            const imageKey = new URL(imageUrl).pathname.substring(1);

            const deleteParams = {
                Bucket: String(process.env.AWS_BUCKET_NAME),
                Key: imageKey
            };

            const deleteResult = await this.s3.send(new DeleteObjectCommand(deleteParams));
            console.log('Delete result:', deleteResult);
        } catch (error) {
            console.error('Error deleting image:', error);
            throw new Error('Failed to delete image from S3: ' + (error as Error).message);
        }
    }
}

export default FileUploadService;
