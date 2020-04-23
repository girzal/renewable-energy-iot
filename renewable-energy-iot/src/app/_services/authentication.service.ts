import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public user:User;

  constructor(private http:HttpClient) {
    console.log("valueeeeeeees"+JSON.parse(localStorage.getItem('currentUser')))
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.user = new User();
  }

  public get currentUserValue():User {
    return this.currentUserSubject.value;
  }

  login(email_id: string, clientId: string){
    console.log("email_id,clientId"+email_id,clientId)
    this.user.user_id = email_id;
    this.user.token = clientId;

    sessionStorage.setItem('authenticatedUser',this.user.user_id);
    localStorage.setItem('currentUser',this.user.user_id);
    this.currentUserSubject.next(this.user);

     
    // return this.http.post<any>(`https://fur5zri601.execute-api.us-east-1.amazonaws.com/dev/user/authenticate`, { user_id, password })
    // .pipe(map(user => {
    //  //  if(user && user.token){
    //    if(user.statusCode == 200){
    //     sessionStorage.setItem('authenticatedUser',JSON.parse(user.body).Item.user_id.S);
    //     localStorage.setItem('currentUser',JSON.parse(user.body).Item.user_id.S);
    //     this.currentUserSubject.next(user);
    //   }
    // }))
  }

  isUserLoggedIn(){
    let user = sessionStorage.getItem('authenticatedUser');
    return !(user ===null)
  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('authenticatedUser');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}
