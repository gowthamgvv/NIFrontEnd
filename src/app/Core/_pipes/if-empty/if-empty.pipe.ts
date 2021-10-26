import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ifEmpty'
})
export class IfEmptyPipe implements PipeTransform {

  transform(value: string, defaultValue: any,columnName:string) {
    console.log("empty filter")
    if (value === undefined || value === null || value === '' ||value === '0') {
      return defaultValue;
  }

  if(columnName==="msrp")
  value='$ '+value;

    return value.toLowerCase();
  }
}
