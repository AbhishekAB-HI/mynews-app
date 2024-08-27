import express from 'express'
import cors from 'cors'
import userRouter from './Routes/userRoutes'  
import connectDB from './config/db'
import adminRouter from './Routes/adminRouter' 
const app = express();

connectDB()   

const port = 3000 

app.use(   
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);   


app.use(express.json()); 
app.use(express.urlencoded({extended:true})); 
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
     
           
app.listen((port),()=>{ 
    console.log(`server is running at :- ${port}`);
});  