import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
    getSecond(): number {
        return Math.floor(Date.now())
    }
}
