import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint()
export class IsSameConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        const [property] = args.constraints;
        return value === (args.object as any)[property];
    }
}

export function IsSame(property: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            propertyName,
            target: object.constructor,
            options: validationOptions,
            validator: IsSameConstraint,
            constraints: [
                property
            ]
        });
    };
}