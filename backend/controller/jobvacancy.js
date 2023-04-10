const db = require("../models");
const data = db.jobvacancy;
const { QueryTypes } = require('sequelize');



const vacancyController = {
    insert: async (req, res) => {
        try {
            const {title, location, benefit, description, qualification, work_time} = req.body;

            await data.create({title, location,benefit,work_time,qualification,description});
            return res.status(200).json({
                message: 'data berhasil ditambah'
            })
        } catch (err) {
            console.log(err)
            return res.status(err.statusCode || 500).json({
                message: err.message
            })
        }
    },
    findadminjobs: async (req, res) =>{
        try {

            //bisa ini (model querying)
            // const findAdmin = await data.findAll({attributes:['id','title', 'location','datepost', 'benefit', 'description',
            // 'qualification','work_time','status'], raw: true});
         
            //bisa ini (raw queries)
            const test = await db.sequelize.query('SELECT * FROM jobvacancies', {
               
                type: QueryTypes.SELECT
            });

            return res.status(200).json({
                result: test
            });
        } catch (err) {
            console.log(err);
            return res.status(err.statusCode || 500).json({
                message: err.message
            })
        }
    },
    selectAdminjob: async (req, res) =>{
        try {
            const id = req.params.id
            const findAdmin = await data.findOne({attributes:['id','title', 'location','datepost', 'benefit', 'description',
             'qualification','work_time','status'], where:{id},raw: true});

             return res.status(200).json({
                result: findAdmin
            });
        } catch (err) {
            console.log(err);
            return res.status(err.statusCode || 500).json({
                message: err.message
            })
        }
    },
    updateJob: async (req, res) =>{
        try {
            const {title, location, benefit, description, qualification, work_time, status} = req.body;

            const id = req.params.id
            await data.update({title, location, benefit, description, qualification, work_time, status},
                {
                    where:{
                        id
                    }
                })

                return res.status(200).json({
                    message: `data  job ${title} berhasil diubah`
                })

        } catch (err) {
            console.log(err)
            return res.status(err.statusCode || 500).json({
                message: err.message
            })
        }
    },
    Finduserjob: async (req, res) =>{
        try {
            const findjob = await data.findAll({attributes:['title', 'location','datepost', 'benefit', 'description',
            'qualification','work_time'],
            where:{
                status: 1
         }, raw: true});
            return res.status(200).json({
                result: findjob
            });
        } catch (err) {
            console.log(err);
            return res.status(err.statusCode || 500).json({
                message: err.message
            })
        }
    },
    userjob:async (req, res) =>{
        try {
            const id = req.params.id
            const selectjob = await data.findOne({attributes:['title', 'location','datepost', 'benefit', 'description',
             'qualification','work_time'], where:{id},raw: true});

             return res.status(200).json({
                result: selectjob
            });
        } catch (err) {
            console.log(err);
            return res.status(err.statusCode || 500).json({
                message: err.message
            })
        }
    }   
}

module.exports = vacancyController;