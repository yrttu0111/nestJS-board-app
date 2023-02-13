
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { Body, Post, Req, UseGuards } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { Controller, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService){}
    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialDto:AuthCredentialDto): Promise<void>{
        return this.authService.signUp(authCredentialDto);
    }
    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialDto:AuthCredentialDto
    ):Promise<{accessToken : String}>
    {
        return this.authService.signIn(authCredentialDto);
    }
    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user:User){
        console.log('user',user);
    }
}
 