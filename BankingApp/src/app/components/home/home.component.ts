import { DepFlags } from '@angular/compiler/src/core';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  flag:boolean=false;
  constructor(private router: Router,@Inject(ServicesService) private service:ServicesService) { }
role:any;

  ngOnInit(): void {
    this.flag=this.service.checkLogin();
    this.role=this.service.checkRole();
  }

}
