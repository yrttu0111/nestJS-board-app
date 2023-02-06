import { BoardsService } from './boards.service';
import { Controller, Get } from '@nestjs/common';

@Controller('boards')
export class BoardsController {
    constructor(private BoardsService:BoardsService){}

    @Get()
    getAllBoard() {
        return this.BoardsService.getAllBoards();
    }
}
