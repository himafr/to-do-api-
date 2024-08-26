const {promisify}=require('util')
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.registerUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });
  const token = signToken(newUser._id);
  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const { password, email } = req.body;
  //check exist email and password
  if (!password || !email) {
    return next(new AppError("please enter your email and password", 400));
  }
  //check valid email and password
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(new AppError("pls check your email or password", 401));
  }
  //logging in
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  //1) getting token and check out if tis there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("you are not logged in", 401));
  }
  // 2) verification token  
  const decode=await promisify(jwt.verify) (token,process.env.JWT_SECRET)
  //3) check if user still exist
  const freshUser=await User.findById(decode.id);
  if(!freshUser){
    return next(new AppError("user no longer exist", 401));
  }
  //4) check if user changed password after the token was issued
//  if(freshUser.passwordChangedAfter(decode.iat)){
//   return next(new AppError("password has been changed from last time you logged in ",401))
//  }
 // grant  access to protected route 
 req.user=freshUser
  next();
});
