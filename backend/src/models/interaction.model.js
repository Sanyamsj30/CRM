import mongoose from 'mongoose';


const interactionSchema = mongoose.Schema(
    {
        customer:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Customer",
            required:true
        },
        type: {
            type: String,
            enum: ["call", "meeting", "email", "note"],
            default: "note",
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        scheduledAt: {
            type: Date,
        },
        status: {
            type: String,
            enum: ["pending", "completed", "canceled"],
            default: "pending",
        }
    },
    {
        timestamps: true,
    }
)

const Interaction = mongoose.model("Interaction",interactionSchema);

export default Interaction; 