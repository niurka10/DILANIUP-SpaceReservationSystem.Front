import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "../navbar/navbar.component";
import { SlidebarComponent } from "../sidebar/sidebar.component";

@Component({
    selector: 'app-shell',
    standalone: true,
    imports: [RouterOutlet, NavbarComponent, SlidebarComponent],
    templateUrl: './shell.component.html',
    styleUrl: './shell.component.scss'
})

export class ShellComponent{}