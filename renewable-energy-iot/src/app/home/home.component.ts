import { Component, OnInit } from '@angular/core';
import { User } from '@/_models';
import { Subscription } from 'rxjs';
import { AuthenticationService, UserService } from '@/_services/index.service';
import { first } from 'rxjs/operators';
import { UserData } from '@/_models/userData';
import { UserdataService } from '@/_services/userdata.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';

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
    is_sell:boolean;
    editProfileForm: FormGroup;
    $modalResult: UserData;
    message:string;

    constructor(
        private authenticationService: AuthenticationService,
        private userdataService: UserdataService,
        private modalService: NgbModal,
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
        this.is_sell = true;
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

    openHomeModal(targetModal,is_sell) {
        this.modalService.open(targetModal, {
         centered: true,
         backdrop: 'static'
        });
       
        this.editProfileForm.patchValue({
         is_sell: is_sell,
        });
    }

}
