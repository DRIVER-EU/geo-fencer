
import io from "socket.io-client";
import { RuleFireInfo } from "./../models/rule_fire_info";
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
    public rulesFired: Queue<RuleFireInfo>;
    private socket!: SocketIOClient.Socket;

    private constructor() {
        this.rulesFired = new Queue<RuleFireInfo>();
    }

    public connect() {

      this.socket = io(this.websocketUrl);
      this.socket.on("connect", () => {
          console.log("Connected");
      });

      this.socket.on("ruleFired", this.ruleFired);
    }

    public ruleFired(jsonString: any) {
         const obj = JSON.parse(jsonString);
         try {
          const x: RuleFireInfo = {
            ruleId: obj.ruleId,
            simItemGuid: obj.simItemGuid,
            hit: obj.hit,
            initial: obj.initial };
          NotificationService.getInstance().rulesFired.enqueue(x);
          // Not more as 30 items in list
          while (NotificationService.getInstance().rulesFired.count > 30) { NotificationService.getInstance().rulesFired.dequeue(); }
        } catch {}
    }

    public disconnect() {
      if (this.socket) { this.socket.close(); }
    }

//    sendMessage() {
//      if (this.socket) this.socket.send("ghsdhfsdjfh");
//    }

}
