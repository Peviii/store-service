import { Type } from 'class-transformer';
import {
  IsArray,
  IsString,
  IsUUID,
  IsNotEmpty,
  MaxLength,
  ValidateNested,
  IsNumber,
  Min,
  ArrayMinSize,
  IsUrl,
} from 'class-validator';
import { ProductEntity } from '../product.entity';

export class CaracteristicaProdDTO {
  id: string;

  @IsString()
  @IsNotEmpty({ message: 'nome não informado' })
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'descrição não informada' })
  desc: string;

  product: ProductEntity;
}

export class ImagemProdDTO {
  id: string;

  @IsUrl()
  @IsNotEmpty({ message: 'url não informada' })
  url: string;

  @IsString()
  @IsNotEmpty({ message: 'descrição não informada' })
  desc: string;

  product: ProductEntity;
}

export class ProdutoDTO {
  @IsUUID(undefined, { message: 'ID de usuario invalido' })
  @IsNotEmpty()
  usuarioId: string;

  @IsString()
  @IsNotEmpty({ message: 'nome não informado' })
  nome: string;

  @IsNumber({
    maxDecimalPlaces: 2,
    allowNaN: false,
    allowInfinity: false,
  })
  @Min(1, { message: 'valor precisa ser maior que zero' })
  valor: number;

  @IsNumber()
  @Min(0, { message: 'quantidade minima invalida' })
  qtd: number;

  @IsNotEmpty({ message: 'descrição não informada' })
  @MaxLength(1000, { message: 'descricao nao pode ultrapassar 100 caracteres' })
  desc: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3)
  @Type(() => CaracteristicaProdDTO)
  @IsNotEmpty({ message: 'descrição não informada' })
  caracteristicas: CaracteristicaProdDTO[];

  @ValidateNested()
  @IsArray()
  @Type(() => ImagemProdDTO)
  @IsNotEmpty({ message: 'imagem não adicionada' })
  imagem: ImagemProdDTO[];

  @IsNotEmpty({ message: 'descrição não informada' })
  categoria: string;
}
