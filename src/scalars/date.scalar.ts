import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<number, Date> {
    description = 'Date custom scalar type';

    parseValue(value: number): Date {
        return new Date(value);
    }

    serialize(value: string | number | Date): number {
        return (new Date(value)).getTime();
    }

    parseLiteral(ast: ValueNode): Date {
        if (ast.kind === Kind.INT) {
            return new Date(ast.value);
        }
        return null;
    }
}