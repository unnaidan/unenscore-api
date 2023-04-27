import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { PrismaService } from '../prisma/prisma.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUsernameValidConstraint implements ValidatorConstraintInterface {
    constructor(public prisma: PrismaService) { }

    async validate(value: string, args: ValidationArguments) {
        const where = {
            value
        };
        return await this.prisma.reservedWord
            .count({
                where
            })
            .then((count: number) => {
                return count === 0;
            });
    }
}

export function IsUsernameValid(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            propertyName,
            target: object.constructor,
            options: validationOptions,
            validator: IsUsernameValidConstraint,
            constraints: []
        });
    };
}