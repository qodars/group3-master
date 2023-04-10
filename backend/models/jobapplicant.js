const { DataTypes }= require('sequelize');
const { sequelize } = require('.');

const Jobapplicant = (sequelize) =>{
    return sequelize.define('jobapplicant',{
        apply_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        date_apply:{
            type:DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW
        },
        status_apply:{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        }
    })
}
module.exports = Jobapplicant;