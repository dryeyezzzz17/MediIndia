const express=require("express");
const cors=require("cors");
require("dotenv").config();
const connectDb=require("./config/db");

const app=express();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("MediIndia API is running");
})

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));


connectDb();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});