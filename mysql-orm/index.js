const { sequelize } = require('./instance')
const { User } = require('./models/User')
const { Op } = require('sequelize')

bulkCreateUsers();

async function insertUser() {
    await sequelize.authenticate();
    // 单独同步模型
    // User.sync()
    // 一次性同步所有模型
    await sequelize.sync();

    // 创建实例
    const user = User.build({
        firstName: 'yuanxin',
        lastName: 'dong'
    })
    // 拿到的是不带有 time 的对象
    console.log(user.toJSON())
    // 保存实例
    await user.save();
    // 拿到的是带有 time 的全部对象
    console.log(user.toJSON())

    // create = build + save
    const user2 = await User.create({
        firstName: 'yuanxin2',
        lastName: 'dong'
    })
    // 打印具体的值和属性
    console.log(user2.toJSON())

    await sequelize.close()
}

async function findAndCountUsers() {
    const { count, rows } = await User.findAndCountAll({
        where: {
            firstName: 'yuanxin'
        }
    })

    console.log('>>> rows are', rows.map(row => row.toJSON()))
    console.log('>>> count is', count)
}

async function findUsersWithWhere() {
    const { count, rows } = await User.findAndCountAll({
        where: {
            firstName: {
                [Op.eq]: 'yuanxin'
            },
            lastName: 'dong'
        }
    })

    console.log('>>> rows are', rows.map(row => row.toJSON()))
    console.log('>>> count is', count)
}

async function findUsersWithWhereOr() {
    const { count, rows } = await User.findAndCountAll({
        where: {
            [Op.or]: [
                {
                    firstName: 'yuanxin'
                },
                {
                    firstName: 'yuanxin2'
                }
            ]
        }
    })

    console.log('>>> rows are', rows.map(row => row.toJSON()))
    console.log('>>> count is', count)
}

async function updateUser() {
    const res = await User.update(
        {
            firstName: 'yuanxin3'
        },
        {
            where: {
                firstName: 'yuanxin2'
            }
        }
    )

    console.log('>>> res is', res)
}

async function destroyUser() {
    const res = await User.destroy({
        where: {
            id: 7
        }
    })
    console.log('>>> res is', res)
}

async function bulkCreateUsers() {
    await sequelize.sync({
        alter: true
    });
    await User.bulkCreate(
        [
            {
                firstName: 'runyu',
                lastName: 'wang',
                password: '123456'
            },
            {
                firstName: 'yuxin',
                lastName: 'guo',
                password: 'fsifjsio'
            },
        ],
        {
            validate: true, // 强行约束类型，有问题会报错
            fields: ['firstName', 'lastName'] // 只有fileds中的字段会被使用，主要用于直接写入前端用户的数据
        }
    )

    const users = await User.findAll()

    console.log('>>> users are', users.map(user => user.toJSON()))
}