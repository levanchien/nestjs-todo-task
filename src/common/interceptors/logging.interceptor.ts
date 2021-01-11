import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppLoggerService } from 'src/core/my-logger/my-logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

    private readonly logger = AppLoggerService.getInstance();

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const { headers, body, param, query, url } = context.switchToHttp().getRequest();
        this.logger.http(`REQUEST: ` + JSON.stringify({ url, headers, query, param, body }));
        return next
            .handle()
            .pipe(
                tap((data) => {
                    this.logger.http(`RESPONSE: ` + `${JSON.stringify(data)}`)
                }),
            );
    }
}
