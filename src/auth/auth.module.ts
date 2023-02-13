import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as config from 'config' 

@Module({
  imports : [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret:process.env.JWT_SECRET || config.get('jwt.secret'),
      signOptions :{
       expiresIn: 60*60,
    }
  })
],
  exports : [TypeOrmModule, JwtStrategy, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],

})
export class AuthModule {}
