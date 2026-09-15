import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from "../../core/auth/auth.service";
import { email } from "@angular/forms/signals";

@Component({
    selector: 'app-slidebar',
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})

export class SlidebarComponent {

    constructor(public authService : AuthService){}

    initials(email: string | undefined) : string {
        if (!email) return '?';
        
        return email.slice(0, 2).toUpperCase();
    }
}