const Booking=require("../models/Booking");
const HospitalTreatment=require("../models/HospitalTreatment");

exports.createBooking=async (req,res)=>{
    try{
        const {hospitalTreatment,preferredDate,medicalNotes}=req.body;

        if(!hospitalTreatment){
            return res.status(400).json({
                message:"HospitalTreatment is required"
            })
        }

        const check=await HospitalTreatment.findOne({
            _id:hospitalTreatment,
            isActive:true,
        })
        if(!check){
            return res.status(400).json({
                message:"Invalid hospital treatment "
            })
        }
        const existingBooking = await Booking.findOne({
            user: req.user.id,
            hospitalTreatment,
            status: "Pending",
        });

        if (existingBooking) {
            return res.status(400).json({
                message:
                "You already have a pending booking for this treatment at this hospital",
            });
        }
        const booking=await Booking.create({
            user:req.user.id,
            hospitalTreatment,
            preferredDate,
            medicalNotes,
        })
        res.status(201).json(booking);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

exports.getMyBookings=async (req,res)=>{
    try{
        const bookings=await Booking.find({user:req.user.id}).
        populate({
            path:"hospitalTreatment",
            populate:[
                {path:"hospital",select:"name city contactEmail"},
                {path:"treatment",select:"name category"},
            ],
        }).sort({createdAt:-1});
        res.json(bookings);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

exports.getAllBookings=async (req,res)=>{
    try{

        const bookings=await Booking.find().
        populate("user","name email country")
        .populate({
            path:"hospitalTreatment",
            populate:[
                {path:"hospital",select:"name city"},
                {path:"treatment",select:"name"},
            ],
        }).sort({createdAt:-1});
        return res.status(200).json(bookings); 
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

exports.updateBookingStatus=async (req,res)=>{
    try{
        const {status}=req.body;
        if(!["Pending","Approved","Rejected"].includes(status)){
            return res.status(400).json({ message: "Invalid status value" });
        }

        const booking=await Booking.findByIdAndUpdate(
            {_id:req.params.id},
            {status},
            {new:true}
        );
        if(!booking){
            return res.status(404).json({ message: "Booking not found" });
        }
        res.json(booking);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

exports.cancelBooking = async (req, res) => {
    try{
        const booking = await Booking.findById(req.params.id);

        if(!booking){
        return res.status(404).json({ message: "Booking not found" });
        }

        if(booking.user.toString() !== req.user.id){
        return res.status(403).json({ message: "Not authorized" });
        }

        if (booking.status !== "Pending") {
        return res.status(400).json({
            message: "Only pending bookings can be cancelled",
        });
        }

        booking.status = "Cancelled";
        await booking.save();

        res.json({ message: "Booking cancelled successfully" });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
};