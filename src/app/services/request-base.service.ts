import { Injectable } from '@angular/core';
import {User} from "../models/user.model";
import {AuthenticationService} from "./authentication.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export abstract class RequestBaseService {

  protected currentUser: User = new User;

  protected constructor(protected authenticationService: AuthenticationService, protected http: HttpClient) {
    this.authenticationService.currentUser.subscribe(data => {
      console.log("data",data);
      this.currentUser = data;
    })
  }

  get getHeaders(): HttpHeaders {

    

    console.log("bitmedi",this.currentUser.accessToken)
    return new HttpHeaders(
      {
        authorization: 'Bearer ' + this.currentUser?.accessToken,
        "Content-Type": "application/json; charset=UTF-8"
      }
    );
  }
}
