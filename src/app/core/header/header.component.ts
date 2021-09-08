import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {DataStorageService} from "../../shared/data-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private dataStorageService: DataStorageService,
              public authService: AuthService) {
  }

  onLogout() {
    this.authService.logout();
  }
}
