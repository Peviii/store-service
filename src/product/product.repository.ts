import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductRepository {
  private produtos: ProductEntity[] = [];

  async salvar(product: ProductEntity) {
    this.produtos.push(product);
    return product;
  }

  async listar() {
    return this.produtos;
  }

  private buscaPorId(id: string) {
    const possibleProduct = this.produtos.find((product) => product.id === id);
    if (!possibleProduct) {
      throw new Error('produto não existe');
    }
    return possibleProduct;
  }

  async update(id: string, dataProduct: Partial<ProductEntity>) {
    const nonUpdatable = ['id', 'usuarioId'];
    const product = this.buscaPorId(id);

    Object.entries(dataProduct).forEach(([chave, valor]) => {
      if (nonUpdatable.includes(chave)) {
        return;
      }
      product[chave] = valor;
    });
    return product;
  }

  async delete(id: string) {
    const deleted = this.buscaPorId(id);
    this.produtos = this.produtos.filter((product) => product.id !== id);
    return deleted;
  }
}
