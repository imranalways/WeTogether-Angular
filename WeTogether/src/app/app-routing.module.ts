import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { LoginComponent } from './login/login.component';
import { PostsComponent } from './posts/posts.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [ 
  { path: 'Posts', component: PostsComponent }, 
  { path: 'Register', component: RegisterComponent }, 
  { path: '', component: LoginComponent },
  { path: 'Profile',component: ProfileComponent},
  { path: 'Edit-Profile',component: EditProfileComponent}
  ]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[PostsComponent,RegisterComponent,LoginComponent,ProfileComponent,EditProfileComponent]
