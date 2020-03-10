import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = ( typeof exception['getStatus'] === 'function') ? exception.getStatus() : 500 /* Internal server error */;

    response
      .status(status)
      .json({
        errorMsg: exception.message,
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}