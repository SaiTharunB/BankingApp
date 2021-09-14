import { HttpClient, HttpHeaders } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Inject, Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';

import { CustomerDetails } from '../Models/CustomerDetails';
import { DepositResponse } from '../Models/DepositResponse';

import { LoginResponse } from '../Models/LoginResponse';
import { DepositComponent } from './empcomponents/deposit/deposit.component';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(@Inject(HttpClient)private http:HttpClient ) { }
user:any;
userInfo:any;
creds:any
str:any
generateHeaders()
{
   var bool=sessionStorage.getItem("userInfo")?true:false
  //  const headerDict = {
   
  //   'Authorization':this.str
  // }
   if(bool)
   {
    this.creds=sessionStorage.getItem("userInfo")
    this.creds=JSON.parse(this.creds)
     this.str=this.creds.authToken
   
    return new HttpHeaders().set('Authorization',this.str)
   }
   console.log(this.str)
  return  new HttpHeaders().set('Authorization',this.str);

}
checkLogin()
{
  return sessionStorage.getItem("userInfo")?true:false;
}
   loginUser(obj:any):Observable<LoginResponse>
  {
    console.log(obj)
    return this.http.post<LoginResponse>("http://localhost:8090/authentication-ms/login",obj);
  }
  checkRole()
  {
 
    if(this.checkLogin())
    {
      this.userInfo=sessionStorage.getItem("userInfo")
      this.userInfo=JSON.parse(this.userInfo);
      return this.userInfo.role;
    }
  }
reply:any;
  createCustomer(obj:any):Observable<boolean>
  {
    console.log(obj)
     return this.http.post<boolean>("http://localhost:8090/customer-ms/bankapi/createCustomer",obj,{"headers":this.generateHeaders()})
     
  }
  createAccount(obj:any):Observable<boolean>
  {
    console.log(obj)
    return this.http.post<boolean>("http://127.0.0.1:8090/account-ms/bankapi/createAccount/"+obj.customerId,obj,{"headers":this.generateHeaders()})
  
  }
  customerDetails:any
  errorMessage:any
 getCustomerDetails(id:any)
  {
   // console.log(id)
   return this.http.get<CustomerDetails>("http://127.0.0.1:8090/customer-ms/bankapi/getCustomerDetails/"+id,{"headers":this.generateHeaders()})
                 //Error callback
  
  }
  deposit(obj:any)
  {
    console.log(obj)
    return this.http.post<DepositResponse>("http://127.0.0.1:8090/account-ms/bankapi/deposit",obj,{"headers":this.generateHeaders()})
    
  }
  
  transaction:any
  getTransaction(accid:any)
  {
    return this.http.get<any>("http://127.0.0.1:8090/transaction-ms/bankapi/getTransactionsByAccountNumber/"+accid,{"headers":this.generateHeaders()})
    //console.log(this.reply)
    
  }
  
  withdraw(obj:any)
  {
     return this.http.post<DepositResponse>("http://127.0.0.1:8090/account-ms/bankapi/withdraw",obj,{"headers":this.generateHeaders()})
     
  }

  transfer(obj:any)
  {
    return this.http.post<boolean>("http://127.0.0.1:8090/account-ms/bankapi/transfer",obj,{"headers":this.generateHeaders()})
  
  }
  statementresp:any
  getStatement(obj:any)
  {
    return this.http.post<any>("http://127.0.0.1:8090/account-ms/bankapi/getStatement",obj,{"headers":this.generateHeaders()})
    
  }
}
