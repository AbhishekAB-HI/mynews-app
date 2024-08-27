
import { Router } from "express";
import AdminController from "../controllers/AdminControllers";
import AdminServices from "../servises/adminServises";
import adminRepository from "../Repository/adminRepository";


 const adminrepository = new adminRepository();
 const adminservises = new AdminServices(adminrepository);
 const admincontroller = new AdminController(adminservises);
 
 const router = Router();


 
  router.post("/adminlogin", async (req, res) => admincontroller.adminLogin(req,res));











export default router