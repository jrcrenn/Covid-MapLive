import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_CONFIG } from './config/database.config';
import { User } from './models/user/users.entity';
import { AuthModule } from './auth/auth.module';
import { ApiModule } from './api/api.module';
import { Settings } from './models/user/settings.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...DATABASE_CONFIG, entities: [User, Settings] }),
    TypeOrmModule.forRoot({ ...DATABASE_CONFIG, entities: [User] }),
    UsersModule,
    AuthModule,
    ApiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
