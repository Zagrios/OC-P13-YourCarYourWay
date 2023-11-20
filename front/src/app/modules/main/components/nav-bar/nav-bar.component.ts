import { Component } from '@angular/core';
import { faStore, faComments } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html'
})
export class NavBarComponent {

    public faStore = faStore;
    public faComments = faComments;

}
