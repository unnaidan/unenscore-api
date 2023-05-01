import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { hashSync } from 'bcryptjs';
import { merge } from 'lodash';
import { CrudService, FindManyParams } from '../crud/crud.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UserService extends CrudService<Prisma.UserDelegate<false>, Prisma.UserWhereInput, Prisma.UserUncheckedCreateInput, Prisma.UserUncheckedUpdateInput> {
    constructor(
        public prisma: PrismaService
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
     * Store a new model.
     *
     * @param {SignUpInput} input
     * @returns {Promise}
     */
    async create({ passwordConfirmation, ...other }: CreateUserInput & { organizationId: string; }): Promise<User> {
        const password = hashSync(other.password);
        return await super.create(merge(other, {
            password
        }));
    }

    /**
     * Reset user password.
     *
     * @param {string} id
     * @param {string} value
     * @returns {Promise}
     */
    async changePassword(id: string, value: string): Promise<boolean> {
        const user = await this.find(id);
        const password = hashSync(value);
        return await super.update(user.id, {
            password
        }).then(() => {
            return true;
        });
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
     * Returns specific organization's users.
     *
     * @param {string} organizationId
     * @param {FindManyParams} params
     * @returns {Promise}
     */
    async findManyByOrganization(organizationId: string, params: FindManyParams<Prisma.UserWhereInput>): Promise<any> {
        const where = {
            organizationId
        };
        return this.findMany(merge(params, {
            where
        }));
    }
}
