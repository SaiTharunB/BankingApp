import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../../services.service';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent implements OnInit {

  accid:any
  currBalance:any
  oName:any
  cid:any
  acType:any
  myform:any
  constructor(@Inject(ServicesService)private service:ServicesService) {
    this.myform=new FormGroup({

      currBalance:new FormControl("",[Validators.required,Validators.min(2000)]),
      oName:new FormControl("",[Validators.required]),
      cid:new FormControl("",[Validators.required]),
      acType:new FormControl("",[Validators.required]),
    });
   }
   flag=true
async createAccount(){
  var obj={
   
    "customerId":this.myform.controls.cid.value,
    "balance":this.myform.controls.currBalance.value,
    "accountType":this.myform.controls.acType.value,
    "username":this.myform.controls.oName.value
  }
  await this.service.createAccount(obj).subscribe((data)=>{this.createResp(data)},(err)=>{this.createResp(false)})
 
}
createResp(flag:boolean)
{
  if(flag)
  {
    alert("Account Created Succesfully")
  }
else
{
  alert("Account Creation failed")
}
  window.location.reload()
}

  ngOnInit(): void {
    this.flag=this.service.checkLogin();

  }

}
