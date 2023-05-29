import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';
import { EmailUnique } from '../validation/email-unique-validator';

export class UserDTO {
  @IsString()
  @IsNotEmpty({ message: 'Nome não informado' })
  nome: string;

  @IsEmail(undefined, { message: 'email não informado' })
  @EmailUnique({ message: 'email já existe' })
  @IsNotEmpty()
  email: string;

  @MinLength(8, { message: 'a senha precisa ter 8 caracteres' })
  @IsNotEmpty()
  senha: string;
}
