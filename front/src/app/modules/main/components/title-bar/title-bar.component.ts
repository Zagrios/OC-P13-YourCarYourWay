import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
    selector: 'app-title-bar',
    templateUrl: './title-bar.component.html'
})
export class TitleBarComponent {

    public faRightFromBracket = faRightFromBracket;
    public readonly userInfo$: Observable<User|null>

    constructor(
        private auth: AuthService,
        private router: Router
    ){
        this.userInfo$ = this.auth.userInfo$;
    }

    public logout(){
        this.auth.logOut();
        this.router.navigate(['/auth']);
    }

}
