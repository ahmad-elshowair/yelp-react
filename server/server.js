import express from "express";
import morgan from 'morgan';
import helmet from 'helmet'
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import restaurantsRoutes from "./restaurants/routes.js";


const {PORT} = process.env;
const port = PORT || 3002;

// an instance app of express 
const app = express();

// middlewares
app.use(cors());

app.use(express.json());

app.use(morgan('tiny'));

app.use(helmet());

// use routes of restaurants
app.use('/restaurants', restaurantsRoutes);

app.listen(port,()=>{
console.log(`the server is up on http://localhost:${port}`);
});