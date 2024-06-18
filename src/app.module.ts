import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    password: '2314',
    port: 3306,
    username: 'root',
    database: 'crud',
    entities: [User],
    synchronize: true,
  }),
  UsersModule,
  AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
