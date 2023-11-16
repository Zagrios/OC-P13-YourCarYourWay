import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent {

    @ViewChild('username') usernameElement: ElementRef;
    @ViewChild('email') emailElement: ElementRef;
    @ViewChild('password') passwordElement: ElementRef;


    public constructor(
        private auth: AuthService,
        private router: Router,
        usernameElement: ElementRef,
        emailElement: ElementRef,
        passwordElement: ElementRef,
    ){
        this.usernameElement = usernameElement;
        this.emailElement = usernameElement;
        this.passwordElement = usernameElement;
    }

    public onClick(){
        const username = this.usernameElement.nativeElement.value;
        const email = this.emailElement.nativeElement.value;
        const password = this.passwordElement.nativeElement.value;

        this.auth.register({username, password, email}).then(logged => {
            if(!logged){ return; }
            this.router.navigate(['/']);
        });
    }

}
