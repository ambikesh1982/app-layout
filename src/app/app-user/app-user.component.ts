import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { AppUser, ChatRoomInfo } from '../core/models';
import { DataService } from '../core/data.service';
import { Observable } from 'rxjs';
import { ChatService } from '../chat/chat.service';

@Component({
  selector: 'app-app-user',
  templateUrl: './app-user.component.html',
  styleUrls: ['./app-user.component.scss']
})
export class AppUserComponent implements OnInit {

  user: Observable<AppUser>;
  userid: string;
  ChatMetaData$: Observable<any>;
  roomMetaData: Observable<ChatRoomInfo[]>;
  constructor(private authService: AuthService,
              private dataService: DataService,
              private chatService: ChatService ) {
  }



  ngOnInit() {
     this.userid = this.authService.currUserID;
     console.log(this.userid);
      this.user = this.dataService.getUserFromFirestore(this.userid);
      this.user.subscribe(user => {
      const name = user.displayName;
      const url = user.photoURL;
      this.ChatMetaData$ = this.chatService.getRoomMetaData(this.userid);

     });
  }

}
