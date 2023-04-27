import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import { default as compression } from 'compression';
import { default as helmet } from 'helmet';
import { join } from 'path';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const prismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe({
        exceptionFactory: errors => new BadRequestException(errors)
    }));
    app.use(helmet.contentSecurityPolicy());
    app.use(helmet.dnsPrefetchControl());
    app.use(helmet.expectCt());
    app.use(helmet.frameguard());
    app.use(helmet.hidePoweredBy());
    app.use(helmet.hsts());
    app.use(helmet.ieNoOpen());
    app.use(helmet.noSniff());
    app.use(helmet.originAgentCluster());
    app.use(helmet.permittedCrossDomainPolicies());
    app.use(helmet.referrerPolicy());
    app.use(helmet.xssFilter());
    app.use(compression());
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'templates'));
    app.setViewEngine('hbs');
    useContainer(app.select(AppModule), {
        fallbackOnErrors: true
    });
    await app.listen(process.env.APP_PORT);
}
bootstrap();
