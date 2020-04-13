import { Component, OnInit } from '@angular/core';
import { User } from '@/_models';
import { Subscription } from 'rxjs';
import { AuthenticationService, UserService } from '@/_services/index.service';
import { first } from 'rxjs/operators';
import { UserData } from '@/_models/userData';
import { UserdataService } from '@/_services/userdata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    currentUser: User;
    userData:UserData;
    currentUserSubscription: Subscription;
    users: User[] = [];

    constructor(
        private authenticationService: AuthenticationService,
        private userdataService: UserdataService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        this.loadUserData();

    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        // this.currentUserSubscription.unsubscribe();
    }

    deleteUser(id: number) {
        // this.userService.delete(id).pipe(first()).subscribe(() => {
        //     this.loadAllUsers()
        // });
    }

    private loadUserData() {
        // this.userdataService.getById.pipe(first()).subscribe(users => {
        //     this.userData = userData;
        // });
    }

}
