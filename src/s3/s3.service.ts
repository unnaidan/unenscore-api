import { S3 } from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';
import { basename } from 'path';

@Injectable()
export class S3Service {
    constructor(
        @Inject('lib:aws-s3') private s3: S3
    ) { }

    /**
     * Upload file to aws s3 bucket.
     *
     * @param {string} path
     * @returns {Promise}
     */
    async upload(path: string): Promise<any> {
        return await this.s3.putObject({
            Bucket: process.env.S3_BUCKET,
            Key: basename(path),
            Body: createReadStream(path)
        });
    }
}
