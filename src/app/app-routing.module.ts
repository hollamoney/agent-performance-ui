import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin/admin.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { UnauthorizedComponent } from './error/unauthorized/unauthorized.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from '../app/user/home/home/home.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/home/profile/profile.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [

  {path: '', redirectTo: 'profile', pathMatch: 'full'},
  {path: 'profile', component : HomeComponent,
  canActivate: [AuthGuard],
  data: {roles: ["[ROLE_USER]","[ROLE_ADMIN]"]}},
  {path: 'login', component : LoginComponent},
  {path: 'register', component : RegisterComponent},
  {path: 'home', component : ProfileComponent,
  canActivate: [AuthGuard],
  data: {roles: ["[ROLE_USER]","[ROLE_ADMIN]"]}},
  {path: 'admin', component : AdminComponent,
  canActivate: [AuthGuard],
  data: {roles: ["[ROLE_ADMIN]"]}},
  {path: '404', component : NotFoundComponent},
  {path: '401', component : UnauthorizedComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router) {
    this.router.errorHandler = (error: any) => {
      this.router.navigate(['/404']);
    };
  }
}
