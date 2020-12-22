const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./../instance');

const Student = sequelize.define(
    'student',
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
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        more: {
            type: DataTypes.JSON,
            allowNull: false,
        },
    },
    {
        tableName: 'students',
        underscored: true,
    },
);

module.exports = {
    Student,
};
