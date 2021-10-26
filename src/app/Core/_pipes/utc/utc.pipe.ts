import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ 
  name: 'utc' 
})
export class UtcPipe implements PipeTransform {

  data: any = '';
  type:any='';
  transform(date: any, type: any): any {
    return this.convertUTCDateToLocalDate(date,type);   
  }

  hrs:any;
 displayMonthVal:any;
 displayDateVal:any;
 minutesval:any;
convertUTCDateToLocalDate(date1, type) {
    let hrs:any;
    let newDate = new Date();
    let CurrentDate = new Date();
    let ary = date1.split("T"), ary2 = ary[0].split("-"), ary1 = ary[1].split(":");
    newDate.setUTCHours(parseInt(ary1[0])), newDate.setUTCMinutes(ary1[1]), newDate.setUTCFullYear(ary2[0]), newDate.setUTCMonth(Number(ary2[1]) - 1), newDate.setUTCDate(ary2[2]);
    let dateval = newDate.getDate(), monthval = newDate.getMonth(), yearval = newDate.getFullYear(), hoursval = newDate.getHours();
     this.minutesval = newDate.getMinutes();
    let Curdateval = CurrentDate.getDate(), Curmonthval = CurrentDate.getMonth(), CurYear = CurrentDate.getFullYear();
      hrs = hoursval,  this.displayMonthVal ='',  this.displayDateVal = '';

    let weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let AMPM = hoursval >= 12 ? 'PM' : 'AM';
    hrs = hrs % 12;
    hrs = hrs ? hrs : 12;
    if (hrs < 10) {
        this.hrs = "0" + hrs;
    }

    if ((Number(monthval) + 1) <= 9)
        this.displayMonthVal = "0" + (Number(monthval) + 1);
    else this.displayMonthVal = (Number(monthval) + 1);

    if (dateval <= 9)
        this.displayDateVal = '0' + dateval;
    else
        this.displayDateVal = dateval;
	
	 if (this.minutesval <= 9)
        this.minutesval = "0"+ this.minutesval;
    else
        this.minutesval = this.minutesval;

    let hrsformat = hrs + ':' + this.minutesval + ' ' + AMPM;

    if (Curdateval == dateval && Curmonthval == monthval && CurYear == yearval) {
        return  hrsformat;
    }
    else if (CurYear == yearval && Curmonthval == monthval && dateval < Curdateval) {
        let datediff = Number(Curdateval) - Number(dateval);
        if (datediff <= 7) {
            if (datediff == 1) {
                if (type == "L")
                    return "Yesterday"
                else
                    return "Yesterday" + ' @ ' + hrsformat;
            }
            else if (datediff != 1 && datediff <= 7) {
                if (type == "L")
                    return weekday[newDate.getDay()]
                else
                    return weekday[newDate.getDay()] + ' @ ' + hrsformat;
            }
        }
        else {
            if (type == "L")
                return this.displayMonthVal + '.' + this.displayDateVal + '.' + yearval.toString().substr(2, 4);
            else
                return this.displayMonthVal + '.' + this.displayDateVal + '.' + yearval.toString().substr(2, 4) + ' @ ' + hrsformat;
        }
    }
    else {
        if (type == "L")
            return this.displayMonthVal + '.' + this.displayDateVal + '.' + yearval.toString().substr(2, 4);
        else
            return this.displayMonthVal + '.' + this.displayDateVal + '.' + yearval.toString().substr(2, 4) + ' @ ' + hrsformat;
    }
}


}
