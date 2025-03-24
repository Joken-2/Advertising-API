import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import advertRouter from "./routes/product.js";
import userRouter from "./routes/user.js";


const connectionString = process.env.MONGO_URL
await mongoose
.connect(connectionString)
.then(() => {
    console.log("database is connected")
});

const app = express();

app.use(express.json());
app.use(userRouter);

// console.log(process.env.JWT_SECRET_KEY)

app.use(advertRouter);
const port = process.env.PORT || 6000;
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
})


