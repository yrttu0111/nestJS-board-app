import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './boards/boards.module';
import { typeOPRMConfig } from './configs/typeorm.config'
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOPRMConfig),
    BoardsModule,
    AuthModule,
],
})
export class AppModule {}
