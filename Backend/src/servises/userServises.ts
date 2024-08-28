import { error } from "console";
import { IUser,Checkuser, Confirmuser, tockens } from "../entities/userEntities";
import { TokenResponce } from "../interface/userInterface/userDetail";
import { userPayload } from "../interface/userInterface/userPayload";
import userRepository from "../Repository/userRepository";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import HashPassword from "../utils/Hashpassword";
import { adminuserId } from "../entities/adminEntities";
import mongoose,{ ObjectId } from "mongoose";

 class userServises {
   constructor(private userRepository: userRepository) {}

   async createUser(userData: Partial<IUser>): Promise<IUser | undefined> {
     if (!userData.email) {
       throw new Error("Email is required");
     }
     const exsistUser = await this.userRepository.findByEmail(userData.email);
     if (exsistUser) {
       throw new Error("Email already exist");
     }
     const RegisterUser = await this.userRepository.userRegister(userData);
     return RegisterUser;
   }

   async verifyUser(userdata: Partial<Checkuser>): Promise<tockens | undefined> {
     if (!userdata.email) {
       throw new Error("Email is required");
     }
     if (!userdata.password) {
       throw new Error("password is required");
     }
     const verifyuser = await this.userRepository.checkByEmail(userdata);
     if (!verifyuser?.email) {
       throw new Error("User does not exist");
     }

     if (verifyuser?.password) {
      console.log(verifyuser?.password,'password,,,,,,,,,,,,,,');
      console.log('reached');
       const isPasswordValid = await HashPassword.comparePassword(
         userdata.password,
         verifyuser.password
       );

       console.log(isPasswordValid, "password,gethetr,,,,,,,,,,,,,");
       if (!isPasswordValid){
          throw new Error("Wrong password")
       }
         if (isPasswordValid) {
           const userPayload: userPayload = {
             id: verifyuser._id as unknown,
           };
           let accessToken = generateAccessToken(userPayload);
           let refreshToken = generateRefreshToken(userPayload);
           console.log(accessToken, "accessTocken");
           console.log(refreshToken, "refreshTocken");
           return { accessToken: accessToken, refreshToken: refreshToken };
         }
     }
   }

   async verifymail(userdata: string): Promise<Confirmuser> {
     let getData = userdata;
      const checkEmail = await this.userRepository.FindEmail(getData);
      if (!checkEmail){
          throw new Error("No user found");
      } 
     const getUser = await this.userRepository.checkingmail(getData);
     if (!getUser) {
       throw new Error("Email did'nt match");
     }
     return getUser;
   }

   async verifyotp(otp: number, email: string): Promise<Checkuser> {
     console.log(otp, "get otp numbers");
     const getUser = await this.userRepository.checkingforgetotp(otp, email);

     return getUser;

     //  const getUser = await this.userRepository.checkingmail(getData);
   }

   async Changepassword(email: string, password: string): Promise<IUser> {
     console.log("reached servisessssssssssssssssss");

     const getUser = await this.userRepository.changingpassword(
       email,
       password
     );

     if (!getUser) {
       throw new Error("No user found");
     }
     return getUser;
   }

   async CheckOtp(
     userotp: number,
     email: string
   ): Promise<TokenResponce | undefined> {
     try {
       console.log("otp get on servise ", userotp);
       console.log("email get ", email);
       const RegisterUser = await this.userRepository.findotp(userotp, email);
       if (!RegisterUser) {
         throw new Error("User data didin't save");
       }
       const userPayload: userPayload = {
         id: RegisterUser.id,
       };
       const accessToken = await generateAccessToken(userPayload);
       const refreshToken = await generateRefreshToken(userPayload);

       console.log(accessToken, "access tocken ");
       console.log(refreshToken, "access tocken ");

       return { accessToken, refreshToken };
     } catch (error) {
       console.log(error);
     }
   }

   async sendResendotp(email:string){
    try {

      if( !email){
        throw new Error("No otp or email")
      }

      let getdetails =await this.userRepository.verifyresend(email)

      if(!getdetails){
           throw new Error("No users");
      }
    } catch (error) {
      console.log(error);
    }

   }

   
 }









 export default userServises