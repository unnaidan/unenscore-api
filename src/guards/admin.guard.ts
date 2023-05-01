import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        switch (context.getType<string>()) {
            case 'http':
                return context
                    .switchToHttp()
                    .getRequest()
                    .user
                    .role === 'admin';
            case 'graphql':
                return GqlExecutionContext
                    .create(context)
                    .getContext()
                    .req
                    .user
                    .role === 'admin';
            default:
                return false;
        }
    }
}
