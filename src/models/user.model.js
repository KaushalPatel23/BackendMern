import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Enter user name"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true, // use for add into database serching to easy find
    },
    email: {
      type: String,
      required: [true, "Enter user email"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: [true, "Enter user fullname"],
      index: true, // use for add into database serching to easy find
    },
    avatar: {
      type: String, // url cloudnary
      required: [true, "Enter user name"],
    },
    coverImage: {
      type: String, // url cloudnary
    },
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Enter Password"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add hook to encrypt password before store the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 10);
  next();
});

//Now add method to check the password enter by user are match with database password or not
userSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//CREATE JWT TOKEN
userSchema.methods.generateAccessToken = async function () {
  return await jwt.sign({
    _id : this._id,
    email : this.email,
    username : this.username,
    fullName : this.fullName
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn : ACCESS_TOKEN_EXPIRY
  }

)
}
userSchema.methods.generateRefreshToken = async function () {
  return await jwt.sign({
    _id : this._id,
  },
  process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn :REFRESH_TOKEN_EXPIRY
  }

)
}

export const User = mongoose.model("User", userSchema);
