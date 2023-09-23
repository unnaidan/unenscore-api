import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsBoolean, IsIn, IsInt, IsNotEmpty, IsNumber, Matches, MaxLength, ValidateIf } from 'class-validator';

@InputType()
export class CalculateCreditScoreInput {
    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Нэр оруулна уу' })
    @MaxLength(196, { message: 'Хамгийн ихдээ 196 тэмдэгт агуулж болно' })
    name: string;

    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Овог оруулна уу' })
    @MaxLength(196, { message: 'Хамгийн ихдээ 196 тэмдэгт агуулж болно' })
    surname: string;

    @Field({ nullable: true })
    @Transform(({ value }) => value?.trim().toUpperCase())
    @IsNotEmpty({ message: 'Регистрийн дугаар оруулна уу' })
    @Matches(/[а-яА-ЯөүӨҮёЁ]{2}[0-9]{8}/, { message: 'Зөв регистрийн дугаар оруулна уу' })
    nationalId: string;

    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Хүйс сонгоно уу' })
    @IsIn(['Эр', 'Эм'])
    gender: string;

    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Аймаг, хот сонгоно уу' })
    @MaxLength(196, { message: 'Хамгийн ихдээ 196 тэмдэгт агуулж болно' })
    a1: string;

    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Сум, дүүрэг сонгоно уу' })
    @MaxLength(196, { message: 'Хамгийн ихдээ 196 тэмдэгт агуулж болно' })
    a2: string;

    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Баг, хороо сонгоно уу' })
    @MaxLength(196, { message: 'Хамгийн ихдээ 196 тэмдэгт агуулж болно' })
    a3: string;

    @Field(() => Int, { nullable: true })
    @IsNotEmpty({ message: 'Хаяган дээрх хугацаа оруулна уу' })
    @IsInt({ message: 'Зөвхөн тоо оруулах боломжтой' })
    a4: number;

    @Field(() => Int, { nullable: true })
    @IsNotEmpty({ message: 'Нийт хаягийн өөрчлөлтийн тоо оруулна уу' })
    @IsInt({ message: 'Зөвхөн тоо оруулах боломжтой' })
    a5: number;

    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Одоогийн хаягтаа бүртгэлтэй эсэх сонгоно уу' })
    @IsBoolean()
    a6: boolean;

    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Гэрлэсэн эсэх сонгоно уу' })
    @IsBoolean()
    b1: boolean;

    @Field(() => Int, { nullable: true })
    @IsNotEmpty({ message: 'Өрхийн гишүүдийн тоо оруулна уу' })
    @IsInt({ message: 'Зөвхөн тоо оруулах боломжтой' })
    b2: number;

    @Field(() => Int, { nullable: true })
    @IsNotEmpty({ message: 'Өрхийн орлоготой гишүүдийн тоо оруулна уу' })
    @IsInt({ message: 'Зөвхөн тоо оруулах боломжтой' })
    b3: number;

    @Field(() => Int, { nullable: true })
    @IsNotEmpty({ message: 'Өрхийн гишүүдийн дундаж наслалт оруулна уу' })
    @IsInt({ message: 'Зөвхөн тоо оруулах боломжтой' })
    b4: number;

    @Field(() => Int, { nullable: true })
    @IsNotEmpty({ message: 'Өрхийн хадгаламжтай гишүүдийн тоо оруулна уу' })
    @IsInt({ message: 'Зөвхөн тоо оруулах боломжтой' })
    b5: number;

    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Өрхийн амьдарч буй орон байр сонгоно уу' })
    @MaxLength(196, { message: 'Хамгийн ихдээ 196 тэмдэгт агуулж болно' })
    b6: string;

    @Field(() => Int, { nullable: true })
    @IsNotEmpty({ message: 'Нийт ажилласан жил оруулна уу' })
    @IsInt({ message: 'Зөвхөн тоо оруулах боломжтой' })
    c1: number;

    @Field(() => Int, { nullable: true })
    @IsNotEmpty({ message: 'Нийт ажилласан байгууллагын тоо оруулна уу' })
    @IsInt({ message: 'Зөвхөн тоо оруулах боломжтой' })
    c2: number;

    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Ажлаас гарсан шалтгаан сонгоно уу' })
    @MaxLength(196, { message: 'Хамгийн ихдээ 196 тэмдэгт агуулж болно' })
    c3: string;

    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Бизнесийн салбар сонгоно уу' })
    @MaxLength(196, { message: 'Хамгийн ихдээ 196 тэмдэгт агуулж болно' })
    c4: string;

    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Боловсролын зэрэг сонгоно уу' })
    @MaxLength(196, { message: 'Хамгийн ихдээ 196 тэмдэгт агуулж болно' })
    d1: string;

    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Мэргэжил сонгоно уу' })
    @MaxLength(196, { message: 'Хамгийн ихдээ 196 тэмдэгт агуулж болно' })
    d2: string;

    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Сургалтанд хамрагдах байдал сонгоно уу' })
    @MaxLength(196, { message: 'Хамгийн ихдээ 196 тэмдэгт агуулж болно' })
    d3: string;

    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Төрийн шагнал хүртсэн эсэх сонгоно уу' })
    @IsBoolean()
    d4: boolean;

