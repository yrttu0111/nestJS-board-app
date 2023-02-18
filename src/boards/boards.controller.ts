import { AuthGuard } from '@nestjs/passport';
import { BoardStatus } from './boards.status.enum';
import { BoardsService } from './boards.service';
import { Controller, Get, Param, ParseIntPipe, ValidationPipe, Logger } from '@nestjs/common';
import { Body, Delete, Patch, Post, Query, UseGuards, UsePipes } from '@nestjs/common/decorators';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('boards')
@ApiTags('Boards')
@UseGuards(AuthGuard())
@ApiBearerAuth('access-token') 
export class BoardsController {
    private logger = new Logger('Board');
    constructor(private boardsService:BoardsService){}

    @Get()
    @ApiOperation({
        summary: '모든 개시판 보기 ',
        description: '모든 개시판 보기 API',
      })
    getAllBoard(
        @GetUser() user: User
    ) : Promise<Board[]> {
         this.logger.verbose(`User ${user.username} trying to get all boards`);
        return this.boardsService.getAllBoards(user);
    }

    @Post()
    @ApiOperation({
        summary: '개시판 생성',
        description: '개시판 생성 API',
      })
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiBody({
        schema:{
          type: 'object',
          properties: {
            title:{
             type: 'string',
              description: "제목"
          },
          description:{
            type: 'string',
             description: "내용"
         },
        },
     },
   })
    @ApiCreatedResponse({
        description: '성공여부',
        schema: {
          example: { success: true },
        },
      })
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto,
    @GetUser() user:User
    ): Promise<Board> {
        this.logger.verbose(`User ${user.username} creating a new board.
        payload: ${JSON.stringify(createBoardDto)}`)
        return this.boardsService.createBoard(createBoardDto, user);
        
    }

    @Get('/:id')
    
    @ApiOperation({
        summary: 'id로 개시판 찾기',
        description: 'id로 개시판 찾기',
      })
    @ApiParam({
        name: 'id',
        type: 'number',
    })
    @ApiCreatedResponse({
        description: '개시판 정보',
        schema: {
          example: {
          'title' : '제목입력',
          'description' : '내용입력'
        }
        },
      })
    getBoardById(@Param('id', ParseIntPipe) id:number): Promise<Board>{
        return this.boardsService.getBoardById(id);
    }

    @Delete('/:id')
    @ApiOperation({
        summary: '개시판 삭제',
        description: '개시판 삭제 API',
      })
    @ApiParam({
        name: 'id',
        type: 'number',
    })
    @ApiCreatedResponse({
        description: '성공여부',
        schema: {
          example: { success: true },
        },
      })
    deleteBoard(@Param('id', ParseIntPipe) id,
    @GetUser() user:User
    ): Promise<void> {
         return this.boardsService.deleteBoard(id,user);
    }

    @Patch('/:id/status')
    @ApiOperation({
        summary: 'id로 로 상태 바꾸기',
        description: 'default public -> private 로 변경가능 ',
      })
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiBody({
        schema:{
          type: 'object',
          properties: {
            status:{
             type: 'string',
              description: "private or public"
          },
        },
     },
   })
    // @ApiBody({
    //     description: '"status" : "PUBLIC || PRIVATE"',
    //     type: BoardStatusValidationPipe,
    // })
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus,
        
    ){
        return this.boardsService.updateBoardStatus(id,status);
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
