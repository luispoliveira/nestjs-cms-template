import {ValidationPipe} from "@nestjs/common";
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import * as helmet from 'helmet';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

require('dotenv').config();

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.use(helmet());
    app.enableCors();

    const swaggerConfig = new DocumentBuilder()
        .setTitle('NestJS CMS Template')
        .setDescription('APIs for NestJS CMS')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

    SwaggerModule.setup('api-docs', app, swaggerDocument);

    app.useGlobalPipes(new ValidationPipe({transform: true}))

    await app.listen(process.env.SERVER_PORT);
}

bootstrap();
