import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import restaurantsRoutes from "./restaurants/routes.js";


const {PORT} = process.env;
const port = PORT || 3002;

// an instance app of express 
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// use routes of restaurants
app.use('/restaurants', restaurantsRoutes);

app.listen(port,()=>{
console.log(`the server is up on http://localhost:${port}`);
}); 