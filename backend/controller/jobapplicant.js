const db = require("../models");
const User = db.user;
const Jobvacancy = db.jobvacancy;
const Jobapplicant = db.jobapplicant;

const applyController ={
    applyjob: async (req, res) =>{
        try{
        const userId = req.user.id;
        const jobvacancyId = req.params.id

        await Jobapplicant.create({userId, jobvacancyId});
        
        return res.status(200).json({
            message: `Terimakasih sudah mengirim lamaran anda`
        })
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({
            message: err.message
        })
    }
    }
}
module.exports = applyController;