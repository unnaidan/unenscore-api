import { S3 } from '@aws-sdk/client-s3';

export const S3Provider = {
    provide: 'lib:aws-s3',
    useFactory: () => {
        return new S3({});
    }
};