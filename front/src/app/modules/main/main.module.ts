import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgencesModule } from '../agences/agences.module';
import { SupportModule } from '../support/support.module';
import { MainComponent } from './components/main/main.component';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';



@NgModule({
    declarations: [
      MainComponent,
      NavBarComponent
    ],
    imports: [
      RouterModule,
      CommonModule,
      AgencesModule,
      SupportModule,
    ]
})

export class MainModule { }
