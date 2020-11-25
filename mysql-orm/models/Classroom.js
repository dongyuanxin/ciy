const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./../instance');

const Classroom = sequelize.define(
    'classrooms',
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
    },
    {
        tableName: 'classrooms',
        underscored: true,
    },
);

module.exports = {
    Classroom,
};
