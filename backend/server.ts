import express ,{Request, Response} from "express"
import dotenv from "dotenv";
import cors from 'cors'
dotenv.config();
import connectDB from "./configs/db.js";
// const connectDB = require("./configs/db.js")
await connectDB();



const app = express();
const port = process.env.PORT ||3000


app.use(express.json())
app.use(cors)

app.get("/",(req:Request,res:Response)=>{
     res.send("Server is Live")
})

app.listen(port,()=>{
     console.log(`Server is running http://localhost:${port}`)
})