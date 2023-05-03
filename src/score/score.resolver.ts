import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { User as PrismaUser } from '@prisma/client';
import { merge } from 'lodash';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { ApplicationService } from '../application/application.service';
import { Application } from '../application/entities/application.entity';
import { CalculateCreditScoreInput } from './dto/calculate-credit-score.input';
import { Score } from './entities/score.entity';
import { ScoreService } from './score.service';

@Resolver(() => Score)
export class ScoreResolver {
    constructor(
        private readonly applicationService: ApplicationService,
        private readonly scoreService: ScoreService
    ) { }

    @Mutation(() => Score)
    @UseGuards(GqlAuthGuard)
    async calculateCreditScore(@CurrentUser() user: PrismaUser, @Args('input') input: CalculateCreditScoreInput) {
        const { organizationId } = user;
        return this.scoreService.calculate(merge(input, {
            organizationId
        }));
    }

    @ResolveField(() => Application)
    async application(@Parent() score: Score) {
        const { applicationId } = score;
        return this.applicationService.find(applicationId);
    }
}
