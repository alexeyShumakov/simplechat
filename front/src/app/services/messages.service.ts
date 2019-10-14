import {grpc} from "@improbable-eng/grpc-web";
import {Injectable} from '@angular/core';
import {Messenger} from "../proto/chat_pb_service";
import {Counters, Message} from "../proto/chat_pb";
import {Subject} from "rxjs";
import {scan} from "rxjs/operators";
import Client = grpc.Client;
import ProtobufMessage = grpc.ProtobufMessage;

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  online = 0;
  messages = 0;
  // TODO: move to env
  host = "http://localhost:9090";
  client = null;
  msges: Message[] = [];
  messagesSub: Subject<Message>;
  userName = '';
  countersClient: Client<ProtobufMessage, ProtobufMessage>;
  chatClient: Client<ProtobufMessage, ProtobufMessage>;
  constructor() {
    this.messagesSub = new Subject<Message>();
    this.countersClient = grpc.client(Messenger.GetCounters, {
      host: this.host,
      transport: grpc.WebsocketTransport()
    });

    this.chatClient = grpc.client(Messenger.MessengerChat, {
      host: this.host,
      transport: grpc.WebsocketTransport()
    });

    this.listenCounters();
    this.listenMessages();
  }

  isUserNameSetup(): boolean {
    return this.userName != '';
  }

  listenCounters() {
    const req = new Message();
    this.countersClient.onMessage((message: Counters) => {
      this.online = message.getUsersonline();
      this.messages = message.getTotalmessages();
    });
    this.countersClient.start();
    this.countersClient.send(req);
  }

  listenMessages() {
    this.messagesSub.pipe(
      scan((acc: Message[], val: Message) => [...acc, val] , [])
    ).subscribe(messages => {
      this.msges = messages;
    });
    const req = new Message();
    this.chatClient.onMessage((message: Message) => {
      this.messagesSub.next(message);
    });
    this.chatClient.start();
    this.chatClient.send(req);
  }
  createMessage(message: string) {
    const req = new Message();
    const now = new Date();
    req.setValue(message);
    req.setCreated(now.toISOString());
    req.setUsername(this.userName);
    grpc.unary(Messenger.CreateMessage, {
      request: req,
      host: this.host,
      onEnd: res => {}
    })
  }
}
