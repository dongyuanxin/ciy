import { createParamDecorator, HttpException } from '@nestjs/common';
import { Request } from 'express';
import {
    UserInfoInterface,
    ReqWithUser,
} from 'src/middlewares/info.middleware';

// https://medium.com/@liutingchun_95744/nestjs-creating-custom-parameter-decorators-for-your-apis-with-createparamdecorator-5af2a1efbb54

export const Jwt = (
    key,
    options: { isNullable?: boolean } = {},
): ParameterDecorator => {
    let validators = [];
    if (!options.isNullable) {
        validators.push(v => {
            if (!v) {
                throw new HttpException(
                    {
                        statusCode: 401,
                        error: 'Unauthorized',
                        message: 'Cannot find a valid JWT token',
                    },
                    401,
                );
            }
        });
    }

    return createParamDecorator((data, req) => {})();
};
