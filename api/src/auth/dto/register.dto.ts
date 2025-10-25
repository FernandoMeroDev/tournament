import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'Nombre Usuario' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'usuario@ejemplo.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'unaPasswordSegura' })
  @IsString()
  @MinLength(6)
  password: string;
}
