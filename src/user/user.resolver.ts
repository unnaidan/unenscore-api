import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User as PrismaUser } from '@prisma/client';
import { AddonService } from '../addon/addon.service';
import { AddonPaginationArgs } from '../addon/args/addon-pagination.args';
import { AddonPagination } from '../addon/entities/addon-pagination.entity';
import { AuthService } from '../auth/auth.service';
import { CurrentUser } from '../decorators/current-user.decorator';
import { PaginationArgs } from '../dto/pagination-args.dto';
import { AdminGuard } from '../guards/admin.guard';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { VerifiedGuard } from '../guards/verified.guard';
import { SocialIconPagination } from '../social-icon/entities/social-icon-pagination.entity';
import { SocialIconService } from '../social-icon/social-icon.service';
import { UserPaginationArgs } from './args/user-pagination.args';
import { ChangePasswordInput } from './dto/change-password.input';
import { SendPasswordResetLinkInput } from './dto/send-password-reset-link.input';
import { SignInInput } from './dto/sign-in.input';
import { SignUpInput } from './dto/sign-up.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserPagination } from './entities/user-pagination.entity';
import { User, UserWithAccessToken } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
    constructor(
        private readonly addonService: AddonService,
        private readonly authService: AuthService,
        private readonly socialIconService: SocialIconService,
        private readonly userService: UserService
    ) { }

    @Query(() => UserPagination)
    @UseGuards(GqlAuthGuard, VerifiedGuard, AdminGuard)
    async users(@Args() args: UserPaginationArgs) {
        return this.userService.findMany(args);
    }

    @Query(() => User, { nullable: true })
    async userByUsername(@Args('username') username: string) {
        return this.userService.findByUsername(username);
    }

    @Query(() => User)
    @UseGuards(GqlAuthGuard)
    async currentUser(@CurrentUser() user: PrismaUser) {
        return user;
    }

    @Mutation(() => UserWithAccessToken)
    async signUp(@Args('input') input: SignUpInput) {
        return this.userService.create(input)
            .then((user: PrismaUser) => {
                return this.authService.signIn(user.email);
            });
    }

    @Mutation(() => User)
    @UseGuards(GqlAuthGuard)
    async updateCurrentUser(@CurrentUser() user: PrismaUser, @Args('input') input: UpdateUserInput) {
        return this.userService.update(user.id, input);
    }

    @Mutation(() => User)
    @UseGuards(GqlAuthGuard)
    async deleteCurrentUser(@CurrentUser() user: PrismaUser) {
        return this.userService.delete(user.id);
    }

    @Mutation(() => Boolean)
    @UseGuards(GqlAuthGuard)
    async sendVerificationEmail(@CurrentUser() user: PrismaUser) {
        return this.userService.sendVerificationEmail(user).then(() => true);
    }

    @Mutation(() => UserWithAccessToken)
    async signIn(@Args('input') input: SignInInput) {
        return this.authService.signIn(input.email);
    }

    @Mutation(() => Boolean)
    async sendPasswordResetLink(@Args('input') input: SendPasswordResetLinkInput) {
        return this.userService.sendPasswordResetLink(input.email, input.callbackUrl);
    }

    @Mutation(() => Boolean)
    async changePassword(@Args('input') input: ChangePasswordInput) {
        return this.userService.changePassword(input.token, input.password);
    }

    @ResolveField(() => AddonPagination)
    async addons(@Parent() user: User, @Args() args: AddonPaginationArgs) {
        const { id } = user;
        return this.addonService.findManyByUser(id, args);
    }

    @ResolveField(() => SocialIconPagination)
    async socialIcons(@Parent() user: User, @Args() args: PaginationArgs) {
        const { id } = user;
        return this.socialIconService.findManyByUser(id, args);
    }
}
