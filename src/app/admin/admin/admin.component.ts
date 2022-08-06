import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import {UserComponent} from "../user/user.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  userList: Array<User> = [];
  selectedUser: User = new User();
  errorMessage: string = "";

  @ViewChild(UserComponent) child: UserComponent | undefined;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.userList = data;
    });
  }

  createUserRequest() {
    this.selectedUser = new User();
    this.userList = this.userList;
    this.child?.showUserModal();
  }

  editUserRequest(item: User) {
    this.selectedUser = Object.assign({}, item);
    console.log("seçilmiş kişi ",this.selectedUser);
    this.child?.showUpdateUserModal();
  }

  saveUserWatcher(user: User) {
    this.userService.getAllUsers().subscribe(data => {
      this.userList = data;
    });
    
    let itemIndex = this.userList.findIndex(item => item.id === this.selectedUser.id);
    if (itemIndex !== -1) {
      console.log(itemIndex);
      this.userList[itemIndex] = this.selectedUser;
    } else {

    
      this.userList.push(this.selectedUser);
    }
  }

  deleteUser(item: User, ind: number) {
    this.userService.deleteUser(item).subscribe(data => {
      this.userList.splice(ind, 1);
    }, err => {
      this.errorMessage = 'Unexpected error occurred.';
      console.log(err);
    })
  }

  

}

