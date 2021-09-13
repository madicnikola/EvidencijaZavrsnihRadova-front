import {Component} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {DataService} from "../../shared/data.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private dataStorageService: DataService,
              public authService: AuthService) {
  }

  onLogout() {
    this.authService.logout();
  }
}
