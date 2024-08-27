import { IUser, IUserReturn } from "../entities/userEntities";
import UserSchemadata from "../model/userModel";
import UserTempSchemadata from "../model/userTempModel";
import HashPassword from "../utils/Hashpassword";
import {
  generateOtp,
  sendVerifyMail,
  sendVerifyMailforemail,
} from "../utils/mail";

class userRepository {
  async userRegister(
    userData: Partial<IUser>
  ): Promise<IUserReturn | undefined> {
    try {
      console.log("register.............");
      if (!userData.password) {
        throw new Error("Password is Required");
      }

      if (!userData.email) {
        throw new Error("Email is Required");
      }
      const hashedPassword = await HashPassword.hashPassword(userData.password);

      console.log("wdn ufhcnef");

      const otp = generateOtp();

      let userName = userData.name || "";
      await sendVerifyMail(userData.email, userName, otp);
      const updateData = {
        ...userData,
        password: hashedPassword,
        otp: otp,
        isActive: userData.isActive ?? false,
      };

      const options = {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      };

      const updateUser = await UserTempSchemadata.findOneAndUpdate(
        { email: userData.email },
        updateData,
        options
      );
      return updateUser ?? undefined;
    } catch (error) {
      console.error(`Error in mentorRegister: ${error}`);
    }
  }

  async verifyresend(email: string) {
    try {
      const mailotp = generateOtp();
      await sendVerifyMailforemail(email, mailotp);

      let update = await UserTempSchemadata.findOneAndUpdate(
        { email: email },
        {
          otp: mailotp,
        }
      );
      if (!update) {
        throw new Error("No user found");
      }

      return update;
    } catch (error) {
      console.log(error);
    }
  }

  async findotp(otp: number, email: string): Promise<IUserReturn | undefined> {
    try {
      let otpget = otp;
      let userDetail = await UserTempSchemadata.findOne({ email }).exec();
      console.log(userDetail, "user details get here");
      if (!userDetail) {
        throw new Error("User not found ");
      }
      if (userDetail.otp !== otpget) {
        throw new Error("OTP is not matching");
      }

      const userSchema = new UserSchemadata({
        name: userDetail.name,
        email: userDetail.email,
        password: userDetail.password,
        isActive: true,
        isAdmin: false,
      });

      const userdetailsget = await userSchema.save();
      await UserTempSchemadata.deleteOne({ email });
      return userdetailsget;
    } catch (error) {
      console.log(error);
    }
  }

  async findByEmail(email: string) {
    let userDetail = UserSchemadata.findOne({ email }).exec();
    return userDetail;
  }

  async checkByEmail(userdata: any) {
    try {
      let email = userdata.email;
      let userDetail = UserSchemadata.findOne({ email }).exec();
      if (!userDetail) {
        throw new Error("No user found");
      }
      return userDetail;
    } catch (error) {
      console.log(error);
    }
  }

  async checkingforgetotp(otp: number, email: string) {
    let getuser = await UserTempSchemadata.findOne({ email });
    if (!getuser) {
      throw new Error("User not found ");
    }
    if (getuser.otp != otp) {
      throw new Error("Wrong otp entered");
    }

    return getuser;
  }

  async changingpassword(email: string, password: string) {
    const hashedPassword = await HashPassword.hashPassword(password);

    const Changepassword = await UserSchemadata.findOneAndUpdate(
      { email },
      {
        password: hashedPassword,
      }
    );

    return Changepassword;
  }


  async FindEmail(email:string|undefined){
    try {
      let getUser =  await UserSchemadata.findOne({email:email})
      return getUser
    } catch (error) {
      console.log('error');
      
    }
  }

  async checkingmail(email: string | undefined) {
    try {
      const otp = generateOtp();
      console.log(otp, "otp");
      console.log(email, "email............");
      await sendVerifyMailforemail(email, otp);
      const options = {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      };

      const updateUser = await UserTempSchemadata.findOneAndUpdate(
        { email: email },
        { otp: otp },
        options
      );
      let userDetail = UserSchemadata.findOne({ email }).exec();
      return userDetail;
      
    } catch (error) {
      console.log(error);
      
    }
    
  }
}

export default userRepository;
