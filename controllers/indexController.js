const { catchasyncerrors } = require("../middlewares/catchasyncerrors");

const Student = require("../models/studentModel");
const errorHandeler = require("../utils/errorHandeler");

exports.homepage = catchasyncerrors(async (req, res, next)=>{
    res.json({ message: "homepage" });  
  })


exports.studentsignup = catchasyncerrors(async (req, res, next)=>{
   const student = await new Student(req.body).save();
   res.status(201).json(student);
  })

exports.studentsignin = catchasyncerrors(async (req, res, next)=>{
   const student = await Student.findOne({ email: req.body.email }).select("+password").exec();
   if(!student) return 
          next(new errorHandeler("User not found with this email address",404));

   const isMatch = await student.comparePassword(req.body.password);
   if(!isMatch) return next(new errorHandeler("Invalid Password",401));

   res.json(student)
  })

exports.studentsignout = catchasyncerrors(async (req, res, next)=>{
 
  })