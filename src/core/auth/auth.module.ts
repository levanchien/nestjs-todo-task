import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/core/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { JwtModule } from '@nestjs/jwt';
import { JWT } from 'src/constants/constants';
import { JwtStategy } from './jwt.strategy';
import { ApiTokenStategy } from './api-token.strategy';
import { AuthEvent } from './auth.event';

@Module({
  providers: [
    AuthService,
    LocalStrategy,
    SessionSerializer,
    JwtStategy,
    ApiTokenStategy,
    AuthEvent
  ],
  controllers: [AuthController],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: JWT.secret,
      signOptions: { expiresIn: '60m' }
    })
  ]
})
export class AuthModule {}
