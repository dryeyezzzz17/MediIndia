const mongoose=require("mongoose");
const bookingSchema=new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    treatment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Treatment",
      required: true,
    },

    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },

    preferredDate: {
      type: Date,
    },

    medicalNotes: {
      type: String, 
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
},{timestamps:true});
module.exports=mongoose.model("Booking",bookingSchema);