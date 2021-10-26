import { IfEmptyPipe } from './if-empty/if-empty.pipe';
import { AlphaFilterPipe } from './alpha-filter/alpha-filter.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListfilterPipe} from '../../Core/_pipes/listfilter.pipe/listfilter.pipe';
import { UtcPipe } from '../../Core/_pipes/utc/utc.pipe';
import { SafeHtmlPipe } from '../../Core/_pipes/safe-html/safe-html.pipe';
import { UnicodeconvertPipe } from '../../Core/_pipes/unicodeconvert/unicodeconvert.pipe';
import { ChatlistunicodePipe } from '../../Core/_pipes/chatlistunicode/chatlistunicode.pipe';
import { ConvertHtmlPipe } from '../../Core/_pipes/convert-html/convert-html.pipe';
import { ConvertLeftsidetextHtmlPipe } from '../../Core/_pipes/convert-leftsidetext-html/convert-leftsidetext-html.pipe';
import { TimeconvertionPipe } from '../../Core/_pipes/timeconvertion/timeconvertion.pipe';
import { UtcConvertPipe } from '../../Core/_pipes/utcConvert/utc-convert.pipe';

@NgModule({
  declarations: [IfEmptyPipe,AlphaFilterPipe, ListfilterPipe, UtcPipe, SafeHtmlPipe, UnicodeconvertPipe, ChatlistunicodePipe, ConvertHtmlPipe, ConvertLeftsidetextHtmlPipe, TimeconvertionPipe, UtcConvertPipe],
  imports: [
    CommonModule
  ],
  exports:[IfEmptyPipe,AlphaFilterPipe, ListfilterPipe, UtcPipe, SafeHtmlPipe, UnicodeconvertPipe, ChatlistunicodePipe, ConvertHtmlPipe, ConvertLeftsidetextHtmlPipe, TimeconvertionPipe, UtcConvertPipe]
})
export class PipesModule { }


 