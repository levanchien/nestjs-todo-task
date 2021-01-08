import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { ErrorResponse } from 'src/common/pipes/validation.pipe';
import { AppLoggerService } from 'src/core/my-logger/my-logger.service';
import { ApiException } from './api-exception.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {

    private readonly logger = AppLoggerService.getInstance();

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const status =
        exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        let error = [] as ErrorResponse[]  ;
        if (exception instanceof ApiException) {
            error = exception.getErrorResponse();
        } else {
            error.push({
                property: '',
                value: '',
                messages: [exception.message],
            });
        }

        this.logger.error(`${JSON.stringify(error)} - ${exception.stack}`);

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            error: error
        });
    }
}