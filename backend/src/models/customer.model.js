import mongoose from 'mongoose';

const customerSchema = mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        name:{
            type: String, 
            required: true
        },
        email: {
            type: String,
            lowercase: true,
            trim: true,
        },
        phone:{
            type: String, 
            trim: true,
        },
        relationship: {
            type: String,
            enum: ["Client", "Prospect", "Vendor", "Partner", "Personal", "Recruiter"],
            default: "Prospect",
        },

        status: {
            type: String,
            enum: ["Lead", "Active", "Inactive"],
            default: "Lead",
        },
    },
    {
        timestamps: true,
    }
)

const Customer = mongoose.model("Customer",customerSchema);

export default Customer;