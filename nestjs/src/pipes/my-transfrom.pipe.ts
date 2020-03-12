import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class MyTransfromPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (metadata.type === 'body') {
            value.age = parseInt(value.age, 10);
        }
        return value;
    }
}
