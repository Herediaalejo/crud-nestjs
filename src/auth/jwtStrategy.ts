/* import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'oe%2/V2]>yhxL9%b£SNk2jaS/GIu?MA<rp|6~vo{tL>qJqZ~', // La misma clave secreta que usaste en el módulo de autenticación
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
 */