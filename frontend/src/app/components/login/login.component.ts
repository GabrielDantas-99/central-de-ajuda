import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  spans: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.bgCreate();
  }

  bgCreate(): void {
    for (let i = 0; i < 220; i++) {
      this.spans.push('span');
    }
  }

}
