import { Component, OnInit,Input } from '@angular/core';
import {NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {AlertifyService} from '../../../Core/_providers/alert-service/alertify.service';
import { ChatService } from '../../../Core/_providers/services/chat.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { GroupStorInfo} from '../../../Core/_models/message';
//import { NgbActiveModal,NgbModal } from '@ng-bootstrap/ng-bootstrap'


@Component({
  selector: 'app-chatgroupinfo',
  templateUrl: './chatgroupinfo.component.html',
  styleUrls: ['./chatgroupinfo.component.scss']
})
export class ChatgroupinfoComponent implements OnInit {
  @Input('Getgroupstorinfo') GroupStorInfos:any=[];
  @Input('Conv_id') Conv_id:any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper = false;
  containWithinAspectRatio = true;
  previewUrl: any = null;
  public image: any = '';
  fileData: File = null;
  public selectedFile: any = null;
  uploadedFileName: any;
  //ngbmodalActive: any;
  Userid:any;
  groupimage:any;
  grouptype:any;
  groupName:any="";
  GroupId: any = "";
  ent_groupinfo={"slidesToShow": 2, "slidesToScroll": 1,  
 'infinite': true, 
 'arrows': true,
 'dots': false,
 'rows':1
  };
  GroupInfoDto:GroupStorInfo=new GroupStorInfo();
  constructor(private ngbmodal: NgbModal,private alertify: AlertifyService,private chatService: ChatService,private ngbmodalActive: NgbActiveModal) { }

  ngOnInit(): void {
    this.Userid=localStorage.getItem('dealeruserid');
  }
  ngAfterViewInit(){
    this.groupName=this.GroupStorInfos[0].groupName;
    this.GroupId=this.GroupStorInfos[0].groupId;
  }
  
  // openimg(tooltip,grouptype,groupimage){
  //   if (tooltip.isOpen()) {
  //     tooltip.close();
  //   } else {
  //     tooltip.open({grouptype,groupimage });
  //   }
  // }
  
  

  openimg(tmp,type,img){
    this.groupimage="";
    this.grouptype="";
    this.ngbmodalActive=this.ngbmodal.open(tmp​​​​​​​​);
    this.grouptype=type;
    this.groupimage=img;
  }

  ongroupcloseimg(){
    this.groupimage="";
    this.grouptype="";
    this.ngbmodalActive.close();
  }
  openGroupDocument(url){
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

  changeGrpName: boolean = true;
  changedGrpName: boolean = false;
   changeGrpNameFunction() {
    this.changedGrpName = true;
    this.changeGrpName = false;    
   }


  closeEnter(grpName, Action, imgData, Ev) {
    if (Ev.which == 13) {
     this.changeGrpNames(grpName, Action, imgData)
    }

  }

  changeGrpNames(grpname: string, Action, img) {
    let imgdata = "";
    let message = "";
    imgdata = img;
    //console.log(imgdata);
    if (imgdata == "" || imgdata == undefined) {
      message = "Group name changed successfully";
    }
    else {
      message = "Group icon changed succesfully";
    }
    if (grpname.length == 0) {
      this.alertify.success('Group name should not be empty');
    }
    else if (grpname.length >= 30) {
      this.alertify.success('Group name should not be exceeds 30 characters');
    }
    else {
      this.changedGrpName = true;
      this.changeGrpName = false;
      if (this.groupName != grpname) {
      //  localStorage.setItem('groupname',grpname);
      //  localStorage.setItem('groupimage','');
        const fds:any=new FormData();
   
        fds.append('Action',Action); 
        fds.append('Identifier',this.GroupId); 
        fds.append('userid',localStorage.getItem('dealeruserid')); 
        fds.append('GroupName',grpname); 
        fds.append('Description',""); 
        fds.append('TagIds',"0"); 
        fds.append('GroupUsers',""); 
        fds.append('IsPublic',"N"); 
        fds.append('GroupImagedata', imgdata);
      //  this.chatService.UserGroupAction(fds).subscribe(data=> {​​​​​​​​
      //   console.log(data)
     
      //   this.changedGrpName = false;
      //   this.changeGrpName = true;
      //   this.alertify.success(message);          
      // }​​​​​​​​);
    }else{
      this.changedGrpName = false;
      this.changeGrpName = true;
    }​​   
      
    }

  }

  onclosemsg() {​​​​​​​​
    this.selectedFile=''
    this.croppedImage=''
    this.ngbmodalActive.close();
      }​​​​​​​​

  Image(tmp) {​​​​​​​​
   // this.ngbmodalActive.close();
    this.ngbmodalActive=this.ngbmodal.open(tmp, {​​​​​​​​ size:'sm', backdrop:'static' }​​​​​​​​);
      }​​​​​​​​
  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
}


  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  fileChangeEvent(event: any,tmp): void {
    this.imageChangedEvent = event;
  //  this.image='';

    this.Image(tmp);
}

imageCropped(event: ImageCroppedEvent) {
 //   this.croppedImage = event.base64;
 //   this.previewUrl = event.base64;

    console.log(event);
    const fileToUpload: File = new File([this.dataURItoBlob(event.base64)], 'filename.png');
      this.selectedFile = fileToUpload;
      this.uploadedFileName = fileToUpload;
      console.log(this.uploadedFileName)
      // this.showimg = false;
      // this.showchangeimg = true;
}
dataURItoBlob(dataURI): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

update(){
 // localStorage.setItem('groupname','');
 this.changeGrpIcon("I",this.uploadedFileName)
// localStorage.setItem('groupimage',this.uploadedFileName);
//edit api call
}
changeGrpIcon( Action, img){
let imgdata = "";
let message = "";
imgdata = img;
if (imgdata != "" || imgdata == undefined) {
  message = "Group icon changed succesfully";
}
const fdss:any=new FormData();  
fdss.append('Action',Action); 
fdss.append('Identifier',this.GroupId); 
fdss.append('userid',localStorage.getItem('dealeruserid')); 
fdss.append('GroupName',this.groupName); 
fdss.append('Description',""); 
fdss.append('TagIds',"0"); 
fdss.append('GroupUsers',""); 
fdss.append('IsPublic',"N"); 
fdss.append('GroupImagedata', imgdata);
// this.chatService.UserGroupAction(fdss).subscribe(data=> {​​​​​​​​
//   console.log(data)
//   this.ngbmodalActive.close();
//   this.alertify.success(message);
//   this.GroupInfoDto.userid=localStorage.getItem('dealeruserid');
//   this.GroupInfoDto.GroupId=this.GroupId;
//   this.GroupInfoDto.ConvId=this.Conv_id;
//   this.chatService.GetGroupDatainfo(this.GroupInfoDto).subscribe(data=>{ this.GroupStorInfos=data});          
// }​​​​​​​​);
}



}