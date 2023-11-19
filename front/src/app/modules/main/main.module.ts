import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgencesModule } from '../agences/agences.module';
import { SupportModule } from '../support/support.module';
import { MainComponent } from './components/main/main.component';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TitleBarComponent } from './components/title-bar/title-bar.component';



@NgModule({
    declarations: [
      MainComponent,
      NavBarComponent,
      TitleBarComponent
    ],
    imports: [
      RouterModule,
      CommonModule,
      AgencesModule,
      SupportModule,
      FontAwesomeModule
    ]
})

export class MainModule { }
