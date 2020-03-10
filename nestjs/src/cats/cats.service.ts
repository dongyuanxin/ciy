import { Injectable } from '@nestjs/common';
import { Cat } from './cats.interface';

// 由 @Injectable() 装饰的类可以视作 Provider(服务提供者)
// 它的作用有：
//  1. services 详细的业务逻辑
//  2. Factory 用来创建提供者
//  3. db 数据库读写
//  4. 其他工具函数

// 借助Provider，可以更详细的按层封装业务逻辑
// 比如数据层看作一个module，里面provider全部用来封装数据相关
// 比如业务层看作一个provider，和controller放在统级位置

@Injectable() // provider是「可被依赖注入」的，统一由nestjs容器管理
export class CatsService {
    private readonly cats: Cat[] = [];

    create(cat: Cat): Promise<boolean> {
        return new Promise(resolve => {
            setTimeout(() => {
                this.cats.push(cat)
                resolve(true)
            }, 50)
        })
    }

    findAll(): Promise<Cat[]> {
        return new Promise(resolve => {
            resolve(this.cats)
        })
    }
}
