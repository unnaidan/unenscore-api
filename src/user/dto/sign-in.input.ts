import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Authenticate } from '../../custom-validation-decorators/authenticate.decorator';

@InputType()
export class SignInInput {
    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Please enter an email' })
    @Authenticate({ message: 'Sorry, your password was incorrect' })
    email: string;

    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Please enter a password' })
    password: string;
}
