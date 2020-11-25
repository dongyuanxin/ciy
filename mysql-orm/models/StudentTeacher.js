const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./../instance');
const { Student } = require('./Student');
const { Teacher } = require('./Teacher');

const StudentTeacher = sequelize.define(
    'student_teacher',
    // 列名和属性
    {
        StudentId: {
            type: DataTypes.INTEGER,
            references: {
                model: Student,
                key: 'id',
            },
        },
        TeacherId: {
            type: DataTypes.INTEGER,
            references: {
                model: Teacher,
                key: 'id',
            },
        },
    },
    {
        tableName: 'student_teacher',
        underscored: true,
    },
);

module.exports = {
    StudentTeacher,
};
