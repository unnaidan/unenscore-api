import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';
import { IsSame } from '../../custom-validation-decorators/is-same.decorator';

@InputType()
export class ChangePasswordInput {
    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Please enter a password reset token' })
    token: string;

    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Please enter a password' })
    @MinLength(8, { message: 'Passwords must be at least 8 characters' })
    password: string;

    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Please enter a password confirmation' })
    @IsSame('password', { message: 'The password and password confirmation must match.' })
    passwordConfirmation: string;
}
