import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<User[]>(`/users`);
  }

  getById(user_id: string) {
    return this.http.get(`/users/${user_id}`);
  }

  register(user: User) {
      console.log("in register method...........")
      console.log(user)
      return this.http.post(`https://fur5zri601.execute-api.us-east-1.amazonaws.com/dev/user/register`, user);
  }

  update(user: User) {
      return this.http.put(`/users/${user.user_id}`, user);
  }

  delete(user_id: number) {
      return this.http.delete(`/users/${user_id}`);
  }
}
