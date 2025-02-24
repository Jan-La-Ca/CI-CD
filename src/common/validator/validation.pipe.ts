/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';




@Injectable()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class ValidationPipe implements PipeTransform{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async transform(value: any, {metatype}: ArgumentMetadata) {
      if (!metatype || !this.toValidate(metatype)) {
        return value;
      }
        const object = plainToInstance(metatype, value);
        const errors = await validate(object);
         
         if (errors.length > 0) {
          const dataErrors  = errors.map(item => {
            return {
              property: item.property,
              value: item.value ?? null,
              constraints: item.constraints,
            }
          })
          throw new BadRequestException(dataErrors)
         } 
         return value;
    }
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private toValidate(metatype: any): boolean {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
        const types = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
      }
}