import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User as PrismaUser } from '@prisma/client';
import { merge } from 'lodash';
import { AuthService } from '../auth/auth.service';
import { CurrentUser } from '../decorators/current-user.decorator';
import { AdminGuard } from '../guards/admin.guard';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { Organization } from '../organization/entities/organization.entity';
import { OrganizationService } from '../organization/organization.service';
import { ChangePasswordInput } from './dto/change-password.input';
import { CreateUserInput } from './dto/create-user.input';
import { SignInInput } from './dto/sign-in.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserWithAccessToken } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
    constructor(
        private readonly authService: AuthService,
        private readonly organizationService: OrganizationService,
        private readonly userService: UserService
    ) { }

    @Query(() => User)
    @UseGuards(GqlAuthGuard)
    async currentUser(@CurrentUser() user: PrismaUser) {
        return user;
    }

    @Mutation(() => User)
    @UseGuards(GqlAuthGuard, AdminGuard)
    async createUser(@CurrentUser() user: PrismaUser, @Args('input') input: CreateUserInput) {
        const { organizationId } = user;
        return this.userService.create(merge(input, {
            organizationId
        }));
    }

    @Mutation(() => User)
    @UseGuards(GqlAuthGuard, AdminGuard) // TODO: check permission
    async updateUser(@Args('input') input: UpdateUserInput) {
        const { id } = input;
        return this.userService.update(id, input);
    }

    @Mutation(() => User)
    @UseGuards(GqlAuthGuard, AdminGuard) // TODO: check permission
    async deleteUser(@Args('id') id: string) {
        return this.userService.delete(id);
    }

    @Mutation(() => Boolean)
    @UseGuards(GqlAuthGuard)
    async changePassword(@CurrentUser() user: PrismaUser, @Args('input') input: ChangePasswordInput) {
        const { id } = user;
        return this.userService.changePassword(id, input.password);
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
