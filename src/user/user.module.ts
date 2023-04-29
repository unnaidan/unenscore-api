import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AuthenticateConstraint } from '../custom-validation-decorators/authenticate.decorator';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
    providers: [
        AuthenticateConstraint,
        UserResolver,
        UserService
    ],
    imports: [
        forwardRef(() => AuthModule)
    ],
    exports: [
        UserService
    ]
})
export class UserModule { }
