import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepositResponse } from 'src/app/Models/DepositResponse';
import { ServicesService } from '../../services.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
  myform:any
  constructor(@Inject(ServicesService)private service:ServicesService) { 
    this.myform=new FormGroup({
      accid:new FormControl("",[Validators.required]),
      amount:new FormControl("",[Validators.required]),
     
    });
  }
  flag=false
  withdraw()
  {
    var obj={
    "accountNumber":this.myform.controls.accid.value,
 
    "amount":this.myform.controls.amount.value,
    }
    this.service.withdraw(obj).subscribe((data)=>{this.alertu(data)},(err)=>{this.rflag=false})
   // window.location.reload()
  }
  reply:any
  rflag=true
  eflag=false
  alertu(message:DepositResponse)
{
  this.reply=message
  this.rflag=true
 
  console.log(this.reply)
//alert(message.message)
}
  ngOnInit(): void {
    this.flag=this.service.checkLogin()
  }

}
