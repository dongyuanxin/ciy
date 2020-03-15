import { Exclude, classToPlain, Transform, Expose } from 'class-transformer';
// class-transformer 这里配合 @exclue()、@transform()、Expose()
//  配合nestjs中的 @UseInterceptors(ClassSerializerInterceptor) 可以在切面为数据操作提供干净的抽象
//  nest/common中提供的 ClassSerializerInterceptor，本质上就是 classToPlain，为函数添加了返回数据处理的额外逻辑
//  可以看下面的例子

interface RoleEntity {
    group: string;
    name: string;
    gid: number;
}

class User {
    @Exclude() id: number; // 不想对外返回id

    firstName: string;

    lastName: string;

    age: number;

    @Transform(role => role.name) // 只想对外返回name
    role: RoleEntity;

    constructor(user: Object) {
        Object.assign(this, user);
    }

    @Expose() // 可用于getter和普通方法
    get name() {
        return this.firstName + ' ' + this.lastName;
    }

    @Expose()
    getFullName() {
        return this.firstName + ' ' + this.lastName;
    }
}

const user = new User({
    id: 4,
    firstName: 'yuanxin',
    lastName: 'dong',
    age: 22,
    role: {
        group: 'root',
        name: 'yuanxin-dong',
        gid: 1,
    },
});
console.log(user);
const realPlain = classToPlain(user);
console.log(realPlain);

// output:
// {
//     firstName: 'yuanxin',
//     lastName: 'dong',
//     age: 22,
//     role: 'yuanxin-dong',
//     name: 'yuanxin dong',
//     getFullName: 'yuanxin dong'
// }
