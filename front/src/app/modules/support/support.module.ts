import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportComponent } from './components/support/support.component';
import { RouterModule } from '@angular/router';
import { ConversationComponent } from './components/conversation/conversation.component';



@NgModule({
  declarations: [
    SupportComponent,
    ConversationComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SupportModule { }
