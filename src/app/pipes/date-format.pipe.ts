import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: Date): string {
    if (!value) {
      return '';
    }
    const date = new Date(value);
    const day = date.getDate().toString().padStart(2, '0'); // Día con dos dígitos
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mes con dos dígitos
    const year = date.getFullYear().toString(); // Año de dos dígitos

    return `${day}-${month}-${year}`;
  }

}
