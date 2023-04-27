import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsEmail, IsIn, IsNotEmpty, IsOptional, Matches, MaxLength, MinLength, ValidateIf } from 'class-validator';
import { IsUnique } from '../../custom-validation-decorators/is-unique.decorator';
import { IsUsernameValid } from '../../custom-validation-decorators/is-username-valid.decorator';

@InputType()
export class UpdateUserInput {
    @Field({ nullable: true })
    @IsOptional()
    @MaxLength(196, { message: 'The name may not be greater than 196 characters' })
    name?: string;

    @Field({ nullable: true })
    @ValidateIf((_, value) => value !== undefined)
    @IsNotEmpty({ message: 'Please enter a username' })
    @Matches(new RegExp(/^[A-Za-z0-9_.]+$/), { message: 'Username can only contains letters, numbers, underscores and periods' })
    @IsUsernameValid({ message: 'It looks like this username is already taken' })
    @IsUnique('user', { message: 'It looks like this username is already taken' })
    @MinLength(3, { message: 'The username must be at least 3 characters' })
    @MaxLength(30, { message: 'The username may not be greater than 30 characters' })
    username?: string;

    @Field({ nullable: true })
    @IsOptional()
    profileImage?: string;

    @Field({ nullable: true })
    @IsOptional()
    @MaxLength(160, { message: 'The bio may not be greater than 160 characters' })
    bio?: string;

    @Field({ nullable: true })
    @ValidateIf((_, value) => value !== undefined)
    @IsIn(['none', 'sensitive', 'eighteen-plus', 'twenty-one-plus', 'twenty-five-plus'])
    contentWarning?: string;

    @Field({ nullable: true })
    @ValidateIf((_, value) => value !== undefined)
    @IsIn(['dark', 'light'])
    theme?: string;

    @Field({ nullable: true })
    @ValidateIf((_, value) => value !== undefined)
    @Transform(({ value }) => value?.toLowerCase().trim())
    @IsNotEmpty({ message: 'Please enter an email' })
    @IsEmail({}, { message: 'Please enter a valid email' })
    @IsUnique('user', { message: 'Another account is using the same email' })
    @MaxLength(196, { message: 'The email may not be greater than 196 characters' })
    email?: string;
}
