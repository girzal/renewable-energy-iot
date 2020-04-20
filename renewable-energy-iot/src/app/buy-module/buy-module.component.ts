import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,MatTableDataSource} from '@angular/material';
import { MatInputModule } from '@angular/material';

interface DialogData {
  user_id: string;
  quantity: number;
}

@Component({
  selector: 'app-buy-module',
  templateUrl: './buy-module.component.html',
  styleUrls: ['./buy-module.component.css']
})
export class BuyModuleComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<BuyModuleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick():void{
    this.dialogRef.close();
  }

  close(){
    this.dialogRef.close();
  }

  save():void{

  }

  ngOnInit(): void{
  }

}
