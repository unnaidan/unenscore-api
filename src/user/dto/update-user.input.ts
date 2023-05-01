import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsIn, IsNotEmpty, IsUUID, MaxLength, ValidateIf } from 'class-validator';

@InputType()
export class UpdateUserInput {
    @Field({ nullable: true })
    @IsNotEmpty({ message: 'ID оруулна уу' })
    @IsUUID('4')
    id: string;

    @Field({ nullable: true })
    @ValidateIf((_, value) => value !== undefined)
    @IsNotEmpty({ message: 'Нэр оруулна уу' })
    @MaxLength(196, { message: 'Нэр хамгийн ихдээ 196 тэмдэгт агуулж болно' })
    name?: string;

    @Field({ nullable: true })
    @ValidateIf((_, value) => value !== undefined)
    @IsNotEmpty({ message: 'Овог оруулна уу' })
    @MaxLength(196, { message: 'Овог хамгийн ихдээ 196 тэмдэгт агуулж болно' })
    surname?: string;

    @Field({ nullable: true })
    @ValidateIf((_, value) => value !== undefined)
    @IsNotEmpty({ message: 'Албан тушаал оруулна уу' })
    @MaxLength(196, { message: 'Албан тушаал хамгийн ихдээ 196 тэмдэгт агуулж болно' })
    position?: string;

    @Field({ nullable: true })
    @ValidateIf((_, value) => value !== undefined)
    @IsNotEmpty({ message: 'Имэйл хаяг оруулна уу' })
    @IsEmail({}, { message: 'Зөв имэйл хаяг оруулна уу' })
    email?: string;

    @Field({ nullable: true })
    @ValidateIf((_, value) => value !== undefined)
    @IsNotEmpty({ message: 'Эрх сонгоно уу' })
    @IsIn(['user', 'admin'])
    role?: string;
}
