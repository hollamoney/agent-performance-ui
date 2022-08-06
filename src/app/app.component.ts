import { Component } from '@angular/core';
import { User } from './models/user.model';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'agent-performance-ui';

  currentUser : User = new User;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    
    this.authenticationService.currentUser.subscribe(data => {
      console.log("data",data);
      this.currentUser = data;
      console.log("kkkkkkkkkkkkkkkkkkkkkkk",this.currentUser.id)
    })
    
  }
  
  isAdmin() {
    return this.currentUser?.role === "[ROLE_ADMIN]";
  }

  logOut() {
    this.authenticationService.logOut();
    this.router.navigate(['/login']);
  }
}
