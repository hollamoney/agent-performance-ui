import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { RequestBaseService } from './request-base.service';
import { User } from '../models/user.model';
const API_URL = `${environment.BASE_URL}/users`;

@Injectable({
  providedIn: 'root'
})
export class UserService extends RequestBaseService {

  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http)
   }

saveUser(user: User): Observable<any> {
  console.log(this.currentUser)
  return this.http.post(API_URL, user, {headers: this.getHeaders} );
}

deleteUser(user: User): Observable<any> {
  return this.http.delete(`${API_URL}/${user.id}`,{headers: this.getHeaders} );
}

makeAdmin(user: User): Observable<any> {
  return this.http.post(`${API_URL}/${user.id}`,{headers: this.getHeaders} );
}

getAllUsers(): Observable<any> {
  console.log(this.getHeaders);
  return this.http.get(API_URL,  {headers: this.getHeaders});
  
}

updateUser(user: User): Observable<any> {
  return this.http.put(`${API_URL}/${user.id}`,user,{headers: this.getHeaders} );
}

}
