const express = require("express");
const { Protect } = require("../middleware/auth");
const router = express.Router();
const { create } = require("../controller/signup.controller");
const { login, userProfile, SuperTopupUser,getUserDetails ,userJoinQuery} = require("../controller/login.controller");
const UserProfile = require("../utils/directoryPath");
const multer = require("multer");
var path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UserProfile);
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

const profileUpload = multer({
    storage: storage,
    limits: {
        filesize: 10,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("Please upload an image"));
        }
        cb(undefined, true);
    },
});

router.route("/create").post(create);
router.route("/login").post(login);
router.route("/userProfile").post(Protect, profileUpload.array("student_profile", 3), userProfile);
router.route("/SuperTopupUser").post(SuperTopupUser);
router.route("/getUserDetails").post(getUserDetails);
router.route("/userJoinQuery").get(userJoinQuery);

module.exports = router;
