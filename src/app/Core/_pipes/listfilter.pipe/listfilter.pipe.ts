import { Pipe, PipeTransform } from '@angular/core';
import { ListItem } from "../../../Core/_models/list-item.domain";

@Pipe({
  name: 'listfilter'
})
export class ListfilterPipe implements PipeTransform {

  transform(list: ListItem[], filterText: string, fromPage: string): any {
    if(filterText == '') return list;
    if(!list) return list;
    return list ? list.filter((item:any) => item.value.MIT_NAME.search(new RegExp(filterText, 'i')) > -1) : [];
  }

}
