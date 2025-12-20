import User from '../models/user.model.js';
import { asynchandler } from '../utils/asynchandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/sendEmail.js';
import twilio from 'twilio';



// User Registration
export const registerUser = asynchandler(async(req,res)=>{
    const {name , email,phone, password} = req.body;

    if(!name || !email || !password || !phone){
        throw new ApiError(400,"All fields are required");
    }


    const existingUser = await User.findOne({email});

    if(existingUser){
        throw new ApiError(409,"User already exists with this email");
    }

    const user = await User.create(
        {
            name,
            email,
            phone,
            password
        }
    );
    const verificationcode = await user.generateEmailVerificationOTP();
    await user.save();

    await sendVerificationEmailAndMessage(
      user.email, 
      verificationcode,
      user.phone
    );

    res.status(201).json(new ApiResponse(201,user,"User registered successfully"));

});

async function sendVerificationEmailAndMessage(Email, code, phone) {
  try {
    await sendEmail({
      email: Email,
      subject: "Email Verification",
      html: generateEmailContent(code),
    });
    console.log("Email sent");
  } catch (err) {
    console.error("EMAIL ERROR:", err);
    throw new Error("Email could not be sent.");
  }

  try {
   // CREATE CLIENT HERE
  const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

    await twilioClient.messages.create({
      body: `Your verification code is: ${code}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });
    console.log("SMS sent");
  } catch (err) {
    console.error("SMS ERROR:", err);
    throw new Error("SMS could not be sent.");
  }
}

function generateEmailContent(code){
    return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
  </head>

  <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:20px;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background:#ffffff; border-radius:6px; overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td style="background:#111827; padding:20px; text-align:center;">
                <h1 style="color:#ffffff; margin:0; font-size:22px;">
                  {{APP_NAME}}
                </h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:30px; color:#333333;">
                <h2 style="margin-top:0; font-size:18px;">
                  Verify your email address
                </h2>

                <p style="font-size:14px; line-height:1.6;">
                  Hello {{USER_NAME}},
                </p>

                <p style="font-size:14px; line-height:1.6;">
                  Use the verification code below to complete your request.
                  
                  This code is valid for <strong>10 minutes</strong>.
                </p>

                <!-- OTP Box -->
                <div style="margin:30px 0; text-align:center;">
                  <span style="
                    display:inline-block;
                    font-size:28px;
                    letter-spacing:6px;
                    padding:14px 24px;
                    background:#f3f4f6;
                    border-radius:6px;
                    color:#111827;
                    font-weight:bold;
                  ">
                    ${code}
                  </span>
                </div>

                <p style="font-size:14px; line-height:1.6;">
                  If you didn’t request this, you can safely ignore this email.
                </p>

                <p style="font-size:14px; line-height:1.6;">
                  Thanks,<br />
                  <strong>{{APP_NAME}} Team</strong>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f9fafb; padding:15px; text-align:center; font-size:12px; color:#6b7280;">
                © {{YEAR}} {{APP_NAME}}. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;}

export const verifyEmail = asynchandler(async(req,res)=>{
    const { email,otp } = req.body;
    if(!email || !otp){
        throw new ApiError(400,"Email and OTP are required");
    }

    const user = await User.findOne({ email }); 
    
    if(!user.emailVerificationOTP){
        throw new ApiError(400,"No OTP found, please request a new one");
    }
    if(!user.emailVerificationOTPExpiry || user.emailVerificationOTPExpiry < Date.now()){
        throw new ApiError(400,"OTP has expired");
    }
    if(user.emailVerificationOTP !== otp){
        throw new ApiError(400,"Invalid OTP");
    }     

    user.isEmailVerified = true;
    user.emailVerificationOTP = null;
    await user.save();      
    res.status(200).json(new ApiResponse(200,null,"Email verified successfully"));
});

// export const resendEmailVerificationOTP = asynchandler(async(req,res)=>{
//     const { email } = req.body;
//     if(!email){
//         throw new ApiError(400,"Email is required");
//     } 
//     const user = await User.findOne({ email });
//     if(!user){
//         throw new ApiError(404,"User not found");
//     }   
//     const newOTP = user.generateEmailVerificationOTP();
//     await user.save();
//     await sendVerificationEmailAndMessage(
//       user.email, 
//       newOTP,
//       user.phone
//     );
//     res.status(200).json(new ApiResponse(200,null,"New OTP sent successfully"));
// });

export const loginUser = asynchandler(async(req,res)=>{
    const { email, password } = req.body;
    if(!email || !password){
        throw new ApiError(400,"Email and Password are required");
    }
    const user = await User.findOne({ email });
    if(!user){
        throw new ApiError(404,"User not found");
    }

    if(!user.isEmailVerified){
        throw new ApiError(401,"Email is not verified");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if(!isPasswordCorrect){
        throw new ApiError(401,"Invalid password");
    }

    const token = jwt.sign({
      id:user._id,
      email:user.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN
    }
    );

    res.status(200).json(new ApiResponse(200,{token},"Login successful"));
});

export const forgotPassword = asynchandler(async(req,res)=>{
    const { email } = req.body;
    if(!email){
        throw new ApiError(400,"Email is required");
    }
    const user = await User.findOne({ email });
    if(!user){
        throw new ApiError(404,"User not found");
    }

    const otp = user.generateResetPasswordOTP();
    user.resetPasswordOTP = otp;
    user.resetPasswordOTPExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    await sendEmail({
      email: user.email,
      subject: "Reset Password",
      html: generateResetPasswordEmailContent(otp),
    })

});

function generateResetPasswordEmailContent(code){
  return `
  <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset Password</title>
  </head>

  <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:20px;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background:#ffffff; border-radius:6px; overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td style="background:#1f2937; padding:20px; text-align:center;">
                <h1 style="color:#ffffff; margin:0; font-size:22px;">
                  {{APP_NAME}}
                </h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:30px; color:#333333;">
                <h2 style="margin-top:0; font-size:18px;">
                  Reset your password
                </h2>

                <p style="font-size:14px; line-height:1.6;">
                  Hello {{USER_NAME}},
                </p>

                <p style="font-size:14px; line-height:1.6;">
                  We received a request to reset your password.  
                  Use the verification code below to continue.
                </p>

                <!-- OTP Box -->
                <div style="margin:30px 0; text-align:center;">
                  <span style="
                    display:inline-block;
                    font-size:28px;
                    letter-spacing:6px;
                    padding:14px 26px;
                    background:#f3f4f6;
                    border-radius:6px;
                    color:#111827;
                    font-weight:bold;
                  ">
                    ${code}
                  </span>
                </div>

                <p style="font-size:14px; line-height:1.6;">
                  This code will expire in <strong>10 minutes</strong>.
                </p>

                <p style="font-size:14px; line-height:1.6;">
                  If you did not request a password reset, you can safely ignore this email.
                  Your password will remain unchanged.
                </p>

                <p style="font-size:14px; line-height:1.6;">
                  Regards,<br />
                  <strong>{{APP_NAME}} Team</strong>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f9fafb; padding:15px; text-align:center; font-size:12px; color:#6b7280;">
                © {{YEAR}} {{APP_NAME}}. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
}

export const changePassword = asynchandler(async(req,res)=>{
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;

    if(!oldPassword || !newPassword){
        throw new ApiError(400,"Old password and new password are required");
    }
    const user = await User.findById(userId);
    if(!user){
        throw new ApiError(404,"User not found");
    } 
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
    if(!isPasswordCorrect){
        throw new ApiError(401,"Old password is incorrect");
    }
    if(oldPassword === newPassword){  
        throw new ApiError(400,"New password must be different from old password");
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json(new ApiResponse(200,null,"Password changed successfully"));
});



