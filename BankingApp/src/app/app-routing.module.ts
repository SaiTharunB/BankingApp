import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankComponent } from './components/bank/bank.component';
import { CustloginComponent } from './components/custlogin/custlogin.component';
import { StatementComponent } from './components/customercomponents/statement/statement.component';
import { TransactionComponent } from './components/customercomponents/transaction/transaction.component';
import { TransactionsComponent } from './components/customercomponents/transactions/transactions.component';
import { TransferComponent } from './components/customercomponents/transfer/transfer.component';
import { WithdrawComponent } from './components/customercomponents/withdraw/withdraw.component';
import { CreateaccountComponent } from './components/empcomponents/createaccount/createaccount.component';
import { CreatecustomerComponent } from './components/empcomponents/createcustomer/createcustomer.component';
import { CustomerdetailsComponent } from './components/empcomponents/customerdetails/customerdetails.component';
import { DepositComponent } from './components/empcomponents/deposit/deposit.component';


import { HomeComponent } from './components/home/home.component';

const routes: Routes = [

  {path:"",component:BankComponent},
  {path:"login",component:CustloginComponent},
  {path:"createcustomer",component:CreatecustomerComponent},
  {path:"createaccount",component:CreateaccountComponent},
  {path:"getcustdetails",component:CustomerdetailsComponent},
  {path:"deposit",component:DepositComponent},
 
  {path:"transactions",component:TransactionsComponent},
  {path:"transaction/:id",component:TransactionComponent},
  {path:"withdraw",component:WithdrawComponent},
  {path:"transfer",component:TransferComponent},
  {path:"statement",component:StatementComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
