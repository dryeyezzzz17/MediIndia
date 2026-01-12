const mongoose=require("mongoose");
const bookingSchema=new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    hospitalTreatment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HospitalTreatment",
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

bookingSchema.index(
  { user: 1, hospitalTreatment: 1, status: 1 }
);


module.exports=mongoose.model("Booking",bookingSchema);