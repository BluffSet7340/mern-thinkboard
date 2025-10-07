import User from "../model/User.js";
import bcrypt from "bcryptjs";
import { generateVerificationCode } from "../utils/generateVerificationCode.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import crypto from "crypto";
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordChangeRequest,
  sendPasswordResetSuccess,
} from "../../mailtrap/emails.js";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required son");
    }

    // check if user already exists
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists!" });
    }

    // hash password with salt of 10, make the cleartext password unreadable
    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationCode = generateVerificationCode();

    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken: verificationCode,
      //   the code should expire in 24 hours but let's do one minute for testing purposes too
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // unit is ms
    });

    await user.save();

    // now we need a token to set a cookie that ensure that the user is being authenticated

    // so authentication happening on the client side
    //  jwt

    generateTokenAndSetCookie(res, user._id);

    await sendVerificationEmail(user.email, verificationCode);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: { email: user.email, name: user.name },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res
        .status(401)
        .json({ success: fail, message: "Invalid Credentials" });
    } else {
      // bcrypt uses the blowfish cipher with a default number of salt rounds - 10
      // let compare it
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res
          .status(400)
          .json({ success: true, message: "Invalid Credentials" });
      }

      generateTokenAndSetCookie(res, user._id);

      res.status(200).json({
        success: true,
        message: "User is logged in",
        user: {
          ...user.toObject(),
          password: undefined,
        },
      });
      // if(user.password===hashedPassword){
      //   return res.status(200).json({success: true, message: "User is logged in"})
      // } else{
      // }
    }
  } catch (error) {
    console.log("Error", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  // we set the cookie name as token, so that's the cookie we are clearing out
  // during login
  res.clearCookie("token");
  res
    .status(200)
    .json({ success: true, message: "You have successfully logged out" });
};

export const verifyEmail = async (req, res) => {
  // imagine some UI to input 6 digit and the user sends that over to you son, what to do
  const { sixDigitCode } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: sixDigitCode,
      // this second line is cool, basically checks
      // if the expiry date exceeds the date rn
      // if it does, not expired, else expired

      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    // update values for the user
    await user.save();
    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user.toObject(),
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      success: fail,
      message: "Server Error",
    });
  }
};

export const forgotPassword = async (req, res) => {
  // user provides email when trying to reset password for their account
  const { email } = req.body;

  try {
    // const user = await User.findOne({ email });

    // if (!user) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "User not found" });
    // }

    // // generate a reset token
    // const resetToken = crypto.randomBytes(20).toString("hex");
    // // const hashedresetToken = await bcrypt.hash(resetToken, 10) // hash the token
    // const tokenExpiryDate = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    // // now assigning these to the user
    // user.resetPasswordExpiresAt = tokenExpiryDate;
    // user.resetPasswordToken = resetToken;

    // await user.save();

    // await sendPasswordChangeRequest(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

    res.status(201).json({
      success: true,
      message: "Email successfully sent",
      // url: `${process.env.CLIENT_URL}/reset-password/${resetToken}`,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(400).json({ success: false, message: error.message });
    // res.status(500).json({
    //   success: fail,
    //   message: "Server Error",
    // });
  }
};

export const resetPassword = async (req, res) => {
  try {
    // based on the url, grab the token from the :token parameter and figure out who the user
    const { token } = req.params;
    // let's also grab the password??
    const { password } = req.body;

    // const testHashToken = await bcrypt.hash(token, 10)
    // console.log(testHashToken)
    const user = await User.findOne({
      resetPasswordToken: token,
      // the expiry date must exceed the current date to still be valid
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        token: token,
        message: "Invalid or expired reset token",
      });
    }

    const updatedHashedPassword = await bcrypt.hash(password, 10);

    user.password = updatedHashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    await user.save();

    // well I exceeded the limits of the demo of the mailtrap client but I can still test it via the postman just to make sure I can get that working right
    // await sendPasswordResetSuccess(user.email);

    res
      .status(201)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Password reset unsuccessful",
      error: error,
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password"); // gives me all the fields except the password
    if (!user) {
      return res.status(400).json({
        success: false,
        token: token,
        message: "User not found",
      });
    }

    res.status(200).json({ success: true, user }); //user is being returned as part of successful response
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    });
  }
  // one day it is a 400 error and other days it is a server error which is which lol
};
