import { log } from "console";
import userServises from "../servises/userServises";
import { Request, Response } from "express";
import { generateOtp, sendVerifyMail }  from '../utils/mail'


 class UserController {
    
   constructor(private userService: userServises) {}


   async userRegister (req:Request,res:Response) :Promise  <void>  {
      try {
        const userData = req.body ;
        const useremail = req.body.email
        await this.userService.createUser(userData)
        res.status(200).json({ message: "OTP Send Successfully", useremail });
      } catch (error) {
          if (error instanceof Error) {
          if (error.message === "Email already exist.") {
            res.status(409).json({ message: error.message });
          }  
          if (error.message) {
              res.status(400).json({ message: error.message });
          }
      }
    }
   }


   async userLogin (req:Request,res:Response) : Promise <void>{
     try {
      const userData = req.body;
      let userdata = await this.userService.verifyUser(userData);
      if (userdata) {
        res.status(200).json({ message: "user Login succesfully" });
      } else {
        throw new Error("No user found");
      }
     } catch (error) {
         if (error instanceof Error) {
                if (error.message === "Wrong password") {
                  res.status(409).json({ message: error.message });
                } else if (error.message === "User does not exist") {
                  res.status(400).json({ message: error.message });
                } else {
                  console.error(`Invalid password ${error.message}`);
                  res.status(500).json({ message: error.message });
                }
              }
     }


   }

    async verifymailforget(req:Request,res:Response):Promise<void>{
      try {  

      const email = req.body.email;
      const userData = await this.userService.verifymail(email);
      const emailnew = userData.email;
      res.status(200).json({ message: "confirm user", email: emailnew });
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          if (error.message === "No user found") {
            res.status(400).json({ message: error.message });
          }
          if (error.message) {
            res.status(409).json({ message: error.message });
          } 
        }
        
        
      }



      
    }

     async forgetotp(req:Request,res:Response):Promise<void>{

      try {
        const { otp, email } = req.body;
        if (!otp || !email) {
          throw new Error("No email or otp")
        }
        let otpbody = parseInt(otp);
        await this.userService.verifyotp(otpbody, email);
        res.status(200).json({ message: "confirm user" });
        
      } catch (error) {
        console.log(error);
         if (error instanceof Error) {
           if (error.message === "No user found") {
             res.status(400).json({ message: error.message });
           }
           if (error.message) {
             res.status(409).json({ message: error.message });
           }
         }

        
      }
           

     }

      async setforgetpass(req:Request,res:Response):Promise<void>{

        console.log('reched here.........................');
        
          const { email, password } = req.body;

          console.log(email, password);
          
          if (!password || !email) {
            res.status(400).json({ message: "Password required" });
            return;
          }
           await this.userService.Changepassword(email, password);

           res.status(200).json({message:"Password Changed successfully"})


      }


   async  userCheckOtp (req:Request,res:Response ):Promise <void> {

    try {
      const { otp, email } = req.body;
      if (!otp || !email) {
        res.status(400).json({ message: "OTP are required" });
        return;
      }
      let otpbody = parseInt(otp);
      let userOtpverified = await this.userService.CheckOtp(otpbody, email);
      if(userOtpverified){
      
       res.status(200).json({ message: "OTP verified successfully", accessToken: userOtpverified.accessToken,refreshToken: userOtpverified.refreshToken,
       });
      }else{
         res.status(401).json({ message: "OTP is not matching" });
      }
    } catch (error) {
      console.log(error);
     if(error instanceof Error ){
       res.status(500).json({ message: "Internal Server Error" });
     }
    } 
   }



   async resendotp(req:Request,res:Response):Promise<void>{

    try {
       const {  email } = req.body;
       if (!email) {
         res.status(400).json({ message: "OTP are required" });
         return;
       }
       await this.userService.sendResendotp( email);
      res.status(200).json({message:'resend otp successfully'})
      
    } catch (error) {
      console.log(error);
    }


       
   }







 }



 export  default UserController