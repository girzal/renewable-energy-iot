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

  constructor(private http:HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue():User {
    return this.currentUserSubject.value;
   }

   login(username: string, password:string){
     return this.http.post<any>(`https://fur5zri601.execute-api.us-east-1.amazonaws.com/dev/user/authenticate`, { username, password })
     .pipe(map(user => {
       console.log("in the login function user");
       if(user && user.token){
         sessionStorage.setItem('authenticatedUser',JSON.stringify(user));
         localStorage.setItem('currentUser',JSON.stringify(user));
         this.currentUserSubject.next(user);
       }
     }))
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
