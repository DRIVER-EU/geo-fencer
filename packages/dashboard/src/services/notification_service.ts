
import io from 'socket.io-client';
import { Queue } from './../utils/Queue';
import { RuleFireInfo } from './../models/rule_fire_info';

export class NotificationService {

    readonly websocketUrl = "http://localhost:9995";
    private static instance: NotificationService;
    private socket!: SocketIOClient.Socket;
    public rulesFired : Queue<RuleFireInfo>; 

    private constructor() {
        this.rulesFired = new Queue<RuleFireInfo>();
    }
  
    static getInstance(): NotificationService {
      if (!NotificationService.instance) {
        NotificationService.instance = new NotificationService();
      }
      return NotificationService.instance;
    }

    connect() {
  
      this.socket = io(this.websocketUrl);
      this.socket.on('connect', () => {
          console.log('Connected');
      });

      this.socket.on("ruleFired", this.ruleFired); 
    }

    ruleFired(jsonString : any) {
         let obj = JSON.parse(jsonString);
        try {
          const x : RuleFireInfo = { 
            ruleId: obj.ruleId,
            simItemGuid: obj.simItemGuid,
            hit: obj.hit,
            initial: obj.initial };
          NotificationService.getInstance().rulesFired.enqueue(x);
          // Not more as 30 items in list
          while ( NotificationService.getInstance().rulesFired.count > 30) NotificationService.getInstance().rulesFired.dequeue();
        } catch {}
    }

    disconnect() {
      if (this.socket) this.socket.close();
    }

//    sendMessage() {
//      if (this.socket) this.socket.send("ghsdhfsdjfh");
//    }


}
  