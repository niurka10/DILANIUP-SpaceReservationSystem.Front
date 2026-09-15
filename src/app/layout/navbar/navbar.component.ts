import { Component } from "@angular/core";
import { AuthService } from "../../core/auth/auth.service";

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})

export class NavbarComponent{

    constructor(public authService: AuthService){}
}