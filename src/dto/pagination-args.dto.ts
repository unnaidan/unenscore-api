import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';

@ArgsType()
export class PaginationArgs {
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    search?: string;

    @Field(() => Int, { nullable: true })
    @ValidateIf((_, value) => value !== undefined)
    @IsNotEmpty()
    @IsInt()
    skip?: number;

    @Field(() => Int, { nullable: true })
    @ValidateIf((_, value) => value !== undefined)
    @IsNotEmpty()
    @IsInt()
    take?: number;

    @Field({ nullable: true })
    @ValidateIf((_, value) => value !== undefined)
    @IsNotEmpty()
    sortBy?: string;

    @Field({ nullable: true })
    @ValidateIf((_, value) => value !== undefined)
    @IsNotEmpty()
    @IsIn(['asc', 'desc'])
    sortOrder?: 'asc' | 'desc';
}