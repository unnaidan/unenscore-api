import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        switch (context.getType() as string) {
            case 'http':
                return context
                    .switchToHttp()
                    .getRequest()
                    .user;
            case 'graphql':
                return GqlExecutionContext
                    .create(context)
                    .getContext()
                    .req
                    .user;
            default:
                return null;
        }
    }
);