import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "./boards.status.enum";

@Entity()
export class Board extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    @ApiProperty({ description: 'title' })
    title: string;

    @Column()
    @ApiProperty({ description: 'description' })
    description: string;
    
    @Column()
    @ApiProperty({ description: 'status' })
    status: BoardStatus;

    @ManyToOne(type => User, user=>user.boards,{eager:false})
    user: User;
}