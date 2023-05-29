import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaUserDTO } from './dto/list.dto';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UpdateDTO } from './dto/update.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(userEntity: UserEntity) {
    await this.userRepository.save(userEntity);
  }

  async listaUsers() {
    const savedUsers = await this.userRepository.find();
    const usersList = savedUsers.map(
      (user) => new ListaUserDTO(user.id, user.nome),
    );
    return usersList;
  }

  async updateUser(id: string, userEntity: UpdateDTO) {
    await this.userRepository.update(id, userEntity);
  }

  async deleteUser(id: string) {
    await this.userRepository.delete(id);
  }
}
