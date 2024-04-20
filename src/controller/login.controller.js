const asyncHandler = require('express-async-handler');
const signup = require('../models/Signup.Model');
const UserDetail = require("../models/StudentDetails.Model")
const { verfiyPassword } = require("../middleware/auth");
const path = require('path')
const UserProfile = require("../models/StudentProfile.Model")
const UserImagePath = require("../utils/directoryPath");
const config =require('../../config/db');
const { error } = require('console');
// Load method categories.
const lodash = require('lodash');
const object = require('lodash/fp/object');

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.send({
            statuscode: 400,
            msg: "Pls enter the email and password"
        })
    }

    const UserFind = await signup.findOne({
        email: email
    });

    if (!UserFind) {
        res.send({
            statuscode: 400,
            msg: "Your Email is Wrong"
        })
    } else {
        const token = await UserFind.generateToken();
        UserFind.token = token;
        const verifyPass = await verfiyPassword(password, UserFind.password);
        if (!verifyPass) {
            res.send({
                statuscode: 400,
                msg: "Password is Wrong"
            })
        } else {
            res.send({
                data: UserFind,
                statuscode: 200,
                msg: "Login Successfully"
            })
        }
    }
})

exports.userProfile = asyncHandler(async (req, res) => {
    try {
        const {
            student_name,
            student_age,
            student_dob,
            student_email,
        } = req.body

        const UserModel = new UserDetail({
            student_name,
            student_age,
            student_dob,
            student_email,
            student_id: req.user
        });

        if (req.files) {
            for (const file of req.files) {
                let userProfileModel = new UserProfile({
                    user_id: UserModel._id,
                    profile: file.filename
                });
                await userProfileModel.save()
            }
        }
        const UserSave = await UserModel.save()

        res.send({
            statuscode: 200,
            msg: "Profile Updated",
            data: UserSave
        })
    } catch (error) {
        res.send({
            statuscode: 400,
            msg: error
        })
    }
})

exports.SuperTopupUser = asyncHandler(async (req, res) => {
    try {
        const {
            name,
            dob,
            email,
            phone,
            martial_status,
            gender
        }=req.body;
        const insertQuery ={
            name:name,
            dob:dob,
            email:email,
            phone:phone,
            martial_status:martial_status,
            gender:gender
        }
        const sql_query = "INSERT INTO supertopup_users SET ?";
        await config.query(sql_query, insertQuery,(err,val)=>{
            if(err) throw err;
            insertQuery["id"] = val.insertId;
            res.send({
                insertQuery,
                statuscode: 200,
                msg: "Success"
            });
        });
    } catch (err) {
        res.send(err)
    }
})

exports.getUserDetails = asyncHandler(async(req,res)=>{
    try{    
        const {id} = req.body;
        let fetchquery;
        if(id){
             fetchquery = "SELECT * FROM supertopup_users WHERE id=?";
        }else {
             fetchquery = "SELECT * FROM supertopup_users"; 
        }
        await config.query(fetchquery,id,(err, results)=>{
            if(err) throw err;
            res.send({
                statuscode: 200,                    
                data: results
            })
        })
    }catch(err){
        res.send(err);
    }
});

exports.userJoinQuery = asyncHandler(async(req,res)=>{
    try{  
        res.send({
            status: 200,
            success:true,
            data:[{
                name:"Apzal"
            }]
        })

    }catch(err){
        res.send(err);
    }
})






