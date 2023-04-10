const db = require("../models");
const User = db.user;

//import

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const loginOpsi = require("sequelize");
const transporter = require('../middleware/emailer');
const AuthController = {
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body;

            //cekusername
            const isUSername = await User.findOne({
                where: { username }
            });
            if (isUSername) {
                return res.status(409).json({
                    message: "username already exist"
                });
            }
            //cekemail
            const isEmailExist = await User.findOne({
                where: { email }
            });
            if (isEmailExist) {
                return res.status(409).json({
                    message: "email already exist"
                });
            }
            // const emailSend = email;
                          //emailer
                          let mail = {
                            from:`Admin <group3nodejs@gmail.com`,
                            to: `${email}`,
                            subject: `Email callback`,
                            html:'<h1> Terima Kasih sudah melakukan pendaftaran</h1>'
                        }
            
                        transporter.sendMail(mail,(errMail, resMail) =>{
                            if (errMail) {
                                console.log(errMail)
                            }
                        })
           
            if (password.length < 8) {
                return res.status(400).json({
                  message: "Minimal 8 karakter"
                });
              }

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);

            await User.create({username, email, password: hashPassword});

            return res.status(200).json({
                message: "register success check email"
            });
            
            
        } catch (err){
            console.log(err);
            return res.status(err.statusCode || 500).json({
                message: err.message
            })
        }
    },
    login: async (req, res) => {
        try {
            const { username="", email="", password } = req.body;

            const checkData = await User.findOne({ where:{[loginOpsi.Op.or]:[ { email }, { username }] }});
            if (!checkData) {
                return res.status(409).json({
                    message: "no user found"
                })
            }

            const checkPassword = await bcrypt.compare(password, checkData.password);
            if (!checkPassword) {
                return res.status(409).json({
                    message: "password is incorrect"
                })
            }

            let payload = { id: checkData.id, isAdmin: checkData.isAdmin };
            const token = jwt.sign(payload, 'rinaldy97', {expiresIn: '3h'})

            return res.status(200).json({
                token,
                message: "success"
            })
        } catch (err) {
            console.log(err)
            return res.status(err.statusCode || 500).json({
                message: err.message
            })
        }
    },
    findAllUser: async (req, res) => {
        try {
            const users = await User.findAll({ raw: true});

            return res.status(200).json({
                result: users
            })
        } catch (err) {
            console.log(err);
            return res.status(err.statusCode || 500).json({
                message: err.message
            })
        }
    }
}
module.exports = AuthController;