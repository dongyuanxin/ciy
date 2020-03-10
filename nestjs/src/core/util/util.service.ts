import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilService {
    console(msg: string, level?: 'info' | 'warn') {
        if (level === 'warn') {
            console.warn(msg)
        } else {
            console.log(msg)
        }
    }
}
