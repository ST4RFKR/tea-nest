import { Injectable, type PipeTransform } from '@nestjs/common';

@Injectable()
export class StringToLowerCasePipe implements PipeTransform {
  transform(value: string): string {
    if (typeof value === 'string') {
      return value.toLowerCase();
    }
    return value;
  }
}
