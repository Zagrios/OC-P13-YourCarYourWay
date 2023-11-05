import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotLoggedGuard } from './core/guards/not-logged.guard';
import { LoggedGuard } from './core/guards/logged.guard';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { RegisterComponent } from './modules/auth/components/register/register.component';
import { AgencesComponent } from './modules/agences/components/agences/agences.component';
import { SupportComponent } from './modules/support/components/support/support.component';

const routes: Routes = [
    { path: 'auth', canActivate: [NotLoggedGuard], children: [
        { path: '', redirectTo: "login", pathMatch: "full" },
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },
    ]},
    { path: '', pathMatch: "full", canActivate: [LoggedGuard], children: [
        { path: '', redirectTo: "agences", pathMatch: "full" },
        { path: 'agences', component: AgencesComponent },
        { path: 'support', component: SupportComponent },
    ]},
    { path: '**', redirectTo: "", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
