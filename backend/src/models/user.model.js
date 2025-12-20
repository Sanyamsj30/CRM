import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = mongoose.Schema(
    {
        name:{
            type: String, 
            required: true
        },
        email:{
            type: String, 
            required: true, 
            unique: true,
            lowercase:true,
            trim:true
        },
        password:{
            type: String, 
            required: true
        },
        phone:{
            type: String,
            required: false
        },
        resetPasswordOTP: String,
        resetPasswordOTPExpiry: Date,
        isEmailVerified: {
            type: Boolean,
            default: false
        },
        emailVerificationOTP: String,
        emailVerificationOTPExpiry: Date,
        googleId: {
            type: String,
            unique: true,
            sparse: true
        },
        authProvider: {
            type: String,
            enum: ["local", "google"],
            default: "local"
        }
    },
    {
        timestamps: true,
    }

)

userSchema.pre("save", async function(){
    if(!this.isModified("password")){
        return ;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    
});

userSchema.methods.isPasswordCorrect = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

// userSchema.methods.toJSON = function(){
//     const obj = this.toObject();
//     delete obj.password;    
//     delete obj.resetPasswordOTP;
//     delete obj.resetPasswordOTPExpiry;
//     delete obj.emailVerificationOTP;
//     delete obj.emailVerificationOTPExpiry;
//     return obj;
// };

userSchema.methods.generateEmailVerificationOTP = function(){
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    this.emailVerificationOTP = otp;
    this.emailVerificationOTPExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
    return otp;
}

userSchema.methods.generateResetPasswordOTP = function(){
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    this.emailVerificationOTP = otp;
    this.emailVerificationOTPExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
    return otp;
}

const User = mongoose.model("User",userSchema);

export default User;