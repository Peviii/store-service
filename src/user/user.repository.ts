import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  private usuarios: UserEntity[] = [];

  async salvar(user: UserEntity) {
    this.usuarios.push(user);
  }

  async listar() {
    return this.usuarios;
  }

  async emailExist(email: string) {
    const possibleUser = this.usuarios.find((user) => user.email === email);
    return possibleUser !== undefined;
  }

  private buscaPorId(id: string) {
    const possibleUser = this.usuarios.find((savedUser) => savedUser.id === id);
    if (!possibleUser) {
      throw new Error('Usuario não existe');
    }
    return possibleUser;
  }

  async update(id: string, dataUpdating: Partial<UserEntity>) {
    const usuario = this.buscaPorId(id);

    Object.entries(dataUpdating).forEach(([chave, valor]) => {
      if (chave === 'id') {
        return;
      }

      usuario[chave] = valor;
    });

    return usuario;
  }
  async delete(id: string) {
    const usuario = this.buscaPorId(id);
    this.usuarios = this.usuarios.filter((savedUser) => savedUser.id !== id);

    return usuario;
  }
}
