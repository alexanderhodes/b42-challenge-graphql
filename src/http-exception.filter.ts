import {ArgumentsHost, ExceptionFilter, Logger} from '@nestjs/common';

export class HttpExceptionFilter implements ExceptionFilter {

    private readonly logger = new Logger(HttpExceptionFilter.name);

    catch(exception: any, host: ArgumentsHost): any {
        if (exception) {
            this.logger.error(exception);
        }
    }
}
