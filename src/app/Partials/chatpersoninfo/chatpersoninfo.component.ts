import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chatpersoninfo',
  templateUrl: './chatpersoninfo.component.html',
  styleUrls: ['./chatpersoninfo.component.scss']
})
export class ChatpersoninfoComponent implements OnInit {
  @Input('GetReceiverStorInfo') ReceiverStorInfo:any=[];
  personimages:any;
  persontype:any;
  ent_personinfo={"slidesToShow": 2, "slidesToScroll": 1,  
 'infinite': true, 
 'arrows': true,
 'dots': false,
 'rows':1
  };
  ngbmodalActive: any;
  constructor(private ngbmodal: NgbModal) { }

  ngOnInit(): void {
  }

  openperimg(tmp,type,img){
    this.personimages="";
    this.persontype="";
    this.ngbmodalActive=this.ngbmodal.open(tmp​​​​​​​​);
    this.persontype=type;
    this.personimages=img;
  }
  onpersoncloseimg(){
    this.personimages="";
    this.persontype="";
    this.ngbmodalActive.close();
  }
  openpersonDoc(url){
    var width  = screen.width;
    var height = screen.height;
    var params = 'width='+width+', height='+height;
    params += ', directories=no';
    params += ', location=no';
    params += ', menubar=no';
    params += ', resizable=yes';
    params += ', scrollbars=no';
    params += ', status=no';
    params += ', toolbar=no'; 
    window.open(url, '_blank', params)
  }

}
