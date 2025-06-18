import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresModule } from './postgres/postgres.module';
import appConfig from '../config/app.config';

@Module({
  imports: [ConfigModule.forRoot({ load: [appConfig] }), PostgresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
