import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custdashboard',
  templateUrl: './custdashboard.component.html',
  styleUrls: ['./custdashboard.component.css']
})
export class CustdashboardComponent implements OnInit {

  constructor() { }
  logout()
  {
    sessionStorage.removeItem("userInfo");
    window.location.reload();
    window.location.href="http://localhost:4200"
  }
  ngOnInit(): void {
  }

}
