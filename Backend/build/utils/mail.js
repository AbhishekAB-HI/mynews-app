"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerifyMail = exports.generateOtp = void 0;
const crypto_1 = __importDefault(require("crypto"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const generateOtp = () => {
    const otp = crypto_1.default.randomInt(100000, 99999);
    console.log(otp);
    return otp.toString();
};
exports.generateOtp = generateOtp;
const sendVerifyMail = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const mailTransporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USEREMAIL,
            pass: process.env.USERPASSWORD,
        },
    });
    const mailDetails = {
        from: process.env.USEREMAIL,
        to: email,
        subject: `Your OTP is: ${otp}`,
        text: `Your OTP for validation is ${otp}`,
    };
    try {
        yield mailTransporter.sendMail(mailDetails);
        console.log("Email sent successfully");
    }
    catch (error) {
        console.error("Error occurred while sending email:", error);
    }
});
exports.sendVerifyMail = sendVerifyMail;
