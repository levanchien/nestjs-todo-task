import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from "winston";
import * as moment from 'moment';

const { timestamp } = winston.format;
const levelFilter = (level: string) =>
    winston.format((info, opts) => {        
        if (info.level != level) { return false; }
        return info;
})();
const format = winston.format.combine(
    timestamp({
        format: 'DD-MM-YYYY HH:mm:ss'
    }),
    winston.format.printf(({ level, message, timestamp }) => {
        return `[${timestamp}] - [${level.toUpperCase()}]: ${message}`;
    })
);
const logLevels = {
    error: 0, 
    info: 1, 
    http: 2,
    event: 3,
    schedule: 4
}

@Injectable()
export class AppLoggerService implements LoggerService {

    private static instance;

    private readonly logger = winston.createLogger({
        levels: logLevels,
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({
                filename: `logs/app-${moment().format('DD-MM-YYYY')}.log`,
                level: 'info',
                maxsize: 1000000,
                format: winston.format.combine(
                    levelFilter('info'),
                    format
                )
            }),
            new winston.transports.File({
                filename: `logs/http-${moment().format('DD-MM-YYYY')}.log`,
                level: 'http',
                maxsize: 1000000,
                format: winston.format.combine(
                    levelFilter('http'),
                    format
                )
            }),
            new winston.transports.File({
                filename: `logs/error-${moment().format('DD-MM-YYYY')}.log`,
                level: 'error',
                maxsize: 1000000,
                format: winston.format.combine(
                    levelFilter('error'),
                    format
                )
            }),
            new winston.transports.File({
                filename: `logs/event-${moment().format('DD-MM-YYYY')}.log`,
                level: 'event',
                maxsize: 1000000,
                format: winston.format.combine(
                    levelFilter('event'),
                    format
                )
            }),
            new winston.transports.File({
                filename: `logs/schedule-${moment().format('DD-MM-YYYY')}.log`,
                level: 'schedule',
                maxsize: 1000000,
                format: winston.format.combine(
                    levelFilter('schedule'),
                    format
                )
            })
        ]
    });

    error(exception: any) {        
        this.logger.log('error', `${exception}`);
    }

    log(message: any, context?: string): void {
        this.logger.log('info', message);
    };

    http(message) {
        this.logger.log('http', message);
    }

    event(message) {
        this.logger.log('event', message);
    }

    schedule(message) {
        this.logger.log('schedule', message);
    }

    warn(message: any, context?: string) { }

    debug?(message: any, context?: string) { }
    
    verbose?(message: any, context?: string) { }

    static getInstance(): AppLoggerService {
        if (!this.instance) {
            this.instance = new AppLoggerService();
        }
        return this.instance;
    }
}
