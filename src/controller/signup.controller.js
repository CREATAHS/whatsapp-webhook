const asyncHandler = require("express-async-handler");
const User_Signup = require("../models/Signup.Model");
const { generateHashPassword,verification_code } = require("../middleware/auth");
const sendMail = require("../utils/mailHelper")

exports.create = asyncHandler(async (req, res, next) => {
    try {
        const { first_name, last_name, email, password, mobile_no } = req.body;
        if (!email || !password) {
            res.send({
                statuscode: 400,
                msg: "Pls provide email and password",
            });
        }
        const ValidateUser = await User_Signup.findOne({
            email: email,
        });

        // generate verification code
        const VerificationCode = await verification_code(email);

        if (!ValidateUser) {
            const hashPassword = await generateHashPassword(password);
            const UserModel = new User_Signup({
                first_name,
                last_name,
                email,
                password: hashPassword,
                mobile_no,
                account_verification:VerificationCode
            });
            // generate token
            await UserModel.generateToken();
            sendMail()
            const SaveUser = await UserModel.save();
            res.send({
                data: SaveUser,
                statuscode: 200,
                msg: "Register Successfully",
            });
        } else {
            res.send({
                msg: "Already Registered"
            })
        }
    } catch (err) {
        res.send(err)
    }
});
