import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
    @Field(() => ID)
    id: string;

    @Field()
    admin: boolean;

    @Field({ nullable: true })
    name?: string;

    @Field()
    username: string;

    @Field({ nullable: true })
    profileImage?: string;

    @Field({ nullable: true })
    bio?: string;

    @Field({ nullable: true })
    contentWarning?: string;

    @Field()
    theme: string;

    @Field()
    verified: boolean;

    @Field()
    email?: string;

    @Field()
    emailVerified: boolean;

    @HideField()
    password?: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}

@ObjectType()
export class UserWithAccessToken {
    @Field()
    accessToken: string;

    @Field(() => User)
    user: User;
}
