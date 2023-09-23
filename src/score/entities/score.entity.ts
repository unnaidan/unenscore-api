import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Score {
    @Field(() => ID)
    id: string;

    @Field()
    a1: string;

    @Field(() => Int)
    a2: number;

    @Field(() => Float)
    a3: number;

    @Field(() => Int)
    a4: number;

    @Field(() => Int)
    a5: number;

    @Field(() => Float)
    a6: number;

    @Field(() => Float)
    a7: number;

    @Field(() => Float)
    a8: number;

    @Field(() => Float)
    a9: number;

    @Field()
    applicationId: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}
