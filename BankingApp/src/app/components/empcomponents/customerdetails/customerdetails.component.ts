import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerDetails } from 'src/app/Models/CustomerDetails';
import { ServicesService } from '../../services.service';

@Component({
  selector: 'app-customerdetails',
  templateUrl: './customerdetails.component.html',
  styleUrls: ['./customerdetails.component.css']
})
export class CustomerdetailsComponent implements OnInit {

  constructor(@Inject(ServicesService)private service:ServicesService) { 
    this.myform=new FormGroup({
      cid:new FormControl("",[Validators.required]),
     
    });
  }
  myform:any
data:any;
dflag=false;
disp=false
 async getDetails()
{

  var cid=this.myform.controls.cid.value
   await this.service.getCustomerDetails(cid).subscribe((resp)=>{this.setData(resp);this.disp=false}, (error) => {
    this.disp=true;
    console.error('error caught in component')
    console.warn(error);
  })
  //console.log(this.data)
 
 
}
setData(resp:CustomerDetails)
{
  
  this.data=resp
  console.log(this.data)
  if(resp!=null)
  {
    this.dflag=true
  }
}
flag=false
  ngOnInit(): void {
    this.flag=this.service.checkLogin();
  }

}
