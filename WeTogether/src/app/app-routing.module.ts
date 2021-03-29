import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { LoginComponent } from './login/login.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostsComponent } from './posts/posts.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [ 
  { path: 'Posts', component: PostsComponent }, 
  { path: 'Register', component: RegisterComponent }, 
  { path: '', component: LoginComponent },
  { path: 'profile/:id',component: ProfileComponent},
  { path: 'Profile/:id',component: ProfileComponent},
  { path: 'Edit-Profile',component: EditProfileComponent},
  { path: 'Profile-Details/:id',component: ProfileDetailsComponent},
  { path: 'Post-Details/:id',component: PostDetailsComponent}


  ]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[PostsComponent,RegisterComponent,LoginComponent,
                                ProfileComponent,EditProfileComponent,ProfileDetailsComponent,
                                PostDetailsComponent]
