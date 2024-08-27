import { adminId, passwords } from "../entities/adminEntities";
import adminRepository from "../Repository/adminRepository";
import HashPassword from "../utils/Hashpassword";








 class AdminServices {
   constructor(private adminRepository: adminRepository) {}

   async verifyUser(userdata: Partial<adminId>): Promise<void> {
     if (!userdata.email) {
       throw new Error("Email is required");
     }
     if (!userdata.password) {
       throw new Error("password is required");
     }
     const verifyuser = await this.adminRepository.findAdminbyemail(
       userdata.email
     );

     if (!verifyuser?.email) {
       throw new Error("Email not exist");
     }

     if (!verifyuser?.password) {
       const isPasswordValid = await HashPassword.comparePassword(
         userdata.password,
         verifyuser.password
       );

       if (!isPasswordValid) {
         throw new Error("Wrong password");
       }

    //    return isPasswordValid;
     }
   }
 }


  export default AdminServices