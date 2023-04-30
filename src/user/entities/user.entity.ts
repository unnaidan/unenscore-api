import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
    @Field(() => ID)
    id: string;

    @Field({ nullable: true })
    profileImage?: string;

    @Field()
    name: string;

    @Field()
    surname: string;

    @Field()
    position: string;

    @Field()
    admin: boolean;

    @Field()
    email?: string;

    @Field()
    emailVerified: boolean;

    @HideField()
    password?: string;

    @Field()
    organizationId: string;

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
