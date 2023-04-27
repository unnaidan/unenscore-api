import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';

export interface IPaginatedType<T> {
    count: number;
    edges: T[];
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
    @ObjectType()
    class PaginatedType {
        @Field(() => Int)
        count: number;

        @Field(() => [classRef])
        edges: T[];
    }
    return PaginatedType;
}