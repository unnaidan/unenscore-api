import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { merge } from 'lodash';
import { CrudService, FindManyParams } from '../crud/crud.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ApplicationService extends CrudService<Prisma.ApplicationDelegate<false>, Prisma.ApplicationWhereInput, Prisma.ApplicationCreateInput, Prisma.ApplicationUpdateInput> {
    constructor(
        public prisma: PrismaService
    ) {
        super(prisma.application);

        this.searchableFields = [
            'amount'
        ];
    }

    /**
     * Returns specific borrower's application.
     *
     * @param {string} borrowerId
     * @param {FindManyParams} params
     * @returns {Promise}
     */
    async findManyByBorrower(borrowerId: string, params: FindManyParams<Prisma.ApplicationWhereInput>): Promise<any> {
        const where = {
            borrowerId
        };
        return this.findMany(merge(params, {
            where
        }));
    }
}
