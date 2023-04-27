import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { JwtConstants } from './jwt.constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        forwardRef(() => UserModule),
        PassportModule,
        JwtModule.register({
            secret: JwtConstants.secret,
            signOptions: {
                expiresIn: '7d'
            }
        })
    ],
    providers: [
        AuthService,
        JwtStrategy
    ],
    exports: [
        AuthService,
        JwtModule
    ]
})
export class AuthModule { }
