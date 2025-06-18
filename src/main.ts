import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import {ConfigService, ConfigType} from "@nestjs/config";
import appConfig from "./config/app.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  const appConf:ConfigType<typeof appConfig> = configService.get('app')
  await app.listen(appConf.port);
}
bootstrap();
