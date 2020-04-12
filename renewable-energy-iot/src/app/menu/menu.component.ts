import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@/_services/index.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isUserLoggedIn :boolean = false
  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.isUserLoggedIn = this.authenticationService.isUserLoggedIn();
  }

}
