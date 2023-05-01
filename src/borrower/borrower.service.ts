import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { merge } from 'lodash';
import { CrudService, FindManyParams } from '../crud/crud.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BorrowerService extends CrudService<Prisma.BorrowerDelegate<false>, Prisma.BorrowerWhereInput, Prisma.BorrowerCreateInput, Prisma.BorrowerUpdateInput> {
    constructor(
        public prisma: PrismaService
    ) {
        super(prisma.borrower);

        this.searchableFields = [
            'name',
            'surname',
            'nationalId'
        ];
    }

    /**
     * Returns specific organization's borrowers.
     *
     * @param {string} organizationId
     * @param {FindManyParams} params
     * @returns {Promise}
     */
    async findManyByOrganization(organizationId: string, params: FindManyParams<Prisma.BorrowerWhereInput>): Promise<any> {
        const where = {
            organizationId
        };
        return this.findMany(merge(params, {
            where
        }));
    }
}
