import {
    ArgumentMetadata,
    Injectable,
    PipeTransform,
    BadRequestException,
} from '@nestjs/common';
import { Schema } from '@hapi/joi';

@Injectable()
export class MyValidationPipe implements PipeTransform {
    constructor(private readonly schema: Schema) {}

    transform(value: any, metadata: ArgumentMetadata) {
        if (metadata.type !== 'body') {
            return value;
        }
        const { error } = this.schema.validate(value);
        if (error) {
            throw new BadRequestException('Validation failed');
        }
        return value;
    }
}
