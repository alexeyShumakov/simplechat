import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MessagesService} from "../services/messages.service";
import {Message} from "../proto/chat_pb";

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css']
})
export class MessagesListComponent implements OnInit {

  @ViewChild('wrapper', {static: false}) wrapper: ElementRef;

  constructor(
    private messagesService: MessagesService
  ) { }

  ngOnInit() {
    this.messagesService.messagesSub.subscribe(value => {
      this.scrollToBottom();
    })
  }

  scrollToBottom() {
    setTimeout(() => {
      this.wrapper.nativeElement.scrollTo(0, this.wrapper.nativeElement.scrollHeight)
    }, 0);
  }

  getDate(message: Message): Date {
    return new Date(
      Date.parse(
        message.getCreated()
      )
    );
}

}
