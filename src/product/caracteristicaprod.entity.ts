import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity({ name: 'caracteristica_produtos' })
export class CaracteristicaProd {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'desc', length: 100, nullable: false })
  desc: string;

  @ManyToOne(() => ProductEntity, (product) => product.caracteristicas, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product: ProductEntity;
}
