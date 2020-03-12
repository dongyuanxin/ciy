import Joi = require('@hapi/joi');

// ts支持 export = 导出，要使用 import - require
// 对于commonjs和amd的规范也要使用 import - require
// https://www.typescriptlang.org/docs/handbook/modules.html#export--and-import--require

export const DogSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number()
        .min(1)
        .max(10)
        .required(),
}).strict();

export interface Dog {
    name: string;
    age: number;
}
