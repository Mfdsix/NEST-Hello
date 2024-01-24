import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const responseBody = exception.getResponse();

    response
      .status(HttpStatus.UNPROCESSABLE_ENTITY)
      .json({
        message: typeof responseBody == 'object' ? responseBody['message'] : undefined,
        error: 'Unprocessable Entity',
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      });
  }
}