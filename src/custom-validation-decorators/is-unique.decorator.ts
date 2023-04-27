import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { PrismaService } from '../prisma/prisma.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
    constructor(public prisma: PrismaService) { }

    async validate(value: any, args: ValidationArguments) {
        const delegate = args.constraints[0];
        const where = {
            [args.property]: value
        };
        return await this.prisma[delegate]
            .count({
                where
            })
            .then((count: number) => {
                return count === 0;
            });
    }
}

export function IsUnique(delegate: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            propertyName,
            target: object.constructor,
            options: validationOptions,
            validator: IsUniqueConstraint,
            constraints: [
                delegate
            ]
        });
    };
}