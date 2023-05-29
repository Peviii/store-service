import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { CaracteristicaProd } from './caracteristicaprod.entity';
import { ImagemProd } from './imagemprod.entity';
import { UserEntity } from 'src/user/user.entity';

@Entity({ name: 'produtos' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'usuario_id', length: 100, nullable: false })
  usuarioId: string;

  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'valor', nullable: false })
  valor: number;

  @Column({ name: 'qtd', nullable: false })
  qtd: number;

  @Column({ name: 'desc', length: 255, nullable: false })
  desc: string;

  @Column({ name: 'categoria', length: 100, nullable: false })
  categoria: string;

  @OneToMany(
    () => CaracteristicaProd,
    (productCaracteristica) => productCaracteristica.product,
    { cascade: true, eager: true },
  )
  caracteristicas: CaracteristicaProd[];

  @OneToMany(() => ImagemProd, (productImagem) => productImagem.product, {
    cascade: true,
    eager: true,
  })
  imagens: ImagemProd[];

  @ManyToOne(() => UserEntity, (user) => user.products, {
    cascade: true,
    eager: true,
  })
  user: UserEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
