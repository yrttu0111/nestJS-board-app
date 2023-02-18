import { ApiProperty } from '@nestjs/swagger';
import { Board } from 'src/boards/board.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['userId'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    @ApiProperty({ description: 'username' })
    username: string;

    @Column()
    @ApiProperty({ description: 'userId' })
    userId: string;

    @Column()
    @ApiProperty({ description: 'password' })
    password: string;

    @OneToMany(type => Board, board =>board.user, {eager: true})
    boards: Board[]
}