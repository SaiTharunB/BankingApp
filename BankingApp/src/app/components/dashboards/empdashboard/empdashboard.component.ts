import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empdashboard',
  templateUrl: './empdashboard.component.html',
  styleUrls: ['./empdashboard.component.css']
})
export class EmpdashboardComponent implements OnInit {

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
