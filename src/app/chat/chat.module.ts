import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { ChatComponent } from './chat/chat.component';
import { Routes, RouterModule } from '@angular/router';
import { ChatResolver } from '../core/chat.resolver';
import { AuthGuard } from '../core/auth.guard';

const chatRoute: Routes = [
  {
    path: 'chat/:fid',
    component: ChatComponent,
    data: { title: 'CHAT_PAGE' },
    resolve: { chat: ChatResolver },
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
  declarations: [ChatComponent]
})
export class ChatModule { }
