import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Board } from 'src/boards/board.entity';
import * as config from 'config';

const dbconfig = config.get('db')



export const typeOPRMConfig : TypeOrmModuleOptions = {
    type:dbconfig.type,
    //AWS RDS 있으면 먼저 없으면 환경변수에 저장한 db 정보 
    host:process.env.RDS_HOSTNAME || dbconfig.host,
    port:process.env.RDS_PORT ||dbconfig.port,
    username:process.env.RDS_USERNAME ||dbconfig.username,
    password:process.env.RDS_PASSWORD ||dbconfig.password,
    database:process.env.RDS_DATABASE ||dbconfig.database,
    entities:[Board, User],
    // entities: [__dirname + '/**/*.entity.{.ts}'],

    synchronize : true
}
