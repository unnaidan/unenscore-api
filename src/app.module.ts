import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GraphQLModule } from '@nestjs/graphql';
import { ThrottlerModule } from '@nestjs/throttler';
import { UrlGeneratorModule } from 'nestjs-url-generator';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationModule } from './application/application.module';
import { AuthModule } from './auth/auth.module';
import { BorrowerModule } from './borrower/borrower.module';
import { FilesModule } from './files/files.module';
import { OrganizationModule } from './organization/organization.module';
import { PrismaModule } from './prisma/prisma.module';
import { S3Module } from './s3/s3.module';
import { DateScalar } from './scalars/date.scalar';
import { ScoreModule } from './score/score.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        UrlGeneratorModule.forRoot({
            secret: process.env.APP_KEY,
            appUrl: process.env.APP_URL
        }),
        EventEmitterModule.forRoot({
            ignoreErrors: true
        }),
        MailerModule.forRoot({
            transport: {
                host: process.env.MAIL_HOST,
                port: parseInt(process.env.MAIL_PORT),
                secure: true,
                auth: {
                    user: process.env.MAIL_USERNAME,
                    pass: process.env.MAIL_PASSWORD
                }
            },
            template: {
                dir: join(__dirname, 'email-templates'),
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: false
                }
            }
        }),
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 300
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            context: ({ req, res }) => ({ req, res }),
            autoSchemaFile: true,
            fieldResolverEnhancers: [
                'guards'
            ]
        }),
        ApplicationModule,
        AuthModule,
        BorrowerModule,
        FilesModule,
        OrganizationModule,
        PrismaModule,
        S3Module,
        ScoreModule,
        UserModule
    ],
    controllers: [
        AppController
    ],
    providers: [
        AppService,
        DateScalar
    ]
})
export class AppModule { }
