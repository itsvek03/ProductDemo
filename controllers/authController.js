const db = require('../models/index')
const helper = require('../utils/index.js')
const { promisify } = require("util");
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })



exports.SignUp = async (req, res, next) => {
    try {
        const { name, email, password, roles } = req.body;
        console.log("BODY", req.body)
        const hash = await helper.hashPassword(password)
        console.log("Password", hash)

        const user = await db.User.create({ name, email, password: hash, roles })
        console.log("user", user)
        const token = helper.createToken(user)

        return res.status(201).send({ token, user })
    } catch (err) {
        res.status(400).json({
            message: 'Failed'
        })
    }

}

exports.Login = async (req, res, next) => {
    try {


        const { email, password } = req.body;
        if (!email && !password) {
            return res.status(400).json({
                message: "Enter the password and email"
            })
        }
        const useremail = await db.User.findOne({ where: { email } })
        if (!useremail) {
            return res.status(400).json({
                message: "Email not exists"
            })
        }
        if (!(await helper.comparePassword(password, useremail.dataValues.password))) {
            return res.status(400).json({
                message: "Password is incorrect"
            })
        }
        const token = helper.createToken(useremail)
        console.log("USER LOGIN", useremail)
        console.log("SERVING FROM THE SQL AND STORING INTO THE CACHE")


        return res.status(200).send({
            status: "Login Successfully",
            token: token,
            useremail
        })

    } catch (e) {
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}

exports.protectTo = async (req, res, next) => {
    try {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            return res.status(400).json({
                message: "Please Login First"
            })
        }
        let decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRETKEY);
        console.log("DECODED", decoded)
        const freshUser = await db.User.findByPk(decoded.id);
        console.log("Full Data User", freshUser)
        console.log("Fresh User", freshUser.dataValues.id)
        if (!freshUser) {
            return res.status(400).json({
                message: "User is not present"
            })
        }
        req.user = freshUser.dataValues;
        console.log('USER REQ', req.user)
        next();

    } catch (err) {
        res.status(500).json({
            message: "Something went Wrong",
            err: err
        })
    }
}


exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.roles)) {
            console.log("ROLE", req.user.roles)
            return res.status(404).json({
                status: "Fail",
                message: "You do not have permission",
            });
        }
        next();
    };
}