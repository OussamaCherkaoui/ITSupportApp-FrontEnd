import { Component } from '@angular/core';
import {MatAnchor} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";

@Component({
  selector: 'app-user',
  standalone: true,
    imports: [
        MatAnchor,
        MatToolbar
    ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  navigateTo(equipement: string) {
    
  }
}
