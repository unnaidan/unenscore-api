import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { hashSync } from 'bcryptjs';
import { UrlGeneratorService } from 'nestjs-url-generator';
import { CrudService } from '../crud/crud.service';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpInput } from './dto/sign-up.input';
import { UserCreatedEvent } from './events/user-created.event';
import { UserController } from './user.controller';

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
            'username',
            'email'
        ];
    }

    /**
     * Store a new model.
     *
     * @param {SignUpInput} input
     * @returns {Promise}
     */
    async create({ username, email, ...other }: SignUpInput): Promise<User> {
        const password = hashSync(other.password);
        const user = await super.create({ username, email, password });
        return this.eventEmitter.emit('user.created', new UserCreatedEvent(user)) && user;
    }

    /**
     * Updates specific entity.
     *
     * @param {string} id 
     * @param {Prisma.UserUpdateInput} data 
     * @returns  
     */
    async update(id: string, data: Prisma.UserUpdateInput): Promise<any> {
        return await super.update(id, data); // TODO: if email change, set emailVerified false and send verification email
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

    /**
     * Returns specific entity by username.
     *
     * @param {string} username
     * @returns {Promise}
     */
    async findByUsername(username: string): Promise<User | null> {
        const where = {
            username
        };
        return await this.delegate.findUnique({
            where
        });
    }

    /**
     * Returns specific entity by third party account id.
     *
     * @param {string} provider
     * @param {string} providerId
     * @returns {Promise}
     */
    async findByThirdPartyAccount(provider: string, providerId: string): Promise<User | null> {
        const { where } = CrudService.whereHas('thirdPartyAccounts', {
            provider,
            providerId
        });
        return await this.delegate.findFirst({
            where
        });
    }

    /**
     * Send verification email.
     *
     * @param {User} user
     * @returns {Promise}
     */
    async sendVerificationEmail(user: User): Promise<void> {
        const url = this.urlGeneratorService.signControllerUrl({
            controller: UserController,
            controllerMethod: UserController.prototype.verifyUser,
            params: {
                id: user.id
            }
        });
        await this.mailerService.sendMail({
            subject: 'Verify your email to activate your Paiz',
            from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM}>`,
            to: user.email,
            template: './user-verification',
            context: {
                url,
                name: user.name || user.username
            }
        });
    }

    /**
     * Send password reset link via email.
     *
     * @param {string} email
     * @param {string} callbackUrl
     * @returns {Promise}
     */
    async sendPasswordResetLink(email: string, callbackUrl: string): Promise<boolean> {
        const user = await this.findByEmail(email);
        if (user === null) {
            return false;
        }
        const token = this.jwtService.sign({ email });
        const url = `${callbackUrl}/change/password?token=${token}`;
        return await this.mailerService.sendMail({
            subject: 'Нууц үг шинэчлэх',
            from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM}>`,
            to: user.email,
            template: './password-reset-link',
            context: {
                url,
                email: user.email
            }
        }).then(() => {
            return true;
        });
    }

    /**
     * Reset user password.
     *
     * @param {string} token
     * @param {string} value
     * @returns {Promise}
     */
    async changePassword(token: string, value: string): Promise<boolean> {
        const { email } = this.jwtService.verify(token);
        const user = await this.findByEmail(email);
        const password = hashSync(value);
        return await super.update(user.id, {
            password
        }).then(() => {
            return true;
        });
    }
}
