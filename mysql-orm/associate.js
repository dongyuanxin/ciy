const { sequelize } = require('./instance');
const { Classroom } = require('./models/Classroom');
const { Student } = require('./models/Student');
const { Teacher } = require('./models/Teacher');
const { StudentTeacher } = require('./models/StudentTeacher');

studentAndTeacher();

// 1(classroom) - n(student)
async function studentAndClassrooms() {
    await sequelize.authenticate();

    // 默认是在students中创建classroomId外键，现在是创建peopleId 和 classroomId 外键
    // Student.belongsTo(Classroom, {
    //     as: 'people',
    //     // foreignKey: 'peopleId',
    // });
    // Classroom.hasMany(Student);

    // // await sequelize.sync({
    // //     alter: true,
    // // });
    // // 要先创建被关联的表（ClassRoom）
    // await Classroom.sync({ force: true });
    // await Student.sync({ force: true });

    Student.belongsTo(Classroom);
    Classroom.hasMany(Student);

    // await sequelize.sync({
    //     alter: true,
    // });

    console.log('>>> start:');

    // const classroom = await Classroom.create({
    //     name: '数学教室',
    //     age: 100,
    // });
    // await Student.create({
    //     name: 'yuanxin',
    //     age: 23,
    //     more: {},
    //     classroomId: classroom.toJSON().id,
    // });

    const students = await Student.findAll({
        where: {
            name: 'yuanxin',
        },
        include: Classroom,
    });

    console.log(
        '<<< students.JSON is',
        students.map((item) => item.toJSON()),
    );

    await sequelize.close();
}

// m(student) - n(teacher)
async function studentAndTeacher() {
    await sequelize.authenticate();

    Teacher.belongsToMany(Student, { through: StudentTeacher });
    Student.belongsToMany(Teacher, { through: StudentTeacher });

    await sequelize.sync({
        alter: true,
    });

    await sequelize.close();
}
