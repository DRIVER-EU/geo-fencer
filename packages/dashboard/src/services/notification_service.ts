
import io from "socket.io-client";
import { IRuleFireInfo } from "./../models/rule_fire_info";
import { Queue } from "./../utils/Queue";

export class NotificationService {

    public static getInstance(): NotificationService {
      if (!NotificationService.instance) {
        NotificationService.instance = new NotificationService();
      }
      return NotificationService.instance;
    }
    private static instance: NotificationService;

    public readonly websocketUrl = "http://localhost:9995";
    public rulesFired: Queue<IRuleFireInfo>;
    private socket!: SocketIOClient.Socket;

    private constructor() {
        this.rulesFired = new Queue<IRuleFireInfo>();
    }

    public connect() {

      this.socket = io(this.websocketUrl);
      this.socket.on("connect", () => {
          // tslint:disable-next-line:no-console
          console.log("Connected");
      });

      this.socket.on("ruleFired", this.ruleFired);
    }

    public ruleFired(jsonString: any) {
         const obj = JSON.parse(jsonString);
         try {
          const x: IRuleFireInfo = {
            hit: obj.hit,
            initial: obj.initial,
            ruleId: obj.ruleId,
            simItemGuid: obj.simItemGuid,
            timestamp: obj.timestamp,
             };
          NotificationService.getInstance().rulesFired.enqueue(x);
          // Not more as 30 items in list
          while (NotificationService.getInstance().rulesFired.count > 30) {
            NotificationService.getInstance().rulesFired.dequeue();
          }
        } catch (error) {
          // tslint:disable-next-line:no-console
          console.log(`Error: ${error}`);
        }
    }

    public disconnect() {
      if (this.socket) { this.socket.close(); }
    }

//    sendMessage() {
//      if (this.socket) this.socket.send("ghsdhfsdjfh");
//    }

}
