import { JsonPipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { CustomerDetails } from 'src/app/Models/CustomerDetails';

import { ServicesService } from '../../services.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  constructor(@Inject(ServicesService)private service:ServicesService) { }
flag=false
accountInfo:any
accountDetails:any
  customerDetails:any;
aflag=false
errorMessage:any;

  getAccounts()
  {
    if(this.flag)
    {
      this.accountInfo=sessionStorage.getItem("userInfo")
      this.accountInfo=JSON.parse(this.accountInfo)
     
      this.service.getCustomerDetails(this.accountInfo.userId).subscribe((data)=>{this.resp(data)},(error) => {                              //Error callback
        console.error('error caught in component')
        this.errorMessage = error;

      })
    }
  }
resp(data:CustomerDetails)
{

  if(data.accounts.length!==0)
  {
    this.accountDetails=data.accounts
    this.aflag=true
  }
}
  ngOnInit(): void {
      this.flag=this.service.checkLogin()
      this.getAccounts()
      
  }

}
