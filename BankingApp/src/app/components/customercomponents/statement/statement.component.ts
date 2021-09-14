import { Component, Inject, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.css']
})
export class StatementComponent implements OnInit {

  constructor(@Inject(ServicesService)private service:ServicesService) { }
  flag=false
accountInfo:any
accountDetails:any
aflag=false
statements:any=[]
frmDate:any
toDate:any
  
  statement:any
  accountNumber:any
  sflag=false
  err:any
getStatement()
{
  var obj={
      "accountNo":this.accountNumber,
      "fromDate":this.frmDate,
      "toDate":this.toDate
  }
  
  console.log( obj)
   this.service.getStatement(obj).subscribe((data)=>{this.resp(data)},(err)=>{
    this.err="Error occured"
   })
  
   console.log(this.statement)
}
resp(data:any)
{
  this.statement=data
  if(this.statement.length!==0)
  {
    this.sflag=true
  }
}
  ngOnInit(): void {

    this.flag=this.service.checkLogin()
    
  }

}
