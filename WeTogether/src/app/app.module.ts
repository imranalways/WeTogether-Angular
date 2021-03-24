import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegisterService } from './shared/user-register.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgxPrintModule} from 'ngx-print';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPrintModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [UserRegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
