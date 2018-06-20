import { Component, OnInit, Input} from '@angular/core';
import { ChatMessage, Fooditem, ChatRoomInfo } from '../../core/models';
import { Observable } from 'rxjs';
import { Resolve, Router, ActivatedRoute, RouterStateSnapshot, ParamMap } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { map } from 'rxjs/operators';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  private newChatMessage: ChatMessage;
  private buyerID: string;
  private selleID: string;
  chatMessages$: Observable<ChatMessage[]>;
  chatRoomInfo: ChatRoomInfo;
  isBuyer: boolean;
  isSeller: boolean;
  inputMessageText: string;
  private isRead: boolean;


  constructor(private route: ActivatedRoute,
    private chatService: ChatService,
    private authService: AuthService

  ) {
    this.newChatMessage = {};
  }

  scrollToBottom() {
    try {
      document.getElementById('inner').scrollTop = document.getElementById('inner').scrollHeight;
    } catch (err) {
      console.error(err);
    }
  }

  isBuyerSeller() {
    if (this.authService.currUserID === this.selleID) {
      this.isSeller = true;
      this.isRead = true;
    } else {
      this.isBuyer = true;
      this.isRead = false;
    }
  }

  sendRoomMessage($event) {
    event.preventDefault();
    event.stopPropagation();

    this.newChatMessage.message = this.inputMessageText;
    console.log('chat-message buyer + seller id', this.chatRoomInfo.roomID);
    this.chatService.createChatMessages(this.newChatMessage, this.chatRoomInfo);

    this.newChatMessage = {};
    this.inputMessageText = '';
    return false;
  }

  getChatbyQuery() {
    this.chatMessages$ = this.chatService.getChatRoomMessages(this.chatRoomInfo);
  }

  ngOnInit() {
    console.log('buyerid from url', this.route.snapshot.url[0].path);
    console.log('sellerid from url', this.route.snapshot.url[1].path);

    this.buyerID = this.route.snapshot.url[0].path;
    this.selleID = this.route.snapshot.url[1].path;
    this.isBuyerSeller();

    this.chatRoomInfo = {
      buyer: { id: this.buyerID, name: this.authService.currUserName},
      seller: { id: this.selleID, name: this.authService.currUserName},
      roomID: `${this.buyerID}-${this.selleID}`,
      isRead: this.isRead
    };
    this.getChatbyQuery();
  }

}
