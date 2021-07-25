const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./../instance')
const crypto = require('crypto')

// 方法1 
const User = sequelize.define(
    // 数据表名称：users
    'User',
    // 列名和属性
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                maxStrLen(value) {
                    if (
                        typeof value !== 'string'
                    ) {
                        throw new TypeError('尤文图')
                    }
                }
            }
        },
        lastName: {
            type: DataTypes.STRING
        },
        fullName: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.firstName} ${this.lastName}`
            },
            set(value) {
                throw new Error('不要尝试设置 `fullName` 的值!');
            }
        },
        password: {
            type: DataTypes.STRING,
            set(value) {
                const hash = crypto.createHash('sha256')
                hash.update(value)
                this.setDataValue('password', hash.digest('hex'))
            }
        }
    },
    // 其它模型参数
    {
        // 直接告诉表名：默认使用  inflection.js 库生成
        // tableName: 'users'
        // 模块范围内的验证
        // validate: {
        //     bothCoordsOrNone() {
        //         if ((this.latitude === null) !== (this.longitude === null)) {
        //             throw new Error('Either both latitude and longitude, or neither!');
        //         }
        //     }
        // }
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
