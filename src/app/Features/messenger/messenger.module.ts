import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessengerRoutingModule } from './messenger-routing.module';
import { MessengerComponent } from './messenger.component';
import { FeaturesModule } from '../Features.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule} from '../../Core/_pipes/pipes.module';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ChatgroupinfoComponent } from '../../Partials/chatgroupinfo/chatgroupinfo/chatgroupinfo.component';
import { ChatpersoninfoComponent } from '../../Partials/chatpersoninfo/chatpersoninfo.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [MessengerComponent, ChatgroupinfoComponent, ChatpersoninfoComponent],
  imports: [
    CommonModule,
    MessengerRoutingModule,
    FeaturesModule,FormsModule,ReactiveFormsModule,
    PipesModule,PickerModule,SlickCarouselModule, ImageCropperModule
  ],
  providers:[NgbActiveModal],
  exports:[ChatgroupinfoComponent, ChatpersoninfoComponent]
})
export class MessengerModule { }
