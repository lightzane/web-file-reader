import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shouldBeShortened'
})
export class ShouldBeShortenedPipe implements PipeTransform {

  transform(value: string, limit: number = 300): string {

    if (!value) return null;

    if (this.shouldBeShortened(value, limit)) {
      let l = limit;

      // l = value.substring(0, limit).lastIndexOf(' ');

      return `${value.substring(0, l)}...`;
    }

    return value;
  }

  private shouldBeShortened(content: string, limit: number): boolean {
    if (content.length > limit) {
      return true;
    } else return false;
  }

}
