import { Injectable } from '@nestjs/common';
import { Prisma, Score } from '@prisma/client';
import { merge } from 'lodash';
import { BorrowerService } from 'src/borrower/borrower.service';
import { ApplicationService } from '../application/application.service';
import { CrudService } from '../crud/crud.service';
import { PrismaService } from '../prisma/prisma.service';
import * as scores from '../scores';
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

        const B3 = surname;
        const B4 = name;
        const B5 = gender === 'male' ? 'Эр' : 'Эм';
        const B6 = 51; // age
        const B8 = a1;
        const B9 = a2;
        const B10 = a3;
        const B11 = a4;
        const B12 = a5;
        const B13 = a6 ? 'Тийм' : 'Үгүй';
        const B15 = b1 ? 'Тийм' : 'Үгүй';
        const B16 = b2;
        const B17 = b3;
        const B18 = b4;
        const B19 = b5;
        const B20 = b6;
        const B22 = c1;
        const B23 = c2;
        const B24 = c3;
        const B25 = c4;
        const B27 = d1;
        const B28 = d2;
        const B29 = d3;
        const B30 = d4 ? 'Тийм' : 'Үгүй';
        const B32 = e1;
        const B33 = e2;
        const B34 = B32 + B33;
        const C5 = scores.gender[B5];
        const C8 = scores.a1[B8];
        const C20 = scores.b6[B20];
        const C25 = scores.c4[B25];
        const C27 = scores.d1[B27];
        const C28 = scores.d2[B28];
        const C34 = Math.log(B34);
        const F6 = -0.00089058062907;
        const F8 = 0.793558058038;
        const F12 = 0.0280132957077;
        const F16 = 0.0105259782246;
        const F17 = 0.0648405085294;
        const F27 = 0.144074921088;
        const F28 = -1.66582566353;
        const F34 = 0.363222121673;
        const G6 = B6 * F6;
        const G8 = C8 * F8;
        const G12 = B12 * F12;
        const G16 = B16 * F16;
        const G17 = B17 * F17;
        const G27 = C27 * F27;
        const G28 = C28 * F28;
        const G34 = C34 * F34;
        const B35 = Math.exp(7.32077514027 + G6 + G8 + G12 + G16 + G17 + G27 + G28 + G34);
        const C38 = Math.log(B35);
        const B40 = f1;
        const B41 = f2;
        const B42 = f3;
        const B43 = f4;
        const B44 = f5;
        const B47 = g1 ? 'Тийм' : 'Үгүй';
        const B48 = g2;
        const B53 = term;
        const B54 = interestRate;
        const B45 = B40 + B41 + B42 + B43 + B44;
        const C45 = Math.log(B45 + 1);
        const C47 = g1 ? 1 : 0;
        const B49 = g3;
        const B50 = g4;
        const C49 = scores.g3[B49];
        const C50 = scores.g4[B50];
        const B52 = amount;
        const C52 = Math.log(B52);
        const B36 = e3;
        const B37 = e4;
        const C57 = ((1 - ((B33 - B35 - B36 - B37) > 0 ? 1 : ((B33 - B35 - B36 - B37) < 0 ? (-1 * (B33 - B35 - B36 - B37)) / B32 : 0))) === 0 ? 0.0001 : (1 - ((B33 - B35 - B36 - B37) > 0 ? 1 : ((B33 - B35 - B36 - B37) < 0 ? (-1 * (B33 - B35 - B36 - B37)) / B32 : 0))));
        const B38 = B35 + B36 + B37;
        const D5 = -2.029488;
        const D6 = 0.284862 * C50;
        const D8 = 2.644356;
        const D11 = -0.072439;
        const D16 = 0.11199;
        const D17 = -2.66504350666 / C50;
        const D18 = -0.130088087098;
        const D20 = 1.085209;
        const D25 = -4.683328;
        const D27 = -6.751636 / C50;
        const D28 = 3.377225;
        const D38 = 0.636977;
        const D45 = -0.025192;
        const D47 = 2.30582;
        const D49 = -14.8473485648;
        const D53 = 0.012303;
        const E5 = C5 * D5;
        const E6 = B6 * D6;
        const E8 = C8 * D8;
        const E11 = B11 * D11;
        const E16 = B16 * D16;
        const E17 = B17 * D17;
        const E18 = B18 * D18;
        const E20 = C20 * D20;
        const E25 = C25 * D25;
        const E27 = C27 * D27;
        const E28 = C28 * D28;
        const E38 = C38 * D38;
        const E45 = C45 * D45;
        const E47 = C47 * D47;
        const E49 = C49 * D49;
        const E53 = B53 * D53;
        const I2 = -(-13.37652 + E5 + E6 + E8 + E11 + E16 + E17 + E18 + E20 + E25 + E27 + E28 + E38 + E45 + E47 + E49 + E53); // removed E34
        const I3 = 1 - Math.exp(I2) / (1 + Math.exp(I2));
        const B57 = C57 * 100;
        const I8 = B57;
        const I9 = (1 - C57) * 0.7 / (B54 * 12);
        const I10 = 0.1;
        const I11 = 0.164284 * I10;
        const I12 = (I10 - Math.sqrt(I10 ^ 2 - (I11 ^ 2) * I9)) / ((I11 ^ 2) * 0.5);
        const B58 = (((1 + B54) ^ B53 - 1) / (B54 * (1 + B54) ^ B53)) * (1 - C57) * B34;
        const B61 = B52 / (B58 * Math.exp((-B54 * B53)));
        const I13 = ((((I11 ^ 2) * I12 * 0.5 - (I8 ^ 2) * 0.5) * (B53 / 12) - Math.log(B61)) / (I8 * Math.sqrt(B53 / 12)));
        const I14 = ((((I11 ^ 2) * I12 * 0.5 + (I8 ^ 2) * 0.5) * (B53 / 12) - Math.log(B61)) / (I8 * Math.sqrt(B53 / 12)));
        const I15 = NORM.S.DIST(I13, TRUE);
        const I16 = NORM.S.DIST(I14, TRUE);

        const B62 = (B52 / B58) * (1 - I15) - Math.exp(-B54 * B53) * Math.exp((I11 ^ 2) * 0.5 * I12) * (1 - I16);
        const B63 = ((B62 < 0.4 ? B62 : 1) + I3) / 2;
        const B56 = B54 + B63 * 0.31;
        const B59 = ((B54 * (1 + B54) ^ B53) / ((1 + B54) ^ B53 - 1)) * B52;
        const B60 = B59 / B34;
        const B64 = ((0 <= B63 && B63 < 0.0005) ? "AAA" : ((0.0005 <= B63 && B63 < 0.0035) ? "AA" : ((0.0035 <= B63 && B63 < 0.0154) ? "A" : ((0.0154 <= B63 && B63 < 0.0469) ? "BBB" : ((0.0469 <= B63 && B63 < 0.1128) ? "BB" : ((0.1128 <= B63 && B63 < 0.397) ? "B" : ((0.397 <= B63 && B63 < 0.5) ? "CCC" : ((0.5 <= B63 && B63 < 0.5005) ? "CC" : ((0.5005 <= B63 && B63 < 0.5055) ? "C" : ((0.5055 <= B63 && B63 < 0.5492) ? "DDD" : ((0.5492 <= B63 && B63 < 0.9925) ? "DD" : "D")))))))))));

        console.log({
            'Зээлийн зэрэглэл': B64,
            'Зардал, орлогын харьцаа': B57,
            'Эрсдэл шингэсэн хүү': B56,
            'Боломжит зээл': B58,
            'Зээлийн сарын төлбөр': B59,
            'Зээлийн сарын төлбөр орлогын харьцаа': B60,
            'Хүсч буй зээл боломжит зээлийн харьцаа': B61,
            'Зээлийн эрсдэл орлогын харьцаа': B62,
            'Зээл төлөгдөхгүй байх магадлал': B63
        });

        return await this.create({
            a1: B64,
            a2: B57,
            a3: B56,
            a4: B58,
            a5: B59,
            a6: B60,
            a7: B61,
            a8: B62,
            a9: B63,
            a10: 'Тайлбар',
            applicationId: application.id
        });
    };
}
