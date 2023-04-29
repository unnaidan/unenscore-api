import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { UrlGeneratorService } from 'nestjs-url-generator';
import { CrudService } from '../crud/crud.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService extends CrudService<Prisma.UserDelegate<false>, Prisma.UserWhereInput, Prisma.UserCreateInput, Prisma.UserUpdateInput> {
    constructor(
        public prisma: PrismaService,
        public mailerService: MailerService,
        public eventEmitter: EventEmitter2,
        public jwtService: JwtService,
        public urlGeneratorService: UrlGeneratorService
    ) {
        super(prisma.user);

        this.searchableFields = [
            'name',
            'surname',
            'position',
            'email'
        ];
    }

    /**
     * Returns specific entity by email.
     *
     * @param {string} email
     * @returns {Promise}
     */
    async findByEmail(email: string): Promise<User | null> {
        const where = {
            email
        };
        return await this.delegate.findUnique({
            where
        });
    }
}
