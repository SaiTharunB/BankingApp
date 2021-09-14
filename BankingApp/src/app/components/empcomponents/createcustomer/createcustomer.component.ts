import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../../services.service';

@Component({
  selector: 'app-createcustomer',
  templateUrl: './createcustomer.component.html',
  styleUrls: ['./createcustomer.component.css']
})
export class CreatecustomerComponent implements OnInit {

  myform:any;
  userid:any;
  username:any;
  password:any;
  dob:any;
  pan:any;
  address:any;
  email:any

 
  constructor(@Inject(ServicesService)private service:ServicesService) { 
    this.myform=new FormGroup({
      userid:new FormControl("",[Validators.required,Validators.minLength(3)]),
      cname:new FormControl("",[Validators.required,Validators.minLength(3)]),
      password:new FormControl("",[Validators.required,Validators.minLength(3)]),
      dob:new FormControl("",[Validators.required,this.ageValidator]),
      pan:new FormControl("",[Validators.required,Validators.minLength(3)]),
      address:new FormControl("",[Validators.required]),
      email:new FormControl("",[Validators.required]),
    });
  }
  ageValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if(control.value){
    const bdate =new Date(control.value);
    const timeDiff = Math.abs(new Date(Date.now()).getTime() - bdate.getTime() );
    var age = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365.25));
   
    if (age> 18) {
      console.log(age)
      return null
    }
    return { 'ageValidator': true };
  }
   
    return null;
  }
async create()
{
  
  
  var obj={
    "userId":this.myform.controls.userid.value,
    "username":this.myform.controls.cname.value,
    "email":this.myform.controls.email.value,
    "password":this.myform.controls.password.value,
    "dateOfBirth":this.myform.controls.dob.value,
    "panNumber":this.myform.controls.pan.value,
    "address":this.myform.controls.address.value
  }
 await this.service.createCustomer(obj).subscribe((data)=>{this.createResp(data)},(err)=>{
   this.createResp(false)
 })


//  this.myform.reset();
//  this.msg=""
 

}
msg:any
createResp(flag:boolean)
{
    if(flag)
    {
      alert("Customer created successfully")
    }
    else{
      alert("Customer creation failed")
    }
    window.location.reload()
}
flag=false;
  ngOnInit(): void {
    this.flag=this.service.checkLogin();
  }

}
