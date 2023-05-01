import { FileValidator } from '@nestjs/common';
import { S3Provider } from '../s3/s3.provider';

export type MaxFileSizeValidatorOptions = {
    maxSize: number;
};

export class MaxFileSizeValidator extends FileValidator<MaxFileSizeValidatorOptions> {
    buildErrorMessage(file: any): string {
        const s3 = S3Provider.useFactory();
        s3.deleteObject({
            Bucket: process.env.S3_BUCKET,
            Key: file.key
        });
        return 'File is too large';
    }

    isValid(file: any): boolean {
        if (!this.validationOptions) {
            return true;
        }
        return file.size < this.validationOptions.maxSize;
    }
}
