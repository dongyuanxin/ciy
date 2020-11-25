const { sequelize } = require('./instance');
const { User } = require('./models/User');

main();

async function insertUser() {
    await sequelize.authenticate();
    // 单独同步模型
    // User.sync()
    // 一次性同步所有模型
    await sequelize.sync();

    // 创建实例
    const user = User.build({
        firstName: 'yuanxin',
        lastName: 'dong',
    });
    // 拿到的是不带有 time 的对象
    console.log(user.toJSON());
    // 保存实例
    await user.save();
    // 拿到的是带有 time 的全部对象
    console.log(user.toJSON());

    // create = build + save
    const user2 = await User.create({
        firstName: 'yuanxin2',
        lastName: 'dong',
    });
    // 打印具体的值和属性
    console.log(user2.toJSON());

    await sequelize.close();
}
