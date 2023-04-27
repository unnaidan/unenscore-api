import { forwardRef, Module } from '@nestjs/common';
import { AddonModule } from '../addon/addon.module';
import { AuthModule } from '../auth/auth.module';
import { AuthenticateConstraint } from '../custom-validation-decorators/authenticate.decorator';
import { IsUniqueConstraint } from '../custom-validation-decorators/is-unique.decorator';
import { IsUsernameValidConstraint } from '../custom-validation-decorators/is-username-valid.decorator';
import { SocialIconModule } from '../social-icon/social-icon.module';
import { UserCreatedListener } from './listeners/user-created.listener';
import { UserController } from './user.controller';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
    providers: [
        AuthenticateConstraint,
        IsUsernameValidConstraint,
        IsUniqueConstraint,
        UserCreatedListener,
        UserResolver,
        UserService
    ],
    controllers: [
        UserController
    ],
    imports: [
        forwardRef(() => AddonModule),
        forwardRef(() => AuthModule),
        forwardRef(() => SocialIconModule)
    ],
    exports: [
        UserService
    ]
})
export class UserModule { }
