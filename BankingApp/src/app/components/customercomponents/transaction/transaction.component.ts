import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ServicesService } from '../../services.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  constructor(@Inject(ActivatedRoute) private r:ActivatedRoute,@Inject(ServicesService)private service:ServicesService) { }
b:any
transactionDetails:any
accountDetails:any
tflag=false
getTransaction(accid:any)
{
  console.log(accid)
  this.service.getTransaction(accid).subscribe((data)=>this.resp(data),(err)=>{
            alert("Error Eccoured")
  })
  
  

}
resp(data:any)
{
   console.log(data)
   if(data.length!==0)
  {
    this.transactionDetails=data
    this.tflag=true
  }
}
flag=false
  ngOnInit(): void {
  this.flag=this.service.checkLogin()
    this.r.params.subscribe(params=>{
       this.b=params["id"];
      this.getTransaction(this.b)
    })
  }

}
