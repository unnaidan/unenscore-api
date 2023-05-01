import { UseGuards } from '@nestjs/common';
import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { BorrowerService } from '../borrower/borrower.service';
import { BorrowerPagination } from '../borrower/entities/borrower-pagination.entity';
import { PaginationArgs } from '../dto/pagination-args.dto';
import { AdminGuard } from '../guards/admin.guard';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { UserPagination } from '../user/entities/user-pagination.entity';
import { UserService } from '../user/user.service';
import { Organization } from './entities/organization.entity';

@Resolver(() => Organization)
export class OrganizationResolver {
    constructor(
        private readonly borrowerService: BorrowerService,
        private readonly userService: UserService
    ) { }

    @ResolveField(() => UserPagination)
    @UseGuards(GqlAuthGuard, AdminGuard)
    async users(@Parent() organization: Organization, @Args() args: PaginationArgs) {
        const { id } = organization;
        return this.userService.findManyByOrganization(id, args);
    }

    @ResolveField(() => BorrowerPagination)
    async borrowers(@Parent() organization: Organization, @Args() args: PaginationArgs) {
        const { id } = organization;
        return this.borrowerService.findManyByOrganization(id, args);
    }
}
