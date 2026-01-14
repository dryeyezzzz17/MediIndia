const express=require("express");
const cors=require("cors");
require("dotenv").config();
const connectDb=require("./config/db");
require("./models/Treatment");
require("./models/Hospital");

const app=express();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("MediIndia API is running");
})

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/hospitals", require("./routes/hospitalRoutes"));
app.use("/api/doctors", require("./routes/doctorRoutes"));
app.use("/api/treatments",require("./routes/treatmentRoutes"));
app.use("/api/hospital-treatments",require("./routes/hospitalTreatmentRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/users",require("./routes/userRoutes"));



connectDb();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});