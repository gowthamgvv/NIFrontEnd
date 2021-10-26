import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertLeftsidetextHtml'
})
export class ConvertLeftsidetextHtmlPipe implements PipeTransform {

  transform(str: string, ...args) {
    var iconforImage = '';
    if (str.toUpperCase() == "I") { iconforImage = '<img src="../../../assets/images/msg_icons/photo.png" width=16px;/>'; }
    else if (str.toUpperCase() == "F") { iconforImage = '<img src="../../../assets/images/msg_icons/document.png" width=16px;/>'; }
    else if (str.toUpperCase() == "A") { iconforImage = '<img src="../../../assets/images/msg_icons/audio.png" width=16px;/>'; }
    else if (str.toUpperCase() == "V") { iconforImage = '<img src="../../../assets/images/msg_icons/video.png" width=16px;/>'; }
    return iconforImage;
  }

}
