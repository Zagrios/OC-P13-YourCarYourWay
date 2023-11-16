import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotLoggedGuard } from './core/guards/not-logged.guard';
import { LoggedGuard } from './core/guards/logged.guard';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { RegisterComponent } from './modules/auth/components/register/register.component';
import { AgencesComponent } from './modules/agences/components/agences/agences.component';
import { SupportComponent } from './modules/support/components/support/support.component';
import { MainComponent } from './modules/main/components/main/main.component';
import { ConversationComponent } from './modules/support/components/conversation/conversation.component';

export const routes: Routes = [
    { path: 'auth', canActivate: [NotLoggedGuard], children: [
        { path: '', redirectTo: "login", pathMatch: "full" },
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },
    ]},
    { path: '', component: MainComponent, canActivate: [LoggedGuard], children: [
        { path: '', redirectTo: "agences", pathMatch: "full" },
        { path: 'agences', component: AgencesComponent },
        { path: 'support', children: [
            { path: '', component: SupportComponent },
            { path: ':id', component: ConversationComponent}
        ] },
    ]},
    { path: '**', redirectTo: "", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
