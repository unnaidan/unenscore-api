import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AuthenticateConstraint } from '../custom-validation-decorators/authenticate.decorator';
import { IsSameConstraint } from '../custom-validation-decorators/is-same.decorator';
import { OrganizationModule } from '../organization/organization.module';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
    providers: [
        AuthenticateConstraint,
        IsSameConstraint,
        UserResolver,
        UserService
    ],
    exports: [
        UserService
    ],
    imports: [
        forwardRef(() => AuthModule),
        forwardRef(() => OrganizationModule)
    ]
})
export class UserModule { }
