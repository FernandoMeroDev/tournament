import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.userService.findOne({ email: dto.email });
    if (existing) {
      throw new ConflictException('El usuario ya existe');
    }

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.userService.create({
      name: dto.name,
      email: dto.email,
      password: hashed,
    });

    return this.userService.sanitize(user);
  }

  async login(dto: LoginDto) {
    const user = await this.userService.findOne({ email: dto.email });
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Credenciales inválidas');

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return { user: this.userService.sanitize(user), access_token: token };
  }
}
