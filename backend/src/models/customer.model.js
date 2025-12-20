import mongoose from 'mongoose';

const customerSchema = mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:false
        },
        name:{
            type: String, 
            required: true
        },
        email:{
            type: String, 
            unique: true,
            lowercase:true,
            trim:true
        },
        phone:{
            type: String, 
            required: true
        },
        relationship: {
            type: String,
            enum: ["client", "prospect", "vendor", "partner", "personal", "recruiter"],
            default: "prospect",
        },
        status: {
            type: String,
            enum: ["lead", "active", "inactive"],
            default: "lead",
        },
    },
    {
        timestamps: true,
    }
)

const Customer = mongoose.model("Customer",customerSchema);

export default Customer;