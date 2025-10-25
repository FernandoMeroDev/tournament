import {
  Controller,
  Get,
  Param,
  UseGuards,
  Req,
  Put,
  Body,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('bearer')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los usuarios (protegido)' })
  async findAll() {
    const users = await this.userService.findAll();
    return users.map((u) => this.userService.sanitize(u) as UserDto);
  }

  @Get('me')
  @ApiOperation({ summary: 'Obtener usuario actual' })
  async me(@Req() req: any) {
    return req.user;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener usuario por id' })
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findById(Number(id));
    return this.userService.sanitize(user) as UserDto;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar usuario por id' })
  async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const user = await this.userService.update(Number(id), body as any);
    return this.userService.sanitize(user) as UserDto;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar usuario por id' })
  async remove(@Param('id') id: string) {
    await this.userService.remove(Number(id));
    return { deleted: true };
  }
}
