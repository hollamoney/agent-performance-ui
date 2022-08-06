import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { RequestBaseService } from './request-base.service';
import { Performance } from '../models/performance.model';
import { User } from '../models/user.model';

const API_URL = `${environment.BASE_URL}/performance`;
const FILTER_API_URL = API_URL + "/date";

@Injectable({
  providedIn: 'root'
})
export class PerformanceService extends RequestBaseService {

  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http)
   }

savePerformance(performance: Performance): Observable<any> {
  console.log("SAVEDE YAZDIRABILIYO MU ONA BAKIYORUM", this.currentUser)
  return this.http.post(API_URL, performance, {headers: this.getHeaders} );
}

deletePerformance(performance: Performance): Observable<any> {
  return this.http.delete(`${API_URL}/${performance.id}`,{headers: this.getHeaders}  );
}

updatePerformance(performance: Performance): Observable<any> {
  return this.http.put(`${API_URL}/${performance.id}`,performance,{headers: this.getHeaders}  );
}
getAllPerformances(): Observable<any> {
  return this.http.get(API_URL,{headers: this.getHeaders} );
}

getUserPerformances(): Observable<any> {
  return this.http.get(`${API_URL}/${this.currentUser.id}`,{headers: this.getHeaders})
}
getUserPerformanceWithFilter(parameter: String): Observable<any>{

  
  return this.http.get(FILTER_API_URL + "?" + parameter, { headers: this.getHeaders })
}
}
