import { Component, OnInit } from '@angular/core';
import { User } from '@/_models';
import { Subscription } from 'rxjs';
import { AuthenticationService, UserService } from '@/_services/index.service';
import { first } from 'rxjs/operators';
import { UserData } from '@/_models/userData';
import { UserdataService } from '@/_services/userdata.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

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
    is_sell_tag:boolean;
    sellProfileForm: FormGroup;
    $modalResult: UserData;
    message:string;
    isProcessing :boolean;

    constructor(
        private authenticationService: AuthenticationService,
        private userDataService: UserdataService,
        private modalService: NgbModal,
        private fb: FormBuilder
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
        this.is_sell_tag = false;
        this.userData = new UserData();
        if(localStorage.getItem("is_sell_tag") != undefined){
            console.log("localStorage.getItem(is_sell_tag)  "+localStorage.getItem("is_sell_tag"))
            if(localStorage.getItem("is_sell_tag") == "true"){
                this.is_sell_tag = true;
            }
            else{
                this.is_sell_tag = false;
            }
        }
    }

    ngOnInit() {

        this.loadUserData();
        this.sellProfileForm = this.fb.group({
            is_sell: [''],
            user_id: ['']
           });

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
        this.isProcessing = true;
        console.log(sessionStorage.getItem("authenticatedUser"))
        this.userDataService.getAllUserTransactionSum(sessionStorage.getItem("authenticatedUser")).subscribe(
                (response)=>{
                    console.log(response);
                    this.userData.totalsum_produced = response['user_details']['PR_transaction_volume'];
                    this.userData.totalsum_purchased = response['user_details']['CR_transaction_volume'];
                    this.userData.totalsum_sold = response['user_details']['DR_transaction_volume'];
                },
                (error)=>{
                    console.log("errorrrlrlr")
                }
            );


        console.log(sessionStorage.getItem("authenticatedUser"))
        this.userDataService.getTotalVolume(sessionStorage.getItem("authenticatedUser")).subscribe(
            (response)=>{
                console.log("In ther total volume service");
                console.log(response['UserData']);
                this.userData.total_volume = response['UserData']['total_volume'];
            },
            (error)=>{
                console.log("errorrrlrlr")
            }
        );

        this.isProcessing = false;
        }

    openHomeModal(targetModal) {
        this.modalService.open(targetModal, {
         centered: true,
         backdrop: 'static'
        });
       
        this.sellProfileForm.patchValue({
         is_sell: true
        });
    }

    onSellEnableFlag(){
        console.log("inside the onsellenableflag method")
        this.isProcessing = true;
        this.$modalResult = this.sellProfileForm.getRawValue();
        this.isProcessing = true;
        console.log("this.target_user_id   "+localStorage.getItem("currentUser"));//todo
        console.log("this.$modalResult.is_sell   "+this.$modalResult.is_sell);//todo
        this.userDataService.setFlagSell(localStorage.getItem("currentUser"),true).subscribe(
            (response)=>{
                this.is_sell_tag = true;
                localStorage.setItem("is_sell_tag","true");
                this.isProcessing = false;
                this.modalService.dismissAll();
            },
          (error) => {
            console.log("errorrrlrlr")
          }
        )
    }

    onSellDisableFlag(){
        console.log("inside the onSellDisableFlag method")
        this.isProcessing = true;
        this.$modalResult = this.sellProfileForm.getRawValue();
        this.isProcessing = true;
        console.log("this.target_user_id   "+localStorage.getItem("currentUser"));//todo
        console.log("this.$modalResult.is_sell   "+this.$modalResult.is_sell);//todo
        this.userDataService.setFlagSell(localStorage.getItem("currentUser"),false).subscribe(
            (response)=>{
                this.is_sell_tag = false;
                localStorage.setItem("is_sell_tag","false");
                this.isProcessing = false;
                this.modalService.dismissAll();
            },
          (error) => {
            console.log("errorrrlrlr")
          }
        )
    }


}
