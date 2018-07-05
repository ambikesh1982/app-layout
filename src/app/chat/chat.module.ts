  import { CommonModule } from '@angular/common';
  import { NgModule } from '@angular/core';
  import { FlexLayoutModule } from '@angular/flex-layout';
  import { FormsModule } from '@angular/forms';
  import { RouterModule, Routes } from '@angular/router';
  import { AuthGuard } from '../core/auth.guard';
 // import { ChatResolver } from '../core/chat.resolver';
  import { MaterialModule } from '../material.module';
  import { ChatComponent } from './chat/chat.component';
  import { ChatListComponent } from './chat-list/chat-list.component';

  const chatRoute: Routes = [
    {
      path: ':buyerid/:sellerid',
      component: ChatComponent,
      data: { title: 'CHAT_PAGE' },
    //  resolve: { chat: ChatResolver },
      canActivate: [AuthGuard]
    },
  ];

  @NgModule({
    imports: [
      CommonModule,
      FormsModule,
      MaterialModule,
      FlexLayoutModule,
      RouterModule.forChild(chatRoute)
    ],
    declarations: [ChatComponent, ChatListComponent]
  })
  export class ChatModule { }
