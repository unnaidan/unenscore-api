import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CrudService } from '../crud/crud.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrganizationService extends CrudService<Prisma.OrganizationDelegate<false>, Prisma.OrganizationWhereInput, Prisma.OrganizationCreateInput, Prisma.OrganizationUpdateInput> {
    constructor(
        public prisma: PrismaService
    ) {
        super(prisma.organization);

        this.searchableFields = [
            'name'
        ];
    }
}
