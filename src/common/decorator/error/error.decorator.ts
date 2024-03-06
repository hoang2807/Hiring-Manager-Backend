import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiResponse,
  ApiResponseOptions,
  getSchemaPath,
} from '@nestjs/swagger';
import { ErrorDto } from 'src/common/dto/error.dto';

export function ApiErrorDecorator(
  statusCode: HttpStatus,
  message: string,
  description?: string,
  options?: ApiResponseOptions,
) {
  return applyDecorators(
    ApiResponse({
      ...options,
      status: statusCode,
      description,
      schema: {
        default: {
          message: message,
          statusCode,
          date: new Date().toISOString(),
        },
        type: getSchemaPath(ErrorDto),
      },
    }),
  );
}
