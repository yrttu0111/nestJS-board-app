
import { BoardStatus } from './boards.status.enum';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';


@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(Board)
        private boardRepository: Repository<Board>,
      ) {}
    
    
    async getAllBoards(
        user:User
    ): Promise<Board[]> {
        const query = this.boardRepository.createQueryBuilder('board');

        query.where('board.userId = :userId',{userId:user.id});
        const boards =await query.getMany();
        return boards;
    }
    async getBoardById(id :number): Promise<Board> {
        const found = await this.boardRepository.findOneBy({ id });
        if(!found) {
            throw new NotFoundException(`can't find Board with id ${id}`);
        }
        return found;
    }
    async createBoard(createBoardDto : CreateBoardDto, user:User): Promise<Board>{
        const {title, description} = createBoardDto;

        const board = this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
            user
        })
        console.log(board);
        await this.boardRepository.save(board)
        return board;
        
    }
    async deleteBoard(id: number, user: User ): Promise<void> {
        const result = await this.boardRepository.createQueryBuilder('board')
        .delete()
        .from(Board)
        .where("userId = :userId", { userId: user.id })
        .andWhere("id = :id", { id: id})
        .execute();

        if (result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }
    }
    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board>{
        const board = await this.getBoardById(id);
        board.status = status;
        await this.boardRepository.save(board);
        return board;
    }
     
    // private boards : Board[] = [];
    
    // getAllBoards(): Board[]{
    //     return this.boards;
        
    // }
    // createBoard(createBoardDto:CreateBoardDto) {
    //     const {title, description}= createBoardDto;

    //     const Board : Board = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status:BoardStatus.PUBLIC
    //     }
    //     this.boards.push(Board)
    //     return Board;
    // }
    // getBoardById(id:string): Board {
    //     const found = this.boards.find((board) => board.id === id)
    //     if(!found) {
    //         throw new NotFoundException(`can't find Board with id ${id}`);
    //     }
    //     return found;

    // }
    // deleteboard(id:string): void{
    //     const found = this.getBoardById(id);
    //     this.boards = this.boards.filter((board) => board.id !== found.id);
    // }
    // updateBoardStatus(id: string, status: BoardStatus):Board{
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }
}
 