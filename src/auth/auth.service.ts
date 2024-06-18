import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from './constants'
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(username: string, password: string,) {
    
    try {
      // Busca el usuario por nombre de usuario
      const user = await this.usersService.findOneByUsername(username);
  
      if (user && user instanceof User) {
        // Compara la contraseña proporcionada con la almacenada
        const match = await this.usersService.comparePasswords(password, user.password);
        
        if (match) {
          // Crea el payload si la contraseña coincide
          const payload = { sub: user.id, username: user.username };
  
          // Genera y retorna el token de acceso
          return {
            access_token: await this.jwtService.sign(payload, { 
              secret: jwtConstants.secret,
              expiresIn: '1h' 
            })
          };
        } else {
          return {
            message: "El usuario ingresado es incorrecto. Ingrese las credenciales nuevamente."
          }
        }
      }
    } catch(error) {
      console.log(error)
  }
}
}
