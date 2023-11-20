import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    host: {
        class: "w-full h-full flex justify-center items-center"
    }
})
export class RegisterComponent {

    public constructor(
        private auth: AuthService,
        private router: Router,
    ){}

    public submit(username: string, email: string, password: string){
        this.auth.register({username, password, email}).then(logged => {
            if(!logged){ return; }
            this.router.navigate(['/']);
        });
    }

}
