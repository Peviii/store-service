import {
  IsString,
  IsEmail,
  MinLength,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { EmailUnique } from '../validation/email-unique-validator';

export class UpdateDTO {
  @IsString()
  @IsNotEmpty({ message: 'Nome não informado' })
  @IsOptional()
  nome: string;

  @IsEmail(undefined, { message: 'email não informado' })
  @EmailUnique({ message: 'email já existe' })
  @IsNotEmpty()
  @IsOptional()
  email: string;

  @MinLength(8, { message: 'a senha precisa ter 8 caracteres' })
  @IsNotEmpty()
  @IsOptional()
  senha: string;
}
