import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UpdateProdDTO } from 'src/product/dto/update.dto';
import { ProdutoDTO } from './dto/produto.dto';
import { ListaProdDTO } from './dto/list.dto';
import { ProductEntity } from './product.entity';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

@Controller('/produtos')
export class ProductController {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productService: ProductService,
  ) {}

  @Post()
  async criaProduto(@Body() dataProduct: ProdutoDTO) {
    const product = new ProductEntity();

    product.id = randomUUID();
    product.nome = dataProduct.nome;
    product.usuarioId = dataProduct.usuarioId;
    product.valor = dataProduct.valor;
    product.qtd = dataProduct.qtd;
    product.desc = dataProduct.desc;
    product.categoria = dataProduct.categoria;
    product.caracteristicas = dataProduct.caracteristicas;
    product.imagens = dataProduct.imagem;

    const cadastrado = this.productService.createProduct(product);
    return cadastrado;
  }

  @Get()
  async listaProdutos() {
    const savedProducts = await this.productService.listaProducts();
    const productsList = savedProducts.map(() => new ListaProdDTO());
    return productsList;
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() dataProduct: UpdateProdDTO) {
    const updatedProd = await this.productService.updateProduct(
      id,
      dataProduct,
    );
    return { product: updatedProd, message: 'produto atualizado com sucesso' };
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    const deletedProd = await this.productService.deleteProduct(id);
    return { product: deletedProd, message: 'produto deletado com sucesso' };
  }
}
