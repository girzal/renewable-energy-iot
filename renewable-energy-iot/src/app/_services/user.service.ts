import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models';

export interface UserRegister{
  email:string,
  DeviceID:string,
  Name:string,
  Location:string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userRegister: UserRegister = {
      email : "",
      DeviceID : "",
      Name : "",
      Location : ""
  };

  constructor(private http: HttpClient) { }

  getAll(){//todo
    return this.http.get<User[]>(`/users`);
  }

  getById(user_id: string) {//todo
    return this.http.get(`/users/${user_id}`);
  }

  register(user: UserRegister) {
      return this.http.post(`https://n328t8nned.execute-api.us-east-1.amazonaws.com/Develop/register`, user);
  }

  update(user: User) {//todo
      return this.http.put(`/users/${user.user_id}`, user);
  }

  delete(user_id: number) {//todo
      return this.http.delete(`/users/${user_id}`);
  }
}
