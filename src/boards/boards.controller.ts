import { AuthGuard } from '@nestjs/passport';
import { BoardStatus } from './boards.status.enum';
import { BoardsService } from './boards.service';
import { Controller, Get, Param, ParseIntPipe, ValidationPipe, Logger } from '@nestjs/common';
import { Body, Delete, Patch, Post, UseGuards, UsePipes } from '@nestjs/common/decorators';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    private logger = new Logger('Board');
    constructor(private boardsService:BoardsService){}

    @Get()
    getAllBoard(
        @GetUser() user: User
    ) : Promise<Board[]> {
         this.logger.verbose(`User ${user.username} trying to get all boards`);
        return this.boardsService.getAllBoards(user);
    }
    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto,
    @GetUser() user:User
    ): Promise<Board> {
        this.logger.verbose(`User ${user.username} creating a new board.
        payload: ${JSON.stringify(createBoardDto)}`)
        return this.boardsService.createBoard(createBoardDto, user);
        
    }
    @Get('/:id')
    getBoardById(@Param('id', ParseIntPipe) id:number): Promise<Board>{
        return this.boardsService.getBoardById(id);
    }
    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id,
    @GetUser() user:User
    ): Promise<void> {
         return this.boardsService.deleteBoard(id,user);
    }
    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    ){
        return this.boardsService.updateBoardStatus(id,status)
    }


    // @Get('/:id')
    // getBoardById(@Param('id') id:string): Board{
    //     return this.BoardsService.getBoardById(id);
    // }
    // @Delete('/:id')
    // deleteBoard(@Param('id') id: string): void{
    //     this.BoardsService.deleteboard(id);
    // }
    // @Patch('/:id/status')
    // updateBoardStatus(
    //     @Param('id') id: string,
    //     @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    // ){
    //     return this.BoardsService.updateBoardStatus(id,status)
    // }

}
