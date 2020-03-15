import {
    plainToClass,
    classToClass,
    classToPlain,
    serialize,
} from 'class-transformer';
// class-transformer:
// 本身用于json对象和es6 class对象之间的转换

interface UserInterface {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
}

const users: UserInterface[] = [
    {
        id: 1,
        firstName: 'Johny',
        lastName: 'Cage',
        age: 27,
    },
    {
        id: 2,
        firstName: 'Ismoil',
        lastName: 'Somoni',
        age: 50,
    },
    {
        id: 3,
        firstName: 'Luke',
        lastName: 'Dacascos',
        age: 12,
    },
];

class User {
    id: number;
    firstName: string;
    lastName: string;
    age: number;

    constructor(user: UserInterface) {
        Object.assign(this, user);
    }

    getName() {
        return this.firstName + ' ' + this.lastName;
    }

    isAdult() {
        return this.age > 36 && this.age < 60;
    }
}

const realUsers = plainToClass(User, users);
console.log(realUsers);

const user = new User({
    id: 4,
    firstName: 'yuanxin',
    lastName: 'dong',
    age: 22,
});
const realPlain = classToPlain(user);
console.log(realPlain);

console.log(
    serialize(
        Object.assign(user, {
            friendIds: [1, 2, 3],
        }),
    ),
);
