import AdminServices from "../servises/adminServises";
import { Request, Response } from "express";

 
  class AdminController{

    constructor( private adminservises :AdminServices){}

    async adminLogin(req:Request,res:Response):Promise<void>{

        console.log('reachde controllerss.........');
        const userData = req.body;
        await this.adminservises.verifyUser(userData);
        res.status(200).json({ message: "adminLogin succesfully" });

    }


  }



  export default AdminController