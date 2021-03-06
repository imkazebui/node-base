import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

import { getKeyFile } from '../utils/key';
const PRIV_KEY = getKeyFile('priv.pem');

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      privateKey: PRIV_KEY,
      signOptions: {
        expiresIn: '30 days',
        algorithm: 'RS256',
      },
    }),
  ],
  exports: [AuthService],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
