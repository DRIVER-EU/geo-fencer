/*
Basic service for logging.

In the future logging must be specified to go to file, websocket, console, kafka

TODO Replace by Logging framework or improve
- add source filtering (only messages from ....)
- formatting

*/


export interface ILogService {
    LogMessage(msg: string): void;
    LogErrorMessage(msg: string, ex?: Error): void;
}

export class LogService implements ILogService {

   //  private logKafka = Logger.instance;

    constructor() {
    }

    LogMessage(msg: string) {
        console.log(msg);
    }

    LogErrorMessage(msg: string, err?: Error) {
        console.error(msg);
        if (err) console.error(err.message);
    }
}

