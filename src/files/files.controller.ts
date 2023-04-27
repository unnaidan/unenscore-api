import { Controller, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { parse } from 'bytes';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { FileInterceptor } from '../interceptors/file.interceptor';
import { FileTypeValidator } from '../validators/file-type.validator';
import { MaxFileSizeValidator } from '../validators/max-file-size.validator';

const validators = [
    new MaxFileSizeValidator({
        maxSize: parse('4mb')
    }),
    new FileTypeValidator({
        mimeTypes: [
            'image/avif',
            'image/jpeg',
            'image/png',
            'image/webp',
            'image/heic'
        ]
    })
];

@Controller('files')
export class FilesController {
    @Post('upload-image')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor)
    async uploadImage(@UploadedFile(new ParseFilePipe({ validators })) file: Express.MulterS3.File): Promise<string> {
        return file.key;
    }
}
