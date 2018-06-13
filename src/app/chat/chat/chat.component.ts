import { Component, OnInit, Input} from '@angular/core';
import { ChatMessage, Fooditem, ChatRoomInfo } from '../../core/models';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { map } from 'rxjs/operators';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

 // @Input() sellerChatMessages: Observable<ChatMessage[]>;
  private chat: ChatMessage;
  chatMessages$: Observable<ChatMessage[]>;
  chatRoomInfo$: Observable<ChatRoomInfo[]>;
  chatMessage: ChatMessage[];
  chatRoomInfo: ChatRoomInfo;
  private fooditem: Fooditem;
  isBuyer: boolean;
  isSeller: boolean;


  ccc: any;

  constructor(private route: ActivatedRoute,
    private chatService: ChatService,
    private authService: AuthService

  ) {
    this.chat = {};
    // this.roomMessages = [];
    this.isBuyer = false;
  }

  inputMessageText: string;

  scrollToBottom() {
    try {
      document.getElementById('inner').scrollTop = document.getElementById('inner').scrollHeight;
    } catch (err) {
      console.error(err);
    }
  }

  isBuyerSeller() {
    if (this.authService.currUserID === this.fooditem.createdBy) {
       this.isSeller = true;
    } else {
       this.isBuyer = true;
    }
  }

  sendRoomMessage($event) {
    // this.chatService.createchatMessages()
    event.preventDefault();
    event.stopPropagation();

    this.chat.message = this.inputMessageText;
    this.chat.createdByUserId = this.authService.currUserID;
    this.isBuyerSeller();

        const chatroomName = this.fooditem.id + this.authService.currUserID;
        this.chatRoomInfo = { buyerID:    this.authService.currUserID,
                              buyerName: this.authService.currUserName,
                              sellerID:   this.fooditem.createdBy,
                              fooditemID: this.fooditem.id,
                              roomID:     chatroomName,
                              imageURL:   this.fooditem.images[0].url};

    console.log('chat-message buyer + fooditem id', chatroomName);
    this.chatService.createChatMessages(this.chat, this.fooditem, this.chatRoomInfo, this.isBuyer);

    this.chat = {};
    this.inputMessageText = '';
    return false;
  }

  getChatbyQuery() {
    const buyerid = this.authService.currUserID;
    console.log('buyerid---', buyerid);
    const sellerid = this.fooditem.createdBy;

    if (buyerid !== sellerid) {
      this.isBuyer = true;
    }
    const chatroomName = this.fooditem.id + buyerid;
    this.chatRoomInfo = {
      buyerID: buyerid,
      fooditemID: this.fooditem.id,
      roomID: chatroomName
    };

    if (this.isBuyer) {
    this.chatMessages$ = this.chatService.getRoomMessages(this.chatRoomInfo);
    console.log ('I am a buyer-', this.isBuyer);
    } else {
      this.isBuyerSeller();
      console.log('I am seller- ', this.isSeller);
      this.chatMessages$ = this.chatService.sellerChatMessages;
    }
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
