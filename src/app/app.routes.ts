import { Routes } from '@angular/router';
import {LogInComponent} from "./log-in/log-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {HomeComponent} from "./home/home.component";
import {AdminComponent} from "./admin/admin.component";
import {TechnicienComponent} from "./technicien/technicien.component";

export const routes: Routes = [
  { path: '', component: LogInComponent},
  { path: 'signUp', component: SignUpComponent},
  { path: 'home', component: HomeComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'technicien', component: TechnicienComponent}
];
