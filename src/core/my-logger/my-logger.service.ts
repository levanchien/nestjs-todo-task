import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from "winston";

const { timestamp } = winston.format;

@Injectable()
export class AppLoggerService implements LoggerService {

    private static instance;

    private format = winston.format.printf(({ level, message, timestamp }) => {
        return `[${timestamp}] - [${level.toUpperCase()}]: ${message}`;
    });

    private readonly logger = winston.createLogger({
        level: 'http',
        format: winston.format.combine(
            timestamp(),
            this.format
        ),
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: 'app.log', level: 'info' }),
            new winston.transports.File({ filename: 'http.log', level: 'http' }),
            new winston.transports.File({ filename: 'error.log', level: 'error' })
        ]
    });

    error(message: string, trace: string) {        
        this.logger.error(message, trace);
    }

    log(message: any, context?: string): void {
        this.logger.info(message);
    };

    http(message) {
        this.logger.http(message);
    }

    warn(message: any, context?: string) { }

    debug?(message: any, context?: string) { }
    
    verbose?(message: any, context?: string) { }

    static getInstance() {
        if (!this.instance) {
            this.instance = new AppLoggerService();
        }
        return this.instance;
    }
}
