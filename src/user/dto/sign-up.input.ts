import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';
import { IsSame } from '../../custom-validation-decorators/is-same.decorator';
import { IsUnique } from '../../custom-validation-decorators/is-unique.decorator';
import { IsUsernameValid } from '../../custom-validation-decorators/is-username-valid.decorator';

@InputType()
export class SignUpInput {
    @Field({ nullable: true })
    @Transform(({ value }) => value?.toLowerCase().trim())
    @IsNotEmpty({ message: 'Please enter a username' })
    @Matches(new RegExp(/^[A-Za-z0-9_.]+$/), { message: 'Usernames can only contains letters, numbers, underscores and periods' })
    @IsUsernameValid({ message: 'It looks like this username is already taken' })
    @IsUnique('user', { message: 'It looks like this username is already taken' })
    @MinLength(3, { message: 'Usernames must be at least 3 characters' })
    @MaxLength(30, { message: 'Usernames may not be greater than 30 characters' })
    username: string;

    @Field({ nullable: true })
    @Transform(({ value }) => value?.toLowerCase().trim())
    @IsNotEmpty({ message: 'Please enter an email' })
    @IsEmail({}, { message: 'Please enter a valid email' })
    @IsUnique('user', { message: 'Another account is using the same email' })
    email: string;

    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Please enter a password' })
    @MinLength(8, { message: 'Passwords must be at least 8 characters' })
    password: string;

    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Please enter a password confirmation' })
    @IsSame('password', { message: 'The password and password confirmation must match.' })
    passwordConfirmation: string;
}
