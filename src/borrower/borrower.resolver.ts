import { UseGuards } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ApplicationService } from '../application/application.service';
import { ApplicationPagination } from '../application/entities/application-pagination.entity';
import { PaginationArgs } from '../dto/pagination-args.dto';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { Organization } from '../organization/entities/organization.entity';
import { OrganizationService } from '../organization/organization.service';
import { BorrowerService } from './borrower.service';
import { Borrower } from './entities/borrower.entity';

@Resolver(() => Borrower)
export class BorrowerResolver {
    constructor(
        private readonly applicationService: ApplicationService,
        private readonly borrowerService: BorrowerService,
        private readonly organizationService: OrganizationService
    ) { }

    @Query(() => Borrower, { nullable: true })
    @UseGuards(GqlAuthGuard) // TODO: check permission
    async borrower(@Args('id') id: string) {
        return this.borrowerService.find(id);
    }

    @ResolveField(() => Organization)
    async organization(@Parent() borrower: Borrower) {
        const { organizationId } = borrower;
        return this.organizationService.find(organizationId);
    }

    @ResolveField(() => ApplicationPagination)
    async applications(@Parent() borrower: Borrower, @Args() args: PaginationArgs) {
        const { id } = borrower;
        return this.applicationService.findManyByBorrower(id, args);
    }
}
