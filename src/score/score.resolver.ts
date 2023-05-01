import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ApplicationService } from '../application/application.service';
import { Application } from '../application/entities/application.entity';
import { Score } from './entities/score.entity';

@Resolver(() => Score)
export class ScoreResolver {
    constructor(
        private readonly applicationService: ApplicationService
    ) { }

    @Query(() => String)
    async testScore() {
        return 'score';
    }

    @ResolveField(() => Application)
    async application(@Parent() score: Score) {
        const { applicationId } = score;
        return this.applicationService.find(applicationId);
    }
}
