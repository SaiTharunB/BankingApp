import { ThrowStmt } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../../services.service';
import { map } from 'rxjs/operators'
import { DepositResponse } from 'src/app/Models/DepositResponse';
import { ComplexOuterSubscriber } from 'rxjs/internal/innerSubscribe';
@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  myform:any
  constructor(@Inject(ServicesService)private service:ServicesService) { 
    this.myform=new FormGroup({
      accid:new FormControl("",[Validators.required]),
      amount:new FormControl("",[Validators.required]),
     
    });
  }
  flag=false
  reply:any
rflag=false
eflag=false
async deposit()
{
  var obj={
  "accountNumber":this.myform.controls.accid.value,
 
  "amount":this.myform.controls.amount.value,
  }
 
  await this.service.deposit(obj).subscribe(data=>{this.alertu(data)},(err)=>{this.eflag=true;this.rflag=false})
 // console.log(this.reply)
  //window.location.reload()
}
alertu(message:DepositResponse)
{
  this.reply=message
  this.rflag=true
  this.eflag=false
  console.log(this.reply)
//alert(message.message)
}
  ngOnInit(): void {
    this.flag=this.service.checkLogin()
  }

}
