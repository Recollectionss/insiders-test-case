import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresModule } from './postgres/postgres.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EventModule } from './event/event.module';
import { ParticipantsModule } from './participants/participants.module';
import appConfig from '../config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [appConfig] }),
    PostgresModule,
    UserModule,
    AuthModule,
    EventModule,
    ParticipantsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
