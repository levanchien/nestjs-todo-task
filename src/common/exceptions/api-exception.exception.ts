import { HttpException } from "@nestjs/common";
import { ErrorResponse } from "src/common/pipes/validation.pipe";

export class ApiException extends HttpException {
    private error: ErrorResponse[];
    constructor(error: ErrorResponse[] | ErrorResponse, status: number) {
        super(error, status);
        this.error = Array.isArray(error) ? error : [error];
    }

    getErrorResponse(): ErrorResponse[] {
        return this.error;
    }
}