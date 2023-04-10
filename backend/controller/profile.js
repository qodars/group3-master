const db = require("../models");
const Profile = db.profile;
const User = db.user;

const profileController = {
    insert: async (req, res) =>{
        try {
            const { first_name, last_name, no_handphone, brthday, graduates,
                skill, skill2, work_experience} = req.body;

               
                const isMatch = await Profile.findOne({
                    where: { userId: req.user.id }
                });
                if (isMatch) {
                    return res.status(409).json({
                        message: "Data profile sudah dibuat"
                    });
                }

                await Profile.create({first_name, last_name, no_handphone, brthday, graduates,
                    skill, skill2, work_experience, userId: req.user.id});

                return res.status(200).json({
                    message:'Data Profile berhasil dibuat'
                })
        } catch (err) {
            console.log(err);
            return res.status(err.statusCode || 500).json({
                message: err.message
            })
        }
    },
    update: async (req, res) =>{
        try {
            const { first_name, last_name, no_handphone, brthday, graduates,
                skill, skill2, work_experience} = req.body;

                await Profile.update({first_name, last_name, no_handphone, brthday, graduates,
                    skill, skill2, work_experience},
                    {
                        where:{
                            userId: req.user.id
                        }
                    })
                    return res.status(200).json({
                        message:'Data Profile berhasil diubah'
                    })
        } catch (err) {
            console.log(err);
            return res.status(err.statusCode || 500).json({
                message: err.message
            })
        }
    }
}

module.exports = profileController;