    @Field(() => Int, { nullable: true })
    @IsNotEmpty({ message: 'Үндсэн зээлдэгчийн орлого оруулна уу' })
    @IsInt({ message: 'Зөвхөн тоо оруулах боломжтой' })
    e1: number;

    @Field(() => Int, { nullable: true })
    @IsNotEmpty({ message: 'Хамтран зээлдэгчийн орлого оруулна уу' })
    @IsInt({ message: 'Зөвхөн тоо оруулах боломжтой' })
    e2: number;

    @Field(() => Int, { nullable: true })
    @IsNotEmpty({ message: 'Зээл хүүний зардал оруулна уу' })
    @IsInt({ message: 'Зөвхөн тоо оруулах боломжтой' })
    e3: number;

    @Field(() => Int, { nullable: true })
    @IsNotEmpty({ message: 'Бусад зардал оруулна уу' })
    @IsInt({ message: 'Зөвхөн тоо оруулах боломжтой' })
    e4: number;

    @Field(() => Int, { nullable: true })
    @IsNotEmpty({ message: 'Орон байрны үнэлгээ оруулна уу' })
    @IsInt({ message: 'Зөвхөн тоо оруулах боломжтой' })
    f1: number;

    @Field(() => Int, { nullable: true })
    @IsNotEmpty({ message: 'Тээврийн хэрэгслийн үнэлгээ оруулна уу' })
    @IsInt({ message: 'Зөвхөн тоо оруулах боломжтой' })
    f2: number;

    @Field(() => Int, { nullable: true })
    @IsNotEmpty({ message: 'Бизнесийн үл хөдлөх хөрөнгийн үнэлгээ оруулна уу' })
    @IsInt({ message: 'Зөвхөн тоо оруулах боломжтой' })
    f3: number;

    @Field(() => Int, { nullable: true })
    @IsNotEmpty({ message: 'Бизнесийн тоног төхөөрөмжийн үнэлгээ оруулна уу' })
    @IsInt({ message: 'Зөвхөн тоо оруулах боломжтой' })
    f4: number;

    @Field(() => Int, { nullable: true })
    @IsNotEmpty({ message: 'Хадгаламжийн мөнгөн дүн оруулна уу' })
    @IsInt({ message: 'Зөвхөн тоо оруулах боломжтой' })
    f5: number;

    @Field({ nullable: true })
    @IsNotEmpty({ message: 'Зээлийн түүхтэй эсэх сонгоно уу' })
    @IsBoolean()
    g1: boolean;

    @Field(() => Int, { nullable: true })
    @ValidateIf(({ g1 }) => g1)
    @IsNotEmpty({ message: 'Зээл авалтын тоо оруулна уу' })
    @IsInt({ message: 'Зөвхөн тоо оруулах боломжтой' })
    g2?: number;

    @Field({ nullable: true })
    @ValidateIf(({ g1 }) => g1)
    @IsNotEmpty({ message: 'Хамгийн их зээл авсан банк сонгоно уу' })
    @MaxLength(196, { message: 'Хамгийн ихдээ 196 тэмдэгт агуулж болно' })
    g3?: string;

    @Field({ nullable: true })
    @ValidateIf(({ g1 }) => g1)
    @IsNotEmpty({ message: 'Зээлийн түүх сонгоно уу' })
    @MaxLength(196, { message: 'Хамгийн ихдээ 196 тэмдэгт агуулж болно' })
    g4?: string;

    @Field(() => Int, { nullable: true })
    @IsNotEmpty({ message: 'Хүсч буй зээлийн хэмжээ оруулна уу' })
    @IsInt({ message: 'Зөвхөн тоо оруулах боломжтой' })
    amount: number;

    @Field(() => Int, { nullable: true })
    @IsNotEmpty({ message: 'Зээлийн хугацаа оруулна уу' })
    @IsInt({ message: 'Зөвхөн тоо оруулах боломжтой' })
    term: number;

    @Field(() => Float, { nullable: true })
    @IsNotEmpty({ message: 'Зээлийн хүү оруулна уу' })
    @IsNumber({}, { message: 'Зөвхөн тоо оруулах боломжтой' })
    interestRate: number;
}
