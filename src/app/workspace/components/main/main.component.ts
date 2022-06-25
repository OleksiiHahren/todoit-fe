import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../core/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private tokenService: TokenService,
              private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.tokenService.removeJwtToken();
    this.tokenService.removeRefreshToken();
    this.router.navigate(['auth/login'])
  }

}
