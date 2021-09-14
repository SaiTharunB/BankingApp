
import { Account } from "./Account";


export class CustomerDetails
{
                    
                userId:any;
                username:any;
                email:any;
                panNumber:any;
                dateOfBirth:any;
                address:any
                accounts:Account[]=[]
                constructor(userId:any, username:any,email:any,panNumber:any,dateOfBirth:any,address:any,accounts:any)
                {
                    this.userId=userId
                    this.username=username
                    this.email=email
                    this.panNumber=panNumber
                    this.dateOfBirth=dateOfBirth
                    this.address=address
                    this.accounts=accounts
                }
}