import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@/_services/index.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isUserLoggedIn :boolean = false
  returnUrl: string;

  constructor(
    public authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  handleLogout(){
    if (this.authenticationService.currentUserValue) {  
        this.authenticationService.logout();
        this.router.navigate(['login']);
    }
  }



  ngOnInit() {
    this.isUserLoggedIn = this.authenticationService.isUserLoggedIn();
  }

}
