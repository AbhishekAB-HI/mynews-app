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
const userModel_1 = __importDefault(require("../model/userModel"));
const Hashpassword_1 = __importDefault(require("../utils/Hashpassword"));
const mail_1 = require("../utils/mail");
class userRepository {
    userRegister(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (!userData.password) {
                    throw new Error("Password is Required");
                }
                if (!userData.email) {
                    throw new Error("Email is Required");
                }
                const hashedPassword = yield Hashpassword_1.default.hashPassword(userData.password);
                const otp = (0, mail_1.generateOtp)();
                yield (0, mail_1.sendVerifyMail)(userData.email, otp);
                const updateData = Object.assign(Object.assign({}, userData), { password: hashedPassword, otp: otp, isActive: (_a = userData.isActive) !== null && _a !== void 0 ? _a : false });
                const options = {
                    new: true,
                    upsert: true,
                    setDefaultsOnInsert: true,
                };
                const updatedMentor = yield userModel_1.default.findOneAndUpdate({ email: userData.email }, updateData, options);
                return updatedMentor !== null && updatedMentor !== void 0 ? updatedMentor : undefined;
            }
            catch (error) {
                console.error(`Error in mentorRegister: ${error}`);
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let userDetail = userModel_1.default.findOne({ email }).exec();
            return userDetail;
        });
    }
}
exports.default = userRepository;
