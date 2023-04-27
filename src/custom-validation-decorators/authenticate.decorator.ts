import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { AuthService } from '../auth/auth.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class AuthenticateConstraint implements ValidatorConstraintInterface {
    constructor(public authService: AuthService) { }

    async validate(value: any, args: ValidationArguments) {
        return await this.authService.validate(value, (args.object as any)['password']);
    }
}

export function Authenticate(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            propertyName,
            target: object.constructor,
            options: validationOptions,
            validator: AuthenticateConstraint
        });
    };
}