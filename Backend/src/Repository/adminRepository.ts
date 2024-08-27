import UserSchemadata from "../model/userModel";

class adminRepository {
  async findAdminbyemail(email: string | undefined ) {
     const finduser = await UserSchemadata.findOne({email})
     if(!finduser){
        throw new Error("user not found")
     }

     return finduser;
  }
}

export default adminRepository;
