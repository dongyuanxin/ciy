const Joi = require('@hapi/joi');

const schema = Joi.object({
    age: Joi.number()
        .min(3)
        .max(30)
        .required(),
}).strict();

const { error, value } = schema.validate({ age: '4' });
console.log(error, value);
// -> { value: { username: 'abc', birth_year: 1994 } }

schema.validate({});
// -> { value: {}, error: '"username" is required' }
