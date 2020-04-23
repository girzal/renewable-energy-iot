import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@/_services/index.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Auth } from "aws-amplify";

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
        Auth.signOut()
        .then(data => {
          console.log(data);
          console.log("You are successfully logged out");
          // this.router.navigate(["/login"]);
        })
        .catch(err => console.log(err));  
        this.authenticationService.logout();
        this.router.navigate(['login']);
    }
  }
  
  ngOnInit() {
    this.isUserLoggedIn = this.authenticationService.isUserLoggedIn();
  }

}
