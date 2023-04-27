import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsBoolean, ValidateIf, ValidateNested } from 'class-validator';
import { PaginationArgs } from '../../dto/pagination-args.dto';

@InputType()
class UserWhereDto {
    @Field({ nullable: true })
    @ValidateIf((_, value) => value !== undefined)
    @IsBoolean()
    admin?: boolean;

    @Field({ nullable: true })
    @ValidateIf((_, value) => value !== undefined)
    @IsBoolean()
    emailVerified?: boolean;
}

@ArgsType()
export class UserPaginationArgs extends PaginationArgs {
    @Field(() => UserWhereDto, { nullable: true })
    @ValidateNested()
    @Type(() => UserWhereDto)
    where?: UserWhereDto;
}
