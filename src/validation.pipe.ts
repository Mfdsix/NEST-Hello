import { PipeTransform, ArgumentMetadata, BadRequestException, UnprocessableEntityException, InternalServerErrorException } from '@nestjs/common';
import { ZodError, ZodSchema  } from 'zod';

export class ValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      if( error instanceof ZodError ){
        throw new UnprocessableEntityException(error.issues.map((err) => {
          return {
            path: err.path[0],
            message: err.message
          }
        }))
      }

      throw new InternalServerErrorException(error)
    }
  }
}
