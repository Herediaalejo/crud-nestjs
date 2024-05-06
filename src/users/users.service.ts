import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  
  @InjectRepository(User)
  private usersRepository: Repository <User>;

  public async create(createUserDto: CreateUserDto) {
    try{
      await this.usersRepository.save(createUserDto)
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
