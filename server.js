import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

dotenv.config();
 
const app = express();
app.use(cors());
app.use(express.json());

import itemRouter from "./src/routes/items.routes.js";
app.use("/api/items", itemRouter);
app.use("/uploads", express.static(path.join(process.cwd(), 'uploads')));

app.listen(process.env.PORT, () => 
    console.log(`Server running on port ${process.env.PORT}`)
);