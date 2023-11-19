import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { map, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    host: {
        class: "w-full h-full flex justify-center items-center"
    }
})
export class LoginComponent {

    public constructor(
        private auth: AuthService,
        private router: Router,
    ){}

    public submit(username: string, password: string){
        this.auth.login({username, password}).then(logged => {
            if(!logged){ return; }
            this.router.navigate(['/']);
        });
    }

}
