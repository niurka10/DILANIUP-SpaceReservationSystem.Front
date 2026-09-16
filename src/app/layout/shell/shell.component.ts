import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SlidebarComponent } from "../sidebar/sidebar.component";

@Component({
    selector: 'app-shell',
    standalone: true,
    imports: [RouterOutlet, SlidebarComponent],
    templateUrl: './shell.component.html',
    styleUrl: './shell.component.scss'
})

export class ShellComponent{}