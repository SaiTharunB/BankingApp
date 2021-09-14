
export class LoginResponse{

    userId:any;
    authToken:any;
    role:any;
   
    constructor(userId:any, authToken:any,role:any)
    {
        this.userId = userId;
        this.authToken = authToken;
        this.role = role;
       
    }
}