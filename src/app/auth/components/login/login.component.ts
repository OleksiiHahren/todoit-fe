import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from '../../../core/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formData = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService) {}

  googleAuth(): void {
    window.open(environment.backendUrlGoogle, '_self');
  }

  signIn(): void {
    const {email, password} = this.formData.value;
    this.authService.login({email, password}).subscribe(
      res => {
        debugger
        this.tokenService.setJwtToken(res.accessToken);
        this.tokenService.setRefreshToken(res.refreshToken);
        this.router.navigate(['/workspace']);}
    );
  }

  onSignUp(): void {
    this.router.navigate(['/auth/registry']);
  }
}
