import { FileValidator } from '@nestjs/common';
import { S3Provider } from '../s3/s3.provider';

export type FileTypeValidatorOptions = {
    mimeTypes: string[];
};

export class FileTypeValidator extends FileValidator<FileTypeValidatorOptions> {
    buildErrorMessage(file: any): string {
        const s3 = S3Provider.useFactory();
        s3.deleteObject({
            Bucket: process.env.S3_BUCKET,
            Key: file.key
        });
        return 'Only JPG, PNG and WEBP files are allowed';
    }

    isValid(file: any): boolean {
        if (!this.validationOptions) {
            return true;
        }
        if (!file.mimetype) {
            return false;
        }
        return Boolean(this.validationOptions.mimeTypes.includes(file.mimetype));
    }
}
