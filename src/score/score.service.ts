import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CrudService } from '../crud/crud.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ScoreService extends CrudService<Prisma.ScoreDelegate<false>, Prisma.ScoreWhereInput, Prisma.ScoreCreateInput, Prisma.ScoreUpdateInput> {
    constructor(
        public prisma: PrismaService
    ) {
        super(prisma.score);
    }

    /**
     * Returns specific application's score.
     *
     * @param {string} applicationId
     * @returns {Promise}
     */
    async findByApplication(applicationId: string): Promise<any> {
        const where = {
            applicationId
        };
        return this.prisma.score.findUnique({
            where
        });
    }
}
