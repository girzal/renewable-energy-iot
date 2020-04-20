import { Component, OnInit, PipeTransform, ViewChildren, Input, Output, Directive,EventEmitter, QueryList } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { SortEvent, NgbdSortableHeader } from '@/sortable.directive';
import { UserdataService } from '@/_services/userdata.service';
import { Router } from '@angular/router';
import { UserData } from '@/_models/userData';
import { BuyService } from '@/_services/buy.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css'],
  providers: [BuyService, DecimalPipe]
})
export class SellComponent implements OnInit {

  userDataList$: Observable<UserData[]>;
  total$: Observable<number>;
  userId:string;
  target_user_id:string;
  isProcessing :boolean;
  loading:Observable<boolean>;
  userData:UserData;
  quantity:Number;
  showModal : boolean;
  user_id    : string;
  title = 'appBootstrap';
  editProfileForm: FormGroup;
  $modalResult: UserData;
  message:string;
  
  closeResult: string;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    public service: BuyService,
    public userDataService: UserdataService,
    private router: Router,
    public dialog: MatDialog,
    private modalService: NgbModal,
    private fb: FormBuilder) {

    this.userDataList$ = service.userDataList$;
    this.loading = service.loading$;
    this.total$ = service.total$;
    this.isProcessing = true;
  }

  openModal(targetModal, userData) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
   
    this.editProfileForm.patchValue({
     quantity: userData.quantity,
     total_volume: userData.total_volume,
     user_id: userData.user_id
    });
   }

   onSubmit() {
    
    this.$modalResult = this.editProfileForm.getRawValue()
    if(100*this.$modalResult.quantity > this.$modalResult.total_volume){
        this.message="Quantity should be less than "+this.$modalResult.total_volume%100
    }else{
        this.modalService.dismissAll();
        this.isProcessing = true;
        sessionStorage.getItem("");
        this.target_user_id = localStorage.getItem("currentUser");
        console.log("this.target_user_id   "+this.target_user_id );//todo
        this.userDataService.updateUserData(this.$modalResult.user_id,"atakkar@deloitte.com",100*this.$modalResult.quantity).subscribe(
          (response)=>{
            this.reloadData();
            this.isProcessing = false;
          },
        (error) => {
          console.log("errorrrlrlr")
        }
        )
        
        // this.router.navigate(["buy"]);
    }

 
   }

  
  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
  }



  // public openDialog(): void {
  //   this.dialog.open(BuyModuleComponent, {
  //       width: '900px',
  //       height: '600px',
  //       id: "modal-component",
  //   });
  // }

  onSort({column, direction}: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  /**
     * Called when the edit icon is clicked for the student. Places the student in edit mode.
     *
     * @param studentId the studentId
     */
    onBuyClick(user_id: string,vop:number): void {
      // this.isAdding = false; // exit add mode (if necessary)

      // Set the id of the student that is being edited
      // this.countryId = countryId;
      this.isProcessing = true;
      console.log("this.onBuyClick is called with countryId "+ user_id+" total_volume is "+vop);
      sessionStorage.getItem("");
      this.target_user_id = localStorage.getItem("currentUser");
      console.log("this.target_user_id   "+this.target_user_id );
      this.userDataService.updateUserData(user_id,"atakkar@deloitte.com",20).subscribe(
        (response)=>{
          this.reloadData();
          this.isProcessing = false;
        },
      (error) => {
        console.log("errorrrlrlr")
      }
      )
      
  }

  public selectUsers(event: any, user: any) {
    user.flag = !user.flag;
   }

  ngOnInit() {
    console.log("inside the ngintit");
    this.reloadData();
    this.editProfileForm = this.fb.group({
      quantity: [''],
      total_volume: [''],
      user_id: ['']
     });
  }

  reloadData(){
    console.log("inside the reload data");//todo- fetching the logged in user email to pass in the getAllUserData
    this.userDataService.getAllUserData("atakkar@deloitte.com").subscribe
    (
      (response) => {
        console.log("inside the respone")
        console.log(response['UserData'])
        this.service.userDataList = response['UserData'];
        console.log(this.service.userDataList)
        this.service._userDataList$.next(response['UserData']);
        this.service._loading$.next(false)
        this.service.initSearch();
        this.isProcessing = false;
      },
      (error) => {
        console.log("errorrrlrlr")
      }
    )
  }

}
