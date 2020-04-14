import { Module, HttpModule } from '@nestjs/common';
import { ApiService } from './api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../models/user/users.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { APP_CONFIG } from '../config/app.config';
import {CovidController} from "./Covid_API/covid.controller";
import {CovidService} from "./Covid_API/covid.service";

@Module({
  imports: [TypeOrmModule.forFeature([User]),
    HttpModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: APP_CONFIG.secretKey,
      signOptions: { algorithm: 'HS512', expiresIn: APP_CONFIG.expiresIn },
    }),
  ],
  controllers: [CovidController],
  providers: [ApiService, CovidService],
})
export class ApiModule {}
