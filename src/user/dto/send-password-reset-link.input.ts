import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsIn, IsNotEmpty } from 'class-validator';

@InputType()
export class SendPasswordResetLinkInput {
    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Please enter an email' })
    @IsEmail({}, { message: 'Please enter a valid email' })
    email: string;

    @Field({ nullable: true })
    @IsNotEmpty()
    @IsIn(['https://paiz.io', 'https://admin.paiz.io'])
    callbackUrl: string;
}
