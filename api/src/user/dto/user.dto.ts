import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Juan Perez' })
  name: string;

  @ApiProperty({ example: 'juan@ejemplo.com' })
  email: string;

  @ApiProperty({ example: 'user' })
  role: string;

  @ApiProperty({ example: true })
  estado: boolean;

  @ApiProperty({ example: '1990-01-01' })
  fecha_nacimiento?: Date;

  @ApiProperty({ example: '123456789' })
  telefono?: string;
}
