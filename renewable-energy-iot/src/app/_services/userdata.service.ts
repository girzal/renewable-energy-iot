import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { UserData } from '@/_models/userData';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  private userBody:UserData;
  
  constructor(private http:HttpClient) { }

  getById(user_id: string) {//todo
    this.userBody = {
      'user_id': 'abc@gmail.com',
      'currentVolume': 200,
      'totalPurchased':5000,
      'totalProduced':500,
      'totalSell':300,
      'date':null,
      'is_sell': true
    };

    return this.userBody;
  }
}
