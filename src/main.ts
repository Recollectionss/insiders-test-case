import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ConfigService, ConfigType } from '@nestjs/config';
import appConfig from './config/app.config';
import postgresConfig from './config/postgres.config';
import { postgresTestConnection } from './modules/postgres/postgres.test.connection';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const appConf: ConfigType<typeof appConfig> = configService.get('app');
  const postgresConf: ConfigType<typeof postgresConfig> =
    configService.get('postgres');

  const config = new DocumentBuilder()
    .setTitle('Events')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(appConf.port);
  await postgresTestConnection(postgresConf, appConf);
}
bootstrap();
