"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./Routes/userRoutes"));
const db_1 = __importDefault(require("./config/db"));
const app = (0, express_1.default)();
(0, db_1.default)();
const port = 3000;
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/user", userRoutes_1.default);
app.listen((port), () => {
    console.log(`server is running at :- ${port}`);
});
