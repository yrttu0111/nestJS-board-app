import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateBoardDto{
    @ApiProperty({
        example: '제목',
        description: '제목입력',
        required: true,
      })
    @IsNotEmpty()
    title: string;


    @ApiProperty({
        example: '내용',
        description: '내용입력',
        required: true,
      })
    @IsNotEmpty()
    description:string;
}