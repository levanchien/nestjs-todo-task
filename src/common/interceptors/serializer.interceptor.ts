import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { isPlainObject } from 'is-plain-object';
import { Reflector } from '@nestjs/core';
import { SERIALZIER_KEYS } from '../decorators/serialzier-keys.decorator';

@Injectable()
export class SerialzierInterceptor implements NestInterceptor {

    constructor(private reflector: Reflector) {}
    
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const keys = this.reflector.getAllAndOverride(SERIALZIER_KEYS, [
            context.getHandler(),
            context.getClass()
        ]);

        return next
            .handle()
            .pipe(
                map((data) => {
                    if (data && isPlainObject(data)) {
                        return this.excludeKeys(keys, data);
                    }
                    return data;
                })
            );
    }

    private excludeKeys(keys: string[] = [], obj: any) {
        keys.forEach(key => delete obj[key]);
        return obj;
    }
}
