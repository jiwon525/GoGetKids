const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    firtstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    phoneNum: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true },
    company_name: { type: String, required: false },
    school_name: { type: String, required: false }

});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this.id }, process.env.JWTPRIVATEKEY, { expiresIn: "7d" });
    return token
};

const User = mongoose.model("user", userSchema)

const validate = (data) => {
    const schema = Joi.object({
        firtstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        password: passwordComplexity.required().label("Password"),
        phoneNum: Joi.string().required().label("Phone Number"),
        role: Joi.string().required().label("User Role"),
        email: Joi.string().email().required().label("Email"),
        company_name: Joi.string().label("Company Name"),
        school_name: Joi.string().label("School Name")
    });
    return schema.validate(data)
};

module.exports = { User, validate };