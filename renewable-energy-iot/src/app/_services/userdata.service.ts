import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { UserData } from '@/_models/userData';
import { User } from '@/_models';
import { UserTransaction } from '@/_models/userTransaction';

export interface UserTradingData{
  c_user_id:string;
  p_user_id:string;
  volume:number;
}
export interface UserPrimary{
  user_id:string;
  is_sell:boolean;
}

export interface UserTransactionDetails {
  user_id: string;
  From_user:string;
  transaction_date:string;
  device_id: string;
  volume: number;
  transaction_id: number;
  total_volume:number;
  transaction_type:string;
  Name:string;
}

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  private userBody:UserData;
  private userDataList$ = new Observable<UserData[]>();

  private userTradingData: UserTradingData = {
    c_user_id: "",
    p_user_id: "",
    volume: 0
  };

  private userPrimary: UserPrimary = {
    user_id: "",
    is_sell: false
  };

  
  constructor(private http:HttpClient) { }


  // register(user: UserData) {
  //   return this.http.post(`https://fur5zri601.execute-api.us-east-1.amazonaws.com/dev/user/register`, user);
  // }

  setFlagSell(user_id: string, is_sell:boolean) {
    this.userPrimary.user_id = user_id;
    this.userPrimary.is_sell = is_sell;
    return this.http.post(`https://n328t8nned.execute-api.us-east-1.amazonaws.com/Develop/changesellflag`, this.userPrimary);
  }

  getTotalVolume(user_id:string){
    this.userPrimary.user_id = user_id;
    return this.http.post<UserTransactionDetails[]>(`https://n328t8nned.execute-api.us-east-1.amazonaws.com/Develop/totalvolume`,this.userPrimary);
  }

  getAllUserData(user_id:string){
    this.userPrimary.user_id = user_id;
    return this.http.post<UserTransactionDetails[]>(`https://n328t8nned.execute-api.us-east-1.amazonaws.com/Develop/getallselldata`,this.userPrimary);
  }

  getAllUserTransactionSum(user_id:string){
    this.userPrimary.user_id = user_id;
    return this.http.post<UserTransactionDetails[]>(`https://n328t8nned.execute-api.us-east-1.amazonaws.com/Develop/all-transaction`,this.userPrimary);
  }

  getUtilizationData(user_id:string){
    this.userPrimary.user_id = user_id;
    return this.http.post<UserTransactionDetails[]>(`https://n328t8nned.execute-api.us-east-1.amazonaws.com/Develop/all-transaction`,this.userPrimary);
  }

  getAllUserTransactionData(user_id:string){
    this.userPrimary.user_id = user_id;
    return this.http.post<UserTransactionDetails[]>(`https://xb7jmbvs4l.execute-api.us-east-1.amazonaws.com/dev/p2p_retrieve_all_trading_data`,this.userPrimary);
  }

  getHomePageData(user_id:string){
    this.userPrimary.user_id = user_id;
    return this.http.post<UserData[]>(`https://xb7jmbvs4l.execute-api.us-east-1.amazonaws.com/dev/p2p_retrieve_all_trading_data`,this.userPrimary);
  }

  deleteUser(user_id:string): Observable<any>{
    console.log("deleting this user_id "+user_id);
    return this.http.delete(`http://localhost:3000/UserData/1`);
  }

  updateUserData(source_user_id:string, target_user_id:string, vop:number){
    console.log("source_user_id:string, target_user_id:string, vop:number")
    console.log(source_user_id, target_user_id, vop)
    this.userTradingData.c_user_id = target_user_id;
    this.userTradingData.p_user_id = source_user_id;
    this.userTradingData.volume = vop;
    console.log(this.userTradingData)
    return this.http.post<UserTradingData[]>(`https://cnqz3585f0.execute-api.us-east-1.amazonaws.com/dev/inserttradingdata`,this.userTradingData);
  }
 
}
