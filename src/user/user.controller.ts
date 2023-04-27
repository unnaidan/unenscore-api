import { Controller, forwardRef, Get, Inject, Param, ParseUUIDPipe, Redirect, UseGuards } from '@nestjs/common';
import { SignedUrlGuard } from 'nestjs-url-generator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        @Inject(forwardRef(() => UserService)) public userService: UserService
    ) { }

    @Get('verify/:id')
    @UseGuards(SignedUrlGuard)
    @Redirect('https://paiz.io/verified', 301)
    async verifyUser(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
        await this.userService
            .update(id, {
                emailVerified: true
            });
    }
}