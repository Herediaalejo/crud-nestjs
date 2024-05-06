import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      statusCode: 200,
      msg: 'Hola! Esta api responde a la ruta /users'
    };
  }
}
