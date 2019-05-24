import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {AuthService} from "../services/auth.service";
import {LogoutComponent} from "../logout/logout.component";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent extends LogoutComponent {
  toggled: boolean;

  ngOnInit() {

  }

  toggleMenu() {
    this.toggled = !this.toggled;
  }

}
