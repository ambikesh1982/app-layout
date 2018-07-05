  import { Component, OnInit } from '@angular/core';
  import { AuthService } from '../core/auth.service';
  import { AppUser, ChatRoomInfo, Fooditem } from '../core/models';
  import { DataService } from '../core/data.service';
  import { Observable } from 'rxjs';
  import { ChatService } from '../chat/chat.service';
  import { tap, flatMap } from 'rxjs/operators';
  import { ChatListComponent } from '../chat/chat-list/chat-list.component';

  @Component({
    selector: 'app-app-user',
    templateUrl: './app-user.component.html',
    styleUrls: ['./app-user.component.scss']
  })
  export class AppUserComponent implements OnInit {

    user: Observable<AppUser>;
    userid: string;
    ChatMetaData$: Observable<ChatRoomInfo[]>;
    constructor(private authService: AuthService,
                private dataService: DataService,
                private chatService: ChatService ) {
    }

    getUserChatMessage(chatRoom: ChatRoomInfo) {
      this.chatService.getChatRoomMessages(chatRoom);
      console.log('i m in userprofile');
    }

    ngOnInit() {
        this.userid = this.authService.currUserID;
        console.log(this.userid);
        this.user = this.dataService.getUserFromFirestore(this.userid);
        this.ChatMetaData$ = this.chatService.getChatRoomMetaData(this.userid);
  }
  }
