import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss']
})
export class RegistryComponent implements OnInit {


  formData = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    repeatPassword: new FormControl(null, [Validators.required])
  },);

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const repeatPass = this.formData.get('repeatPassword');
    repeatPass?.valueChanges
      .subscribe(val =>{
      if (this.formData.get('password')?.value !== val) {
        repeatPass?.setErrors({'incorrect': true});
      }
    }
  )
  }

  googleAuth(): void {
    window.open(environment.backendUrlGoogle, '_self');
  }

  onSignIn(): void {
    this.router.navigate(['/auth/login']);
  }

  signUp(): void {
    debugger
    const {email, password, firstName, lastName} = this.formData.value;
    this.authService.signUp({email, password, firstName, lastName}).subscribe( // TODO proceed tomorrow with user creation
      res => console.log(res)
    )
  }


}
