import { BoardsService } from './../boards/boards.service';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';

import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthSignInDto } from './dto/auth_sign_in.dto';
import { Body, Get, Post, Req, UseGuards } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { Controller, Logger, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { ApiCreatedResponse, ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    logger: any;
    constructor( private authService: AuthService){}
    @Post('/signup')
    @ApiOperation({
        summary: "회원 가입" ,
        description: "회원가입."
      })
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiBody({
           schema:{
             type: 'object',
             properties: {
                username:{
                    type: 'string',
                     description: "유저 이름"
                 },
                userId:{
                type: 'string',
                 description: "유저 아이디"
             },
                password:{
                 type: 'string',
                 description: "비밀번호  "
               },
           },
        },
      })
    signUp(@Body(ValidationPipe) authCredentialDto:AuthCredentialDto): Promise<void>{
        return this.authService.signUp(authCredentialDto);
    }

    @Post('/signin')
    @ApiOperation({
        summary: "로그인" ,
        description: "로그인."
      })
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiBody({
           schema:{
             type: 'object',
             properties: {
                userId:{
                type: 'string',
                 description: "유저 계정 (이메일주소) 글자수 제한 : 5~ 255"
             },
                password:{
                 type: 'string',
                 description: "비밀번호  글자수 제한 : 8 ~ 20"
               },
           },
        },
      })
      
      
      
    signIn( @Body(ValidationPipe) authsignInDto:AuthSignInDto
    ):Promise<{accessToken : String}>
    {
        Logger.log(authsignInDto);
        return this.authService.signIn(authsignInDto);
    }

    @Get('/UserList')
    @UseGuards(AuthGuard())
    @ApiBearerAuth('access-token') 
    @ApiOperation({
        summary: '모든 유저 보기 ',
        description: '모든 유저 보기 API',
      })
    UserList( 
        @GetUser() user: User
    ): Promise <User[]> {
        // this.logger.verbose(`User ${user.username} trying to get all users`);
        return this.authService.getUserList();
    }
    
    
}