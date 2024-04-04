const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const studentModel = new mongoose.Schema(
{

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
             'Please fill a valid email address'
            ],

    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters."],
        maxlength: [15, "Password must be at most 6 characters."],
        select: false,
        // match: []
    }

}, 

{timestamps: true})

studentModel.pre("save", function(){

    if(this.isModified("password")){
        return;
    }

    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);

})

studentModel.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

const Student = mongoose.model('Student', studentModel);

module.exports = Student;