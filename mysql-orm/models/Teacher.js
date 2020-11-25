const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./../instance');

const Teacher = sequelize.define(
    'teacher',
    // 列名和属性
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        course: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'teachers',
        underscored: true,
    },
);

module.exports = {
    Teacher,
};
