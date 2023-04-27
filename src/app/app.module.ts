import { NgModule } from '@angular/core';
import {AngularFireModule} from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { BrowserModule } from '@angular/platform-browser';
import { environments } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environments.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
