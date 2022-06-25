import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
  }

  googleAuth(): void{
    window.open(environment.backendUrlGoogle, '_self')
  }

  signIn(): void {
    this.authService.googleAuth()
  }

  signUp(): void {

  }
}
