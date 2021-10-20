import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { WebSocketsService } from "../../services/web-sockets.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  userChat = {
    user: '',
    text: ''
  }

  myMessages;

  eventName = "send-message";

  constructor(private activatedRoute: ActivatedRoute,
    private webSocketsService: WebSocketsService) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.userChat.user = id;

    this.webSocketsService.listen('text-event').subscribe((data) => {
      this.myMessages = data;
    })
  }

  myMessage(){
    this.webSocketsService.emit(this.eventName, this.userChat);
    this.userChat.text = '';
  }

}
