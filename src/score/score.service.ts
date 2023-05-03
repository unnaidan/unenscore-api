import { Injectable } from '@nestjs/common';
import { Prisma, Score } from '@prisma/client';
import { merge } from 'lodash';
import { ApplicationService } from 'src/application/application.service';
import { BorrowerService } from 'src/borrower/borrower.service';
import { CrudService } from '../crud/crud.service';
import { PrismaService } from '../prisma/prisma.service';
import { CalculateCreditScoreInput } from './dto/calculate-credit-score.input';

@Injectable()
export class ScoreService extends CrudService<Prisma.ScoreDelegate<false>, Prisma.ScoreWhereInput, Prisma.ScoreUncheckedCreateInput, Prisma.ScoreUncheckedUpdateInput> {
    constructor(
        public prisma: PrismaService,
        public applicationService: ApplicationService,
        public borrowerService: BorrowerService
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

    /**
     * Calculate and return borrower's credit score.
     *
     * @param {any} input
     * @returns {Promise}
     */
    async calculate(input: CalculateCreditScoreInput & { organizationId: string; }): Promise<Score> {
        if (input.g1 === false) {
            input = merge(input, {
                g2: 0,
                g3: 'Зээлийн түүхгүй',
                g4: 'Зээлийн түүхгүй'
            });
        }
        const {
            organizationId,
            name,
            surname,
            nationalId,
            gender,
            a1,
            a2,
            a3,
            a4,
            a5,
            a6,
            b1,
            b2,
            b3,
            b4,
            b5,
            b6,
            c1,
            c2,
            c3,
            c4,
            d1,
            d2,
            d3,
            d4,
            e1,
            e2,
            e3,
            e4,
            f1,
            f2,
            f3,
            f4,
            f5,
            g1,
            g2,
            g3,
            g4,
            amount,
            term,
            interestRate
        } = input;
        const borrower = await this.prisma.borrower.upsert({
            where: {
                nationalId
            },
            update: {
                name,
                surname,
                gender,
                a1,
                a2,
                a3,
                a4,
                a5,
                a6,
                b1,
                b2,
                b3,
                b4,
                b5,
                b6,
                c1,
                c2,
                c3,
                c4,
                d1,
                d2,
                d3,
                d4,
                e1,
                e2,
                e3,
                e4,
                f1,
                f2,
                f3,
                f4,
                f5,
                g1,
                g2,
                g3,
                g4
            },
            create: {
                organizationId,
                name,
                surname,
                nationalId,
                gender,
                a1,
                a2,
                a3,
                a4,
                a5,
                a6,
                b1,
                b2,
                b3,
                b4,
                b5,
                b6,
                c1,
                c2,
                c3,
                c4,
                d1,
                d2,
                d3,
                d4,
                e1,
                e2,
                e3,
                e4,
                f1,
                f2,
                f3,
                f4,
                f5,
                g1,
                g2,
                g3,
                g4
            }
        });
        const application = await this.prisma.application.create({
            data: {
                amount,
                term,
                interestRate,
                borrowerId: borrower.id
            }
        });
        return await this.create({
            a1: 'A',
            a2: 36,
            a3: 1.3,
            a4: 22366120,
            a5: 455549,
            a6: 9.1,
            a7: 0.2644,
            a8: 0.0011,
            a9: 0.0134,
            a10: 'Хэвийн, эрсдэл бага',
            applicationId: application.id
        });
    };
}
