import { Component, OnInit } from '@angular/core';
import { ChatMessage } from '../../core/models';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  private chat: ChatMessage;
  private chatMessages$: Observable<ChatMessage[]>;
          chatMessage: ChatMessage[];
  constructor(private route: ActivatedRoute,
    private dataService: DataService
  ) {
    this.chat = {};
    // this.roomMessages = [];
  }

  inputMessageText: string;

  scrollToBottom() {
    try {
      document.getElementById('inner').scrollTop = document.getElementById('inner').scrollHeight;
    } catch (err) {
      console.error(err);
    }
  }

  createNewchatMessages($event) {
    event.preventDefault();
    event.stopPropagation();

    this.chat.messageId = 'Authid';
    this.chat.message = this.inputMessageText;
    this.dataService.createChatMessages(this.chat);
    console.log('NewchatMessages', this.chat);
  }

  sendRoomMessage($event) {
    // this.dataService.createchatMessages()
    event.preventDefault();
    event.stopPropagation();
    this.chat.message = this.inputMessageText;
    this.dataService.createChatMessages(this.chat);
   // this.dataService.insertRoomMessage(this.chatMessages);

    console.log('chat-message', this.chat.message);
    this.chat = {};
    this.inputMessageText = '';
    return false;
  }

  getChatbyQuery() {
    this.chatMessages$ = this.dataService.getRoomMessages();
    this.chatMessages$.subscribe(messages => {
      console.log('observable', messages);
      this.chatMessage = messages;
    });

    /*{
    if (messages) {
      this.roomMessages = messages;
      console.log('room messages', this.roomMessages);
    }
  });*/

  }
  ngOnInit() {
    console.log('Chat-Room', this.route);
    console.log('input=', this.inputMessageText);
    this.getChatbyQuery();
    this.scrollToBottom();
  }

}
