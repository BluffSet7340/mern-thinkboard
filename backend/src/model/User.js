// gotta add the schema for the new user
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // You can add more fields if needed
  name: {
    type: String,
    required: true,
  },
  // this is to check if the user has been verified or not son
  isVerified: {
    type: Boolean,
    default: false
  },
  resetPasswordToken: String,
  resetPasswordExpiresAt: Date,
  verificationToken: String,
  verificationTokenExpiresAt: Date,
});

// // Hash password before saving
// // so before the password is saved into the mongodb database, it is first hashed 
// // and then saved into the collections
// userSchema.pre("save", async function(next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

export default mongoose.model("User", userSchema);