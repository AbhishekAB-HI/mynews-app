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
Object.defineProperty(exports, "__esModule", { value: true });
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    userRegister(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                console.log(userData, 'userdata......................');
                yield this.userService.createUser(userData);
                res.status(200).json({ message: "OTP Send Successfully" });
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.message === 'Mentor already exists.') {
                        res.status(409).json({ message: error.message });
                    }
                    else if (error.message === 'Email is required to create a mentor.') {
                        res.status(400).json({ message: error.message });
                    }
                    else {
                        console.error(`Error in mentorRegister: ${error.message}`);
                        res.status(500).json({ message: 'Internal Server Error' });
                    }
                }
            }
        });
    }
}
exports.default = UserController;
