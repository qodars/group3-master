const { DataTypes } = require('sequelize');
const { sequelize } = require('.');

const Profile = (sequelize) => {
    return sequelize.define("profile", {
        id_profile:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        first_name:{
            type: DataTypes.STRING,
        },
        last_name:{
            type: DataTypes.STRING,
        },
        no_handphone:{
            type: DataTypes.STRING
        },
        brthday:{
            type: DataTypes.DATEONLY
        },
        graduates:{
            type: DataTypes.STRING
        },
        skill:{
            type: DataTypes.INTEGER
        },
        skill2:{
            type: DataTypes.INTEGER
        },
        work_experience:{
            type: DataTypes.STRING
        }
    })
}

module.exports = Profile ;