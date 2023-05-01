import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Borrower {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    surname: string;

    @Field()
    nationalId: string;

    @Field()
    gender: string;

    @Field()
    a1: string;

    @Field()
    a2: string;

    @Field()
    a3: string;

    @Field(() => Int)
    a4: number;

    @Field(() => Int)
    a5: number;

    @Field()
    a6: boolean;

    @Field()
    b1: boolean;

    @Field(() => Int)
    b2: number;

    @Field(() => Int)
    b3: number;

    @Field(() => Int)
    b4: number;

    @Field(() => Int)
    b5: number;

    @Field()
    b6: string;

    @Field(() => Int)
    c1: number;

    @Field(() => Int)
    c2: number;

    @Field()
    c3: string;

    @Field()
    c4: string;

    @Field()
    d1: string;

    @Field()
    d2: string;

    @Field()
    d3: string;

    @Field()
    d4: boolean;

    @Field(() => Int)
    e1: number;

    @Field(() => Int)
    e2: number;

    @Field(() => Int)
    e3: number;

    @Field(() => Int)
    e4: number;

    @Field(() => Int)
    f1: number;

    @Field(() => Int)
    f2: number;

    @Field(() => Int)
    f3: number;

    @Field(() => Int)
    f4: number;

    @Field(() => Int)
    f5: number;

    @Field()
    g1: boolean;

    @Field(() => Int)
    g2: number;

    @Field()
    g3: string;

    @Field()
    g4: string;

    @Field()
    organizationId: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}