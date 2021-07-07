import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  async validate(email: string, password: string): Promise<User> {
    console.log(await email);
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      console.log(await user);
      throw new UnauthorizedException();
    }
    return user;
  }
}
