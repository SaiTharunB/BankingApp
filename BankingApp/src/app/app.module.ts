import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { CustloginComponent } from './components/custlogin/custlogin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CustdashboardComponent } from './components/dashboards/custdashboard/custdashboard.component';
import { EmpdashboardComponent } from './components/dashboards/empdashboard/empdashboard.component';
import { CreatecustomerComponent } from './components/empcomponents/createcustomer/createcustomer.component';
import { CreateaccountComponent } from './components/empcomponents/createaccount/createaccount.component';
import { CustomerdetailsComponent } from './components/empcomponents/customerdetails/customerdetails.component';
import { DepositComponent } from './components/empcomponents/deposit/deposit.component';

import { TransactionsComponent } from './components/customercomponents/transactions/transactions.component';
import { TransactionComponent } from './components/customercomponents/transaction/transaction.component';
import { WithdrawComponent } from './components/customercomponents/withdraw/withdraw.component';
import { TransferComponent } from './components/customercomponents/transfer/transfer.component';
import { StatementComponent } from './components/customercomponents/statement/statement.component';
import { BankComponent } from './components/bank/bank.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  
    CustloginComponent,
    CustdashboardComponent,
    EmpdashboardComponent,
    CreatecustomerComponent,
    CreateaccountComponent,
    CustomerdetailsComponent,
    DepositComponent,
   
    TransactionsComponent,
    TransactionComponent,
    WithdrawComponent,
    TransferComponent,
    StatementComponent,
    BankComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
