
import { Router } from "express";
import UserController from "../controllers/userControllers";
import userRepository from "../Repository/userRepository";
import userServises from "../servises/userServises";
// import {registerValidator} from '../Validator/Validations'
 
const router = Router();
const newRepository = new userRepository();
const newUserservise = new userServises(newRepository); 
const userController = new UserController(newUserservise);


router.post("/register",async (req,res) => userController.userRegister(req,res));
router.post("/verify-otp", async (req, res) => userController.userCheckOtp(req, res));
router.patch("/resend-otp", async (req, res) =>userController.resendotp(req, res));

router.post("/login", async (req, res) =>userController.userLogin(req, res));
router.post("/forgetmail", async (req, res) => userController.verifymailforget(req, res));
router.post("/verifyforgetotp", async (req, res) =>userController.forgetotp(req, res));
router.post("/setforgetpass", async (req, res) =>userController.setforgetpass(req, res));















export default router






