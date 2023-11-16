import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { map, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent {

    @ViewChild('username') usernameElement: ElementRef;
    @ViewChild('password') passwordElement: ElementRef;

    public constructor(
        private auth: AuthService,
        private router: Router,
        usernameElement: ElementRef,
        passwordElement: ElementRef,
    ){
        this.usernameElement = usernameElement;
        this.passwordElement = passwordElement;
    }

    public onClick(){
        const username = this.usernameElement.nativeElement.value;
        const password = this.passwordElement.nativeElement.value;

        this.auth.login({username, password}).then(logged => {
            if(!logged){ return; }
            this.router.navigate(['/']);
        });
    }

}
