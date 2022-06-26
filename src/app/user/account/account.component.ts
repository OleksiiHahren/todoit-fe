import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserInterface } from '../interfaces/user.interface';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user!: UserInterface;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
   const { user } = this.route.snapshot.data;
   debugger
   console.log(user)
  }

}
