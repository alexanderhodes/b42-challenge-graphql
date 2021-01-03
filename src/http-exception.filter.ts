import {ArgumentsHost, ExceptionFilter, Logger} from '@nestjs/common';

export class HttpExceptionFilter implements ExceptionFilter {

    private readonly logger = new Logger(HttpExceptionFilter.name);

    catch(exception: any, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        this.logger.error(exception);
    }
}
