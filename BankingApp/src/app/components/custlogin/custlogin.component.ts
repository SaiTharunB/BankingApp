import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/Models/LoginResponse';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-custlogin',
  templateUrl: './custlogin.component.html',
  styleUrls: ['./custlogin.component.css']
})
export class CustloginComponent implements OnInit {

  constructor(@Inject(HttpClient)private http:HttpClient,@Inject(ServicesService)private  service:ServicesService,private router:Router) {
    this.myform=new FormGroup({
      userid:new FormControl("",[Validators.required,Validators.minLength(3)]),
      password:new FormControl("",[Validators.required,Validators.minLength(3)]),
      role:new FormControl("",[Validators.required]),
    });
   }
  myform:any;
  user:any;
disp="none"
  msg:any;
  async login()
  {
   // console.log("click")
    var obj={
      "userId":this.myform.controls.userid.value,
      "password":this.myform.controls.password.value,
      "role":this.myform.controls.role.value
    }
     await this.service.loginUser(obj).subscribe((data)=>{this.loginResp(data)},(error) => {
      this.disp="block";
      console.error('error caught in component')
      console.warn(error);
    });
       
  }
loginResp(data:LoginResponse)
{
  console.log(data)
  if(data!==undefined)
  {
    this.msg="Login Succesful";
    sessionStorage.setItem("userInfo",JSON.stringify(data));
    this.service.checkLogin();
   if(this.myform.controls.role.value="admin")
   //window.location.reload()
   window.location.href="http://localhost:4200"
  
  }
  else{
  // console.log(this.user)
   this.msg="sorry! try again"
  }
}
  flag=true;
  ngOnInit(): void {
    this.flag=this.service.checkLogin();
  }

}
