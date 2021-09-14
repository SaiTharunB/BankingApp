import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../../services.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  constructor(@Inject(ServicesService)private service:ServicesService) { 
    this.myform=new FormGroup({
      srcaccid:new FormControl("",[Validators.required]),
      taraccid:new FormControl("",[Validators.required]),
      amount:new FormControl("",[Validators.required]),
     
    });
  }
  async transfer(){
    var obj={
      "sourceAccount":this.myform.controls.srcaccid.value,
      "targetAccount":this.myform.controls.taraccid.value,
      "amount":this.myform.controls.amount.value,
      "reference":"Transfer"
    }
   await this.service.transfer(obj).subscribe((data)=>{this.transferResp(data)},(err)=>{this.transferResp(false)})
  }
  transferResp(flag:boolean)
  {
if(flag)
{
  alert("Transfer Succesful")
}
else
{
  alert("Transfer Failed")
}
window.location.reload()
  }
myform:any
  flag=false
  ngOnInit(): void {
    this.flag=this.service.checkLogin()
  }

}
