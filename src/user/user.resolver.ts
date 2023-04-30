import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User as PrismaUser } from '@prisma/client';
import { AuthService } from '../auth/auth.service';
import { CurrentUser } from '../decorators/current-user.decorator';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { Organization } from './../organization/entities/organization.entity';
import { OrganizationService } from './../organization/organization.service';
import { SignInInput } from './dto/sign-in.input';
import { User, UserWithAccessToken } from './entities/user.entity';

@Resolver(() => User)
export class UserResolver {
    constructor(
        private readonly authService: AuthService,
        private readonly organizationService: OrganizationService
    ) { }

    @Query(() => User)
    @UseGuards(GqlAuthGuard)
    async currentUser(@CurrentUser() user: PrismaUser) {
        return user;
    }

    @Mutation(() => UserWithAccessToken)
    async signIn(@Args('input') input: SignInInput) {
        return this.authService.signIn(input.email);
    }

    @ResolveField(() => Organization)
    async organization(@Parent() user: User) {
        const { organizationId } = user;
        return this.organizationService.find(organizationId);
    }
}
