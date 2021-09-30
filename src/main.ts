import {Logger, ValidationPipe} from "@nestjs/common";
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import * as helmet from 'helmet';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ConfigService} from "@nestjs/config";

require('dotenv').config();

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const config = app.get(ConfigService);
    const port = config.get('port');

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

    await app.listen(port, () => {
        Logger.log('Listening at http://localhost:' + port)
        Logger.log(`Running in ${config.get('environment')} mode `)
    });
}

bootstrap();
