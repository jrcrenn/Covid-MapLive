import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../models/user/users.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { Settings } from '../models/user/settings.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Settings]), AuthModule],
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
