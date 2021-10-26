import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'timeconvertion'
})
export class TimeconvertionPipe implements PipeTransform {

  transform(value: any, ...args) {
    return this.TimeConvertions(value)
  }

  TimeConvertions(DateTime) {
    let utcDate :any = moment.utc(DateTime);
    let monthno = ["01", "02", "03", "04", "05", "06",
      "07", "08", "09", "10", "11", "12"];
    let monthname = monthno[utcDate.month()];
    let hrs = utcDate.local().format('hh');
    let date = new Date(utcDate);
    let DD = date.getHours();
    let AMPM = DD >= 12 ? 'PM' : 'AM';
    hrs = hrs % 12;
    hrs = hrs ? hrs : 12;
    if (hrs < 10) {
        hrs = "0" + hrs;
    }
    let dateWithTimezone = monthname + '.' + utcDate.local().format('DD.YY') + ' @ ' + hrs + utcDate.local().format(':mm') + ' ' + AMPM;
    return dateWithTimezone;
}

}
