import { HttpException, HttpStatus } from '@nestjs/common'

export class ForbiddenException extends HttpException{
    constructor(msg: string = 'Forbidden') {
        super(msg, HttpStatus.FORBIDDEN)
    }
}