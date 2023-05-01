import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Authenticate } from '../../custom-validation-decorators/authenticate.decorator';

@InputType()
export class SignInInput {
    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Имэйл хаяг оруулна уу' })
    @Authenticate({ message: 'Имэйл хаяг эсвэл нууц үг буруу байна' })
    email: string;

    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Нууц үг оруулна уу' })
    password: string;
}
