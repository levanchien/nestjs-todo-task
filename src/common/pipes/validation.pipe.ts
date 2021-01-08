import { PipeTransform, Injectable, ArgumentMetadata, HttpStatus } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ApiException } from 'src/common/exceptions/api-exception.exception';

export interface ErrorResponse {
  value: string;
  property: string;
  messages: string[];
}

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const errorsResponse = this.extractErrorsResponse(errors);
      throw new ApiException(errorsResponse, HttpStatus.BAD_REQUEST);
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private extractErrorsResponse(errors: ValidationError[]) {
    let errorIndex = 0;
    const errorsResponse: ErrorResponse[] = [];
    for (const error of errors) {
      errorsResponse.push({
        property: error.property,
        value: error.value,
        messages: []
      });

      for (const key in error.constraints) {
        if (key && error.constraints[key]) {
          errorsResponse[errorIndex].messages.push(error.constraints[key]);
        }
      }

      errorIndex++;
    }

    return errorsResponse;
  }
}