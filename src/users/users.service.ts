import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
/* import { AuthService } from 'src/auth/auth.service';  */
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  /* constructor(private readonly authService : AuthService){} */
  
  @InjectRepository(User)
  private usersRepository: Repository <User>;

  public async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  public async comparePasswords(password: string, hashedPassword: string): Promise<string> {
      return await bcrypt.compare(password, hashedPassword);
  }

  public async create(user: CreateUserDto) {
    let match : boolean = false;
    try{
      const users = await this.usersRepository.find()
      for (let userF of users) {
        if (user.username === userF.username) {
          match = true
        }
      }
      if(match){
        throw Error('Ya existe un usuario con ese username')
      }
      const username = user.username
      const hashedPassword = await this.hashPassword(user.password)
      await this.usersRepository.save({ username, password : hashedPassword })
      return {
        statusCode: 200,
        msg: 'El usuario se inserto adecuadamente'
      };
    } catch (error) {
      return new BadRequestException(error)
    }
  }

  public async findAll() {
    try{
      const users = await this.usersRepository.find()
      if (users.length > 0) {
        return users
      } else {
        return {
          statusCode: 400,
          msg: "No existen usuarios"
        }
      }
    } catch (error) {
      return new BadRequestException(error)
    }
  }

  public async findOne(id: number) {
    try{
      const user = await this.usersRepository.findOneBy({id: id})
      if (user) {
        return user
      } else {
        return {
          "statusCode": 400,
          "msg": "El usuario no existe"
        }
      }
    } catch (error) {
      return new BadRequestException(error)
    }
  }

  public async findOneByUsername(username: string) {
    try{
      const user = await this.usersRepository.findOneBy({username: username})
      if (user) {
        return user
      } else {
        return {
          statusCode: 400,
          msg: "El usuario no existe"
        }
      }
    } catch (error) {
      return new BadRequestException(error)
    }
  }

  public async login(username: string, password: string) {
    try{
      let match : any
      let id : any
      const users = await this.usersRepository.find()
      for (let user of users) {
        if (username === user.username) {
          match = await this.comparePasswords(password, user.password)
          if(match){
            id = user.id
          }
        }
      }
      if(!match){
        return {
          statusCode: 401,
          msg: "Credenciales incorrectas"
        }
      }
      const payload = { sub: id, username: username };
      /* const token = this.authService.generateToken({ username, sub: id }) */
      return {
          statusCode: 200,
          msg: "Inicio de sesión exitoso",
          /* token */
        }
      } catch (error) {
      return new BadRequestException(error)
    }
  }

  public async update(id: number, newUser: UpdateUserDto) {
    try{
      await this.usersRepository.update(id, newUser)
      return {
        statusCode: 200,
        msg: 'El usuario se actualizó adecuadamente'
      };
    } catch (error) {
      return new BadRequestException(error)
    }
  }

  public async remove(id: number) {
    try{
      await this.usersRepository.delete(id)
      return {
        statusCode: 200,
        msg: 'El usuario se elimino con exito'
      };
    } catch (error) {
      return new BadRequestException(error)
    }
  }
}
