import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { ListaUserDTO } from './dto/list.dto';
import { v4 as uuid } from 'uuid';
import { UpdateDTO } from './dto/update.dto';
import { UserService } from './user.service';

@Controller('/usuarios')
export class UserController {
  constructor(
    private userRepository: UserRepository,
    private userService: UserService,
  ) {}

  @Post()
  async criaUsuario(@Body() dataUser: UserDTO) {
    const userEntity = new UserEntity();
    userEntity.nome = dataUser.nome;
    userEntity.email = dataUser.email;
    userEntity.senha = dataUser.senha;
    userEntity.id = uuid();
    this.userService.createUser(userEntity);
    return {
      usuario: new ListaUserDTO(userEntity.id, userEntity.nome),
      message: 'usuario criado com sucesso',
    };
  }

  @Get()
  async listaUsuarios() {
    const savedUsers = await this.userService.listaUsers();
    return savedUsers;
  }

  @Put('/:id')
  async atualizaUsuario(
    @Param('id') id: string,
    @Body() updateData: UpdateDTO,
  ) {
    const atualizado = await this.userService.updateUser(id, updateData);
    return { usuario: atualizado, message: 'usuario atualizado com sucesso' };
  }

  @Delete('/:id')
  async deletaUsuario(@Param('id') id: string) {
    const deleted = await this.userService.deleteUser(id);
    return { usuario: deleted, message: 'usuario deletado com sucesso' };
  }
}
