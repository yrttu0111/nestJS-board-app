import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthSignInDto {
    @ApiProperty({
        example: 'jinta',
        description: '유저 아이디 4~20',
        required: true,
      })
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    userId: string;

    @ApiProperty({
        example: '123123asd',
        description: '유저 비밀번호4~20',
        required: true,
      })
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    //영어랑 숫자만 유효성 체크
    @Matches(/^[a-zA-Z0-9]*$/,{
        message: 'password only accept english and number'
    })
    password: string;
}