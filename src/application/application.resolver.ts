import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { BorrowerService } from '../borrower/borrower.service';
import { Borrower } from '../borrower/entities/borrower.entity';
import { Score } from '../score/entities/score.entity';
import { ScoreService } from '../score/score.service';
import { Application } from './entities/application.entity';

@Resolver(() => Application)
export class ApplicationResolver {
    constructor(
        private readonly borrowerService: BorrowerService,
        private readonly scoreService: ScoreService
    ) { }

    @ResolveField(() => Borrower)
    async borrower(@Parent() application: Application) {
        const { borrowerId } = application;
        return this.borrowerService.find(borrowerId);
    }

    @ResolveField(() => Score, { nullable: true })
    async score(@Parent() application: Application) {
        const { id } = application;
        return this.scoreService.findByApplication(id);
    }
}
