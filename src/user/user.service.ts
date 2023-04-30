import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { merge } from 'lodash';
import { CrudService, FindManyParams } from '../crud/crud.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService extends CrudService<Prisma.UserDelegate<false>, Prisma.UserWhereInput, Prisma.UserCreateInput, Prisma.UserUpdateInput> {
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
