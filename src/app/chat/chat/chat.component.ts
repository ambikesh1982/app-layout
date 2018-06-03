import { Component, OnInit } from '@angular/core';
import { ChatMessage, Fooditem, ChatRoomInfo } from '../../core/models';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../core/data.service';
import { AuthService } from '../../core/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  private chat: ChatMessage;
  private chatMessages$: Observable<ChatMessage[]>;
  private chatRoomInfo$: Observable<ChatRoomInfo[]>;
  chatMessage: ChatMessage[];
  chatRoomInfo: ChatRoomInfo;
  private fooditem: Fooditem;

  constructor(private route: ActivatedRoute,
    private dataService: DataService,
    private authService: AuthService

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

  sendRoomMessage($event) {
    // this.dataService.createchatMessages()
    event.preventDefault();
    event.stopPropagation();

    this.chat.message = this.inputMessageText;


    const buyerid = this.authService.currUserID;
    const sellerid = this.fooditem.createdBy;
    const chatroomName = sellerid + buyerid + this.fooditem.id;
    this.chatRoomInfo = { buyerID: buyerid,
                          sellerID: sellerid,
                          fooditemID: this.fooditem.id,
                          roomID: chatroomName};
    // const chatroomName = buyerid;
    console.log('chat-message buyer + seller id', chatroomName);

    this.dataService.createChatMessages(this.chat, this.fooditem, this.chatRoomInfo);

    console.log('chat-message buyer id', buyerid);
    console.log('chat-message', this.chat.message);
    this.chat = {};
    this.inputMessageText = '';
    return false;
  }

  getChatbyQuery() {
    const buyerid = this.authService.currUserID;
    console.log('buyerid---', buyerid);
    const sellerid = this.fooditem.createdBy;
    const chatroomName = sellerid + buyerid + this.fooditem.id;
    this.chatRoomInfo = {
      buyerID: buyerid,
      sellerID: sellerid,
      fooditemID: this.fooditem.id,
      roomID: chatroomName
    };
     this.chatMessages$ = this.dataService.getRoomMessages(this.chatRoomInfo);
    // this.chatMessages$ = this.dataService.getSellerMessages(this.fooditem);

     this.chatMessages$.subscribe(messages => {
      console.log('observable chat messages', messages);
      this.chatMessage = messages;
    });



  }
  ngOnInit() {
    console.log('Chat-Room route', this.route);
    console.log('input=', this.inputMessageText);
    // this.getChatbyQuery();
    // this.scrollToBottom();
    this.fooditem = this.route.snapshot.data['chat'];
    console.log('FoodItem from Router in chat=', this.fooditem);

    this.getChatbyQuery();
    // console.log('chatdata from Router=', this.fooditem);

  }

}
