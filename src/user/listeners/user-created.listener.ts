import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from '../events/user-created.event';
import { UserService } from '../user.service';

@Injectable()
export class UserCreatedListener {
    constructor(
        public userService: UserService
    ) { }

    @OnEvent('user.created')
    async handleUserCreatedEvent(event: UserCreatedEvent) {
        await this.userService.sendVerificationEmail(event.user);
    }
}