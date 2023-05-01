import { forwardRef, Module } from '@nestjs/common';
import { S3Module } from '../s3/s3.module';
import { FilesController } from './files.controller';

@Module({
    controllers: [
        FilesController
    ],
    imports: [
        forwardRef(() => S3Module)
    ]
})
export class FilesModule { }
