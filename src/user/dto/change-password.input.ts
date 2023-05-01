import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';
import { IsSame } from '../../custom-validation-decorators/is-same.decorator';

@InputType()
export class ChangePasswordInput {
    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Шинэ нууц үг оруулна уу' })
    @MinLength(8, { message: 'Шинэ нууц үг дор хаяж 8 тэмдэгт агуулсан байх шаардлагатай' })
    password: string;

    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Шинэ нууц үг давтана уу' })
    @IsSame('password', { message: 'Шинэ нууц үгтэй таарахгүй байна.' })
    passwordConfirmation: string;
}
