import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsIn, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { IsSame } from '../../custom-validation-decorators/is-same.decorator';

@InputType()
export class CreateUserInput {
    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Нэр оруулна уу' })
    @MaxLength(196, { message: 'Нэр хамгийн ихдээ 196 тэмдэгт агуулж болно' })
    name: string;

    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Овог оруулна уу' })
    @MaxLength(196, { message: 'Овог хамгийн ихдээ 196 тэмдэгт агуулж болно' })
    surname: string;

    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Албан тушаал оруулна уу' })
    @MaxLength(196, { message: 'Албан тушаал хамгийн ихдээ 196 тэмдэгт агуулж болно' })
    position: string;

    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Имэйл хаяг оруулна уу' })
    @IsEmail({}, { message: 'Зөв имэйл хаяг оруулна уу' })
    email: string;

    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Эрх сонгоно уу' })
    @IsIn(['user', 'admin'])
    role: string;

    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Нууц үг оруулна уу' })
    @MinLength(8, { message: 'Нууц үг дор хаяж 8 тэмдэгт агуулсан байх шаардлагатай' })
    password: string;

    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Нууц үг давтана уу' })
    @IsSame('password', { message: 'Нууц үгтэй таарахгүй байна.' })
    passwordConfirmation: string;
}
