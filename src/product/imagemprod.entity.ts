import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity({ name: 'imagem_produtos' })
export class ImagemProd {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'url', length: 100, nullable: false })
  url: string;

  @Column({ name: 'desc', length: 100, nullable: false })
  desc: string;

  @ManyToOne(() => ProductEntity, (product) => product.imagens, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product: ProductEntity;
}
