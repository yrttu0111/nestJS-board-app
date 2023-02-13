import { AuthModule } from './../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Board]),
  AuthModule
  ],
  exports : [TypeOrmModule],
  controllers: [BoardsController],
  providers: [BoardsService]
})
export class BoardsModule {}
