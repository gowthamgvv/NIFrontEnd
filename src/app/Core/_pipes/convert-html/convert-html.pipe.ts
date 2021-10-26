import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertHtml'
})
export class ConvertHtmlPipe implements PipeTransform {

  transform(str: string, ...args) {
    var iconforfile = '';
    var parts = str.split('.');
    var last_part = parts[parts.length - 1];
    if (last_part.toUpperCase() == "PDF") { iconforfile = '../../../assets/images/msg_icons/pdficon.png'; }
    else if (last_part.toUpperCase() == "IRCTC") { iconforfile = '../../../assets/images/msg_icons/pdficon.png'; }
    else if (last_part.toUpperCase() == "XML") { iconforfile = '../../../assets/images/msg_icons/xmlicon.png'; }
    else if (last_part.toUpperCase() == "DOC") { iconforfile = '../../../assets/images/msg_icons/worddocicon.png'; }
    else if (last_part.toUpperCase() == "DOCX") { iconforfile = '../../../assets/images/msg_icons/worddocxicon.png'; }
    else if (last_part.toUpperCase() == "TXT") { iconforfile = '../../../assets/images/msg_icons/txticon.png'; }
    else if (last_part.toUpperCase() == "XLS") { iconforfile = '../../../assets/images/msg_icons/xlsicon.png'; }
    else if (last_part.toUpperCase() == "XLXS") { iconforfile = '../../../assets/images/msg_icons/xlxsicon.jpg' }
     else if (last_part.toUpperCase() == "ODS") { iconforfile = '../../../assets/images/msg_icons/ods_icon.png' }
    return iconforfile;
  }

}
