import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class VerifiedGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        switch (context.getType<string>()) {
            case 'http':
                return context
                    .switchToHttp()
                    .getRequest()
                    .user
                    .emailVerified;
            case 'graphql':
                return GqlExecutionContext
                    .create(context)
                    .getContext()
                    .req
                    .user
                    .emailVerified;
            default:
                return false;
        }
    }
}
