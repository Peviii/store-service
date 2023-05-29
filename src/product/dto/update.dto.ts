import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { CaracteristicaProdDTO, ImagemProdDTO } from './produto.dto';

export class UpdateProdDTO {
  @IsUUID(undefined, { message: 'id do produto invalido' })
  id: string;
  @IsUUID(undefined, { message: 'ID de usuário inválido' })
  usuarioId: string;

  @IsString()
  @IsNotEmpty({ message: 'Nome do produto não pode ser vazio' })
  @IsOptional()
  nome: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @IsOptional()
  @Min(1, { message: 'O valor precisa ser maior que zero' })
  @IsOptional()
  valor: number;

  @IsNumber()
  @Min(0, { message: 'Quantidade mínima inválida' })
  @IsOptional()
  qtd: number;

  @IsString()
  @IsOptional()
  desc: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3)
  @Type(() => CaracteristicaProdDTO)
  @IsOptional()
  caracteristicas: CaracteristicaProdDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ImagemProdDTO)
  @IsOptional()
  imagem: ImagemProdDTO[];

  @IsString()
  @IsNotEmpty({ message: 'Categoria do produto não pode ser vazia' })
  @IsOptional()
  categoria: string;
}
