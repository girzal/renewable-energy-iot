import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { UserData } from '@/_models/userData';
import { UserdataService } from '@/_services/userdata.service';
import { $ } from 'protractor';

interface UserTransactionDetails {
  user_id: string;
  user_name:string;
  transaction_id: number;
  total_volume: number;
  transaction_date: string;
  type_of_transaction:string;
  volume:number;
  price:number;
}

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  displayedColumns = ['transaction_id','From_user', 'transaction_date','transaction_type','volume','total_volume'];
  dataSource: MatTableDataSource<UserTransactionDetails>;
  isProcessing:boolean;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  displayProgressSpinner = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  
  constructor(public service: UserdataService) {
    this.isProcessing = true;

    // Create 100 users
    const users: UserTransactionDetails[] = [];
    // for (let i = 1; i <= 100; i++) { users.push(createNewUser(i)); }
    let user = localStorage.getItem("currentUser");
    
    this.service.getAllUserTransactionData("divyanayak8853@gmail.com").subscribe
    // this.service.getAllUserTransactionData(user).subscribe
    (
      (response)=> {
      console.log("in the transaction response");
      console.log(response);
      console.log(response['body']);
       // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(response['body']);
      this.isProcessing = false;
      this.displayProgressSpinner = false;
      this.ngSortPaging()
    },
    (error) =>{
      console.log("in the errror")
    }
    )
   
   }

   /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  // ngAfterViewInit() {
  //   console.log(this.dataSource)
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  ngSortPaging() {
    console.log(this.dataSource)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    console.log("fdgdjdgjgfhkjh")
    var classList = document.getElementById("highlighter")
  }

}

/** Builds and returns a new User. */
// function createNewUser(id: number): UserDetails {
//   const name =
//       NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
//       NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

//   return {
//     user_id: user_id,
//     transaction_id: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
//   };

// }

/** Constants used to fill up our data base. */
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

