import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgencesModule } from '../agences/agences.module';
import { SupportModule } from '../support/support.module';
import { MainComponent } from './components/main/main.component';
import { AppRoutingModule } from 'src/app/app-routing.module';



@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    AgencesModule,
    SupportModule,
  ]
})
export class MainModule { }
