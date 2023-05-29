import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { ListaProdDTO } from './dto/list.dto';
import { UpdateProdDTO } from './dto/update.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(productEntity: ProductEntity) {
    await this.productRepository.save(productEntity);
  }

  async listaProducts() {
    const savedProducts = await this.productRepository.find();
    const productsList = savedProducts.map(() => new ListaProdDTO());
    return productsList;
  }

  async updateProduct(id: string, productEntity: UpdateProdDTO) {
    await this.productRepository.update(id, productEntity);
  }

  async deleteProduct(id: string) {
    await this.productRepository.delete(id);
  }
}
