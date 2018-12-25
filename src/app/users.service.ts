import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from './Interface/IUsers';

@Injectable()
export class UsersService {

  baseUrl: string = 'http://localhost:52781/api/';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.baseUrl + 'GetAllUsers')
      .pipe();
  }

  addUser(user: any) {
    return this.http.post(this.baseUrl + 'AddUser', user);
  }

  getUserById(userid: number): Observable<IUser> {
    return this.http.get<IUser>(this.baseUrl + 'GetUserById?intUserId=' + userid)
      .pipe();
  }

  EditUser(user: any) {
    return this.http.put(this.baseUrl + 'EditUser', user);
  }

  deleteUser(userid: any) {
    return this.http.delete(this.baseUrl + 'DeleteUser?intUserId=' + userid);
  }
}
