import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepository } from '../user.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailUniqueValidator implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const userWithEmailExist = await this.userRepository.emailExist(value);
    return !userWithEmailExist;
  }
}

export const EmailUnique = (optionValidation: ValidationOptions) => {
  return (objeto: Object, propriety: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriety,
      options: optionValidation,
      constraints: [],
      validator: EmailUniqueValidator,
    });
  };
};
