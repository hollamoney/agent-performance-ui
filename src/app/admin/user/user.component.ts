import {Component, Output, EventEmitter, Input} from '@angular/core';
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";

declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  errorMessage: string = "";

  @Input() user: User = new User();
  @Output() save = new EventEmitter<any>();
  constructor(private userService: UserService) { }

  saveUser() {
    console.log("buda mı boş" ,this.user)
    this.userService.saveUser(this.user).subscribe({
      next: (data) => this.save.emit(data),
      error: (err) => this.errorMessage = "Unexpected error occured."})
    
    $('#userModal').modal('hide');
  }

  updateUser() {
    console.log("buda mı boş" ,this.user)
    this.userService.updateUser(this.user).subscribe({
      next: (data) => this.save.emit(data),
      error: (err) => this.errorMessage = "Unexpected error occured."})
    
    $('#updateUserModal').modal('hide');
  }

  showUserModal() {
    $('#userModal').modal('show');
  }

  hideUserModal() {
    $('#userModal').modal('hide');
  }

  showUpdateUserModal() {
    $('#updateUserModal').modal('show');
  }

  hideUpdateUserModal() {
    $('#updateUserModal').modal('hide');
  }
}

