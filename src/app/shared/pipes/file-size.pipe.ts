import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {

  transform(value: string | number, decimal: number = 0): string {

    const suffixes = ['kb', 'mb'];

    if (isNaN(+value)) return null;
    if (value < 1000 && value > 0) return '1 kb';

    const quoOfExp = Math.floor(Math.log(+value) / Math.log(1000));
    const newValue = (+value / Math.pow(1000, quoOfExp)).toFixed(decimal) + ' ' + suffixes[quoOfExp - 1];

    return newValue;
  }

}
