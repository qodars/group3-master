const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

const Jobvacancy = (sequelize) => {
    return sequelize.define('jobvacancy',{
        title:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        location:{
            type: DataTypes.STRING,
            allowNull: false
        },
        datepost:{
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW
        },
        benefit:{
            type: DataTypes.STRING
        },
        description:{
            type: DataTypes.TEXT
        },
        qualification:{
            type: DataTypes.TEXT
        },
        work_time:{
            type: DataTypes.INTEGER
        },
        status:{
            type:DataTypes.BOOLEAN,
            defaultValue: true
        }
    })
}
module.exports = Jobvacancy;