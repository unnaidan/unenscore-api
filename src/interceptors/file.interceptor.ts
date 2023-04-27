import { S3Client } from '@aws-sdk/client-s3';
import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { FileInterceptor as FileInterceptorBase } from '@nestjs/platform-express';
import { extension } from 'mime-types';
import { default as multerS3 } from 'multer-s3';
import { Observable } from 'rxjs';
import { default as uniqid } from 'uniqid';

@Injectable()
export class FileInterceptor implements NestInterceptor {
    constructor(
        @Inject('lib:aws-s3') private s3: S3Client
    ) { }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const storage = multerS3({
            s3: this.s3,
            key: (_, file, callback) => callback(null, `${uniqid()}.${extension(file.mimetype)}`),
            bucket: process.env.S3_BUCKET,
            contentType: multerS3.AUTO_CONTENT_TYPE
        });
        const FileInterceptor = FileInterceptorBase('file', {
            storage
        });
        return await (new FileInterceptor())
            .intercept(
                context,
                next
            );
    }
}