import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PostsComponent } from './posts/posts.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [ 
  { path: 'Posts', component: PostsComponent }, 
  { path: 'Register', component: RegisterComponent }, 
  { path: 'Login', component: LoginComponent }]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[PostsComponent,RegisterComponent,LoginComponent]
