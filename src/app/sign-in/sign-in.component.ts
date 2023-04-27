import { Component, Injectable, NgZone, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { WindowService } from '../window.service';
import {
  RecaptchaVerifier,
  getAuth,
  signInWithPhoneNumber,
} from 'firebase/auth';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  mobileNumberString: string = '';
  verifyOtpString: string = '';
  winRef: any;

  constructor(
    public authService: AuthServiceService,
    windowRef: WindowService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.winRef = windowRef;
  }

  sendLoginOtp() {
    const auth = getAuth();
    this.winRef.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
      },
      auth
    );

    const appVerifier = this.winRef.recaptchaVerifier;

    signInWithPhoneNumber(auth, this.mobileNumberString, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the

        // user in with confirmationResult.confirm(code).

        this.winRef.confirmationResult = confirmationResult;
        (document.getElementById('otpField') as HTMLElement).style.display =
          'inline-block';

        (document.getElementById('verifyBtn') as HTMLElement).style.display =
          'inline-block';
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
      });
  }

  verifyOtp() {
    this.winRef.confirmationResult
      .confirm(this.verifyOtpString)
      .then((result: any) => {
        // User signed in successfully.
        const user = result.user;
        this.router.navigate(['dashboard']);
        // ...
      })
      .catch((error: any) => {
        // User could not sign in (bad verification code?)
        // ...
      });
  }
}
