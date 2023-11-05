import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { map, Subject } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

    public test$ = new Subject<string|undefined>()

    public constructor(
        private auth: AuthService
    ){}

    ngOnInit(): void {
        this.auth.test().subscribe(data => this.test$.next(data?.at(0)));
    }

}
