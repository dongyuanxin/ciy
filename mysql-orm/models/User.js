const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./../instance')

// 方法1 
const User = sequelize.define(
    // 数据表名称：users
    'User',
    // 列名和属性
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING
        }
    },
    // 其它模型参数
    {
        // 直接告诉表名：默认使用  inflection.js 库生成
        // tableName: 'users'
    }
)
// console.log(User === sequelize.models.User); // true

module.exports = {
    User
}

// class User extends Model { }

// User.init(
//     // 列名和属性
//     {
//         firstName: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         lastName: {
//             type: DataTypes.STRING
//         }
//     },
//     // 其它模型参数
//     {
//         // 这是其他模型参数
//         sequelize, // 我们需要传递连接实例
//         modelName: 'User' // 我们需要选择模型名称
//     }
// )
