import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Application {
    @Field(() => ID)
    id: string;

    @Field(() => Int)
    amount: number;

    @Field(() => Int)
    term: number;

    @Field(() => Float)
    interestRate: number;

    @Field()
    borrowerId: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}