import { Component, OnInit,AfterViewChecked,ViewChild,ElementRef } from '@angular/core';
import { ChatService } from '../../Core/_providers/services/chat.service';
import { MessengerActionRequest,GetAllConversationData,
         GetConversationDataByConservation, 
         totalusers,LeftValuesDto,GetConversationDataRequest,
         TotalUpdatedCounts,UpdateMessage,GroupStorInfo,GetReceiverInfoReuest} from '../../Core/_models/message';
 import { NgbActiveModal,NgbModal } from '@ng-bootstrap/ng-bootstrap'
 import { trigger, state, style, transition, animate } from '@angular/animations';
 import { FormBuilder, FormGroup } from '@angular/forms';
 import { ImageCroppedEvent } from 'ngx-image-cropper';
 import { AlertifyService } from '../../Core/_providers/alert-service/alertify.service';
import { AngularMultiSelect } from 'angular2-multiselect-dropdown';



@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]      
})
export class MessengerComponent implements OnInit {
 
  chatlist:number=1
 
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  //@ViewChild('data-autoheight') myIdentifier: ElementRef;
  ParentId:any=0;
  uploadedFileName: any;
  mediaimage:any;
  public selectedFile: any = null;
  imageChangedEvent: any = '';
 croppedImage: any = '';
 showCropper = false;
 containWithinAspectRatio = true;
 previewUrl: any = null;
 public image: any = ''; 
  dshipForm: FormGroup;
  flag:any;
  GroupStorInfos:any;
  ReceiverStorInfo:any;
  fileData: File = null;
  addMembers: boolean = false;
  grpusrsname: any;
  singleConvData: any;
  gpname: any = '';
  addingusers: any;
  addedurs1: any = [];
  addeduser: any;
  newGroup: any = [];
  totalusers: any = [];
  searchQuery: string;
  totalusersdata: any= [];
  LeftInbox: any;
  selectedid: any;
  userName: any ='';
  displaypic:any = '';
 // msgCount: any;
  selecteduser: any =[];
  index: any;
  TempUser:any;
  id:any;
  user:any;
  conid:any;
  emojitext: string = "";
  name = 'Angular';
  message = '';
  showEmojiPicker = false;
  sets = [
    'native',
    'google',
    'twitter',
    'facebook',
    'emojione',
    'apple',
    'messenger'
  ]
  set = 'twitter';
  constructor(private chatService: ChatService,private ngbmodal: NgbModal,
     private ngbmodalActive: NgbActiveModal,private fB: FormBuilder,
     private alertify: AlertifyService) { 
    this.dshipForm = this.fB.group({
      fileUpload: ['', ''],
      avatar: [null]
    });
  }
 // msgcount=1
  ngOnInit(): void {
  // this.msgCount=1
    this.getmessenger();  
    this.chatService.retrieveMappedObject().subscribe( (receivedObj: GetAllConversationData) => { this.addToInbox(receivedObj);});  // calls the service method to get the new messages sent
    this.chatService.retrieveMappedObject1().subscribe( (receivedObj: GetConversationDataByConservation) => { this.addToInbox1(receivedObj);});
    this.chatService.retriveDoubleTickMarks().subscribe( (receivedObj : UpdateMessage) => { this.DoubleTickMark(receivedObj);});
    
  }

  
  public Conv_id:string="0";
  public receiverid:string;
  public groupcode:number;
  public GroupOrMember:string;
  public GroupOrMemberImage:string;
 // msgDto: MessengerActionRequest = new MessengerActionRequest();

  LeftInboxArray: any=[];
  RightInboxArray:any=[];
  userDto: totalusers = new totalusers();
  leftDto: LeftValuesDto=new LeftValuesDto();
  rightDto:GetConversationDataRequest=new GetConversationDataRequest();
  updateMsgCountDto:TotalUpdatedCounts=new TotalUpdatedCounts();
  doubletickDto:UpdateMessage=new UpdateMessage();
  GroupInfoDto:GroupStorInfo=new GroupStorInfo();
  ReceiverInfoDto:GetReceiverInfoReuest=new GetReceiverInfoReuest();
  MsgText: string;
  
  send(event): void {
      if(((event.target.value).trim()).length == 0 ){
        this.alertify.error("Enter text message")
       // return;
      } else {
        if (event.target.value != "") {
          this.Bindmessenger(this.emojiToUnicode(event.target.value), 'T');
          event.target.value="";
          this.emojitext="";
        }
      }
  }

  Bindmessenger(chatdesc, msgtype){
    const fdd:any=new FormData();  
    fdd.append('Action',"A"); 
    fdd.append('ConservationId',this.Conv_id); 
    fdd.append('userID',localStorage.getItem('dealeruserid')); 
    if(this.groupcode>0){
      fdd.append('GroupCode',this.groupcode); 
      fdd.append('ReceiverId',"0"); 
    }else{
      fdd.append('ReceiverId',this.receiverid); 
      fdd.append('GroupCode',"0");          
    }       
    fdd.append('Message',chatdesc); 
    fdd.append('MessageType',msgtype); 
    fdd.append('MessageId',"0"); 
    fdd.append('ParentId', "0");
    fdd.append('doc', this.dshipForm.get('avatar').value);
    this.chatService.broadcastMessage(fdd);  
  }

  addToInbox(obj: GetAllConversationData) {
   if(obj[0].loginId==localStorage.getItem('dealeruserid')){
    this.singleConvData = [];
    this.singleConvData.push({
          'allowSendMessages': obj[0].allowSendMessages,
          'conversationId':obj[0].conversationId,
          'counts':obj[0].counts,
          'createdId':obj[0].createdId,
          'date':obj[0].date,
          'description':obj[0].description,
          'groupId':obj[0].groupId,
          'groupMessengerName':obj[0].groupMessengerName,
          'groupStatus':obj[0].groupStatus,
          'groupUserNames':obj[0].groupUserNames,
          'grpMembers':obj[0].grpMembers,
          'id':obj[0].id,
          'loginId':obj[0].loginId,
          'messageIDs':obj[0].messageIDs,
          'messageType':obj[0].messageType,
          'msgLength':obj[0].msgLength,
          'readStatus':obj[0].readStatus,
          'userId':obj[0].userId,
          'userImage':obj[0].userImage,
          'userName':obj[0].userName
        })
        if (this.singleConvData != 0) {
          if(this.LeftInboxArray==null){
            this.LeftInboxArray=this.singleConvData;
            this.userName=this.LeftInboxArray[0].userName;
            this.displaypic=this.LeftInboxArray[0].userImage;
            // if(obj[0].groupId!=0){ 
            //   this.grpusrsname=obj[0].groupUserNames.replace(/[\d_]+/g, '');
            // }else{
            //   this.grpusrsname='Online';
            // }         
            this.Conv_id=obj[0].conversationId;
            this.groupcode=obj[0].groupId;
            this.receiverid=obj[0].id;
          }else{

            for (let i = 0; i < this.LeftInboxArray.length; i++) {
              for (let j = 0; j < this.singleConvData.length; j++) {
                if (this.LeftInboxArray[i].conversationId == this.singleConvData[j].conversationId) {
                  this.LeftInboxArray.splice(i, 1)
                  break;
                }
              }
            }
            Array.prototype.unshift.apply(this.LeftInboxArray, this.singleConvData);
          if(obj[0].conversationId==this.Conv_id){
            this.userName=this.singleConvData[0].userName;
            this.displaypic=this.singleConvData[0].userImage;
            // if(this.singleConvData[0].groupId!=0){
            //   this.grpusrsname=this.singleConvData[0].groupUserNames.replace(/[\d_]+/g, '');
            // }
            // else{
            //   this.grpusrsname='Online'           
            // }
          }
         
         
          }
         
        }
       
     this.TempUser=[]
    }
  }

  addToInbox1(obj:GetConversationDataByConservation){
    this.id=obj[0].messageId;
    if(obj[0].loginid==localStorage.getItem('dealeruserid')){
    if(obj[0].conversationId==this.Conv_id){ 
      this.messages=[];
      this.messages=Object.keys(obj).map(it =>{
        let obj1={
          actiontype : obj[it].actiontype,
          conversationId: obj[it].conversationId,
          convtype: obj[it].convtype,
          date: obj[it].date,
          document: obj[it].document,
          groupId: obj[it].groupId,
          groupMembers: obj[it].groupMembers,
          groupNames: obj[it].groupNames,
          loginid: obj[it].loginid,
          message: obj[it].message,
          messageCategory: obj[it].messageCategory,
          messageFlag: obj[it].messageFlag,
          messageId: obj[it].messageId,
          messageType: obj[it].messageType,
          readStatus: obj[it].readStatus,
          receiverid: obj[it].receiverid,
          userName:obj[it].userName,
          dt: this.convertToDate(obj[it].date)
        }
        return obj1;
      });
     this.RightInboxArray.push(this.messages[0]);

     this.updateMsgCountDto.userid=localStorage.getItem('dealeruserid');
     this.updateMsgCountDto.conversationId=obj[0].conversationId;
     this.chatService.GetUpdatedCountClick(this.updateMsgCountDto).subscribe(data=>{
       let el = document.getElementById('LeftCount_' + this.messages[0].messageId);
          el.classList.add("hide");
    console.log(data);
    });

     if(this.selecteduser.conversationId!='0' && this.id !=""){
      this.doubletickDto.userid=localStorage.getItem('dealeruserid');
      this.doubletickDto.conversationID=obj[0].conversationId;
      this.doubletickDto.messageIds=this.id;
      this.chatService.GetDoubleTick(this.doubletickDto).subscribe((data:any)=>{
        if (data != "0"){
          this.doubletickDto.messageIds=data.toString();
          this.chatService.UpdateDoubleTickMarkinSite(this.doubletickDto).subscribe(data=>{  console.log(data);});
           }  
      });
    }
   }else if(this.Conv_id=="0")
   {
    this.messages=[];
      this.messages=Object.keys(obj).map(it =>{
        let obj2={
          actiontype : obj[it].actiontype,
          conversationId: obj[it].conversationId,
          convtype: obj[it].convtype,
          date: obj[it].date,
          document: obj[it].document,
          groupId: obj[it].groupId,
          groupMembers: obj[it].groupMembers,
          groupNames: obj[it].groupNames,
          loginid: obj[it].loginid,
          message: obj[it].message,
          messageCategory: obj[it].messageCategory,
          messageFlag: obj[it].messageFlag,
          messageId: obj[it].messageId,
          messageType: obj[it].messageType,
          readStatus: obj[it].readStatus,
          receiverid: obj[it].receiverid,
          userName:obj[it].userName,
          dt: this.convertToDate(obj[it].date)
        }
        return obj2;
      });
     this.RightInboxArray.push(this.messages[0]);
   // this.RightInboxArray.push(obj[0]);

   this.updateMsgCountDto.userid=localStorage.getItem('dealeruserid');
     this.updateMsgCountDto.conversationId=obj[0].conversationId;
     this.chatService.GetUpdatedCountClick(this.updateMsgCountDto).subscribe(data=>{
    // this.msgCount=data[0].messengercount
    console.log(data);
    });

    if(this.selecteduser.conversationId!='0' && this.id !=""){
      this.doubletickDto.userid=localStorage.getItem('dealeruserid');
      this.doubletickDto.conversationID=obj[0].conversationId;
      this.doubletickDto.messageIds=this.id;
      this.chatService.GetDoubleTick(this.doubletickDto).subscribe((data:any)=>{
        if (data != "0"){
          this.doubletickDto.messageIds=data.toString();
          this.chatService.UpdateDoubleTickMarkinSite(this.doubletickDto).subscribe(data=>{  console.log(data);});
           }  
      });
    }
   }
  }
  }

  Gettotalmembers(): void {
    if(this.chatlist==0){
      this.chatlist=1
    }
    else{
      this.chatlist=0
 
    }
    this.searchQuery=''
    this.userDto.userid=localStorage.getItem('dealeruserid');
    this.userDto.dealerid=localStorage.getItem('DealerId');
    this.chatService.GetUsersList(this.userDto).subscribe(data=>{
    this.totalusersdata=data

    this.totalusers=data
    this.addingusers = this.totalusers.filter(item => item.identifier != '0')
  });                   // Send the message via a service   
  }
  searchFilter(val) {
    //  alert(val)
   // this.msgCount=2

      if(val==0){
        console.log(this.searchQuery)
        let searchValue = this.searchQuery;
        if (searchValue == '') {
          this.totalusers = this.totalusersdata;
        } else {
          this.totalusers = this.totalusersdata.filter(item => {
            if (searchValue == '') {
              this.totalusers = this.totalusersdata;
            } else {
              if (item.userName != null && item.userName != "") {
                // return item.userName.toUpperCase().substr(0,1).includes(searchValue.trim().toUpperCase().substr(0,1))
                return item.userName.toUpperCase().includes(searchValue.trim().toUpperCase());
              } 
            }  
           
          })
        }
      }
     if(val==1){
      console.log(this.searchQuery)
      let searchValue = this.searchQuery;
      if (searchValue == '') {
        this.LeftInboxArray = this.LeftInbox;
      } else {
        this.LeftInboxArray = this.LeftInbox.filter(item => {
          if (searchValue == '') {
            this.LeftInboxArray = this.LeftInbox;
          } else {
            if (item.userName != null && item.userName != "") {
              return item.userName.toUpperCase().includes(searchValue.trim().toUpperCase())
            } 
          }  
         
        })
      }
     }    
  }
  
 
  getmessenger(): void{
    this.leftDto.userid= localStorage.getItem('dealeruserid');
    this.leftDto.messageId="0";
    this.chatService.GetmessengerList(this.leftDto).subscribe(data=>{
      this.LeftInboxArray=data;
      if(this.LeftInboxArray[0].groupId!=0){
        this.selectedid=this.LeftInboxArray[0].conversationId;
        this.userName=this.LeftInboxArray[0].userName;
        this.displaypic=this.LeftInboxArray[0].userImage;
     //   this.grpusrsname=this.LeftInboxArray[0].groupUserNames.replace(/[\d_]+/g, '');
 
      }
      else{
      this.selectedid=this.LeftInboxArray[0].conversationId;
      this.userName=this.LeftInboxArray[0].userName;
      this.displaypic=this.LeftInboxArray[0].userImage;
    //  this.grpusrsname='Online'
      }
     // this.selectedid=this.LeftInboxArray[0].conversationId;
     // this.userName=this.LeftInboxArray[0].userName;
     // this.displaypic=this.LeftInboxArray[0].userImage;
      this.LeftInbox=data;
      setTimeout(() => {
        let element:HTMLElement=document.getElementById('div_0') as HTMLElement;
        element.click();
       }, 1000);
    });    
  }
ngOnChange(){

}
messages:any=[];
  Getrightmessengerclick(ConvId,Sid,username,img,val,index):void{  
    if(ConvId!=0){
      if(val.groupId!=0){
      //  this.grpusrsname=val.groupUserNames.replace(/[\d_]+/g, '');
        this.flag="G";
      }
      else{
      //  this.grpusrsname="Online";
        this.flag="R";
      }
    }
  //   if(ConvId==0){
  //     this.grpusrsname="Online";
  //  }
    this.index=index
    this.selecteduser=val
    this.TempUser=val
    this.selectedid=ConvId;
    this.chatlist=1;
    this.searchQuery=''
    this.Conv_id=ConvId;
    this.receiverid=Sid;
    this.userName=username;
    this.displaypic=img;
    this.groupcode=val.groupId;
    this.rightDto.ConservationId=ConvId;
    this.rightDto.userid=localStorage.getItem('dealeruserid');
    this.rightDto.ReceiverId=Sid;
    this.rightDto.MessageId="0";
    this.RightInboxArray=[]

    this.ReceiverStorInfo="";
    this.GroupStorInfos="";
    this.RightSingleBoard='S';  
    this.RightBoard='N';
    this.menuState = 'out' ;
    this.statusClass =  'not-active';
    if(this.isShown==true)
    this.isShown = ! this.isShown;

    this.chatService.GetmessengerClick(this.rightDto).subscribe(data=>{
      this.messages=[];
      this.messages=data;
      this.grpusrsname=this.messages[0].onlineStatus;
      this.RightInboxArray=this.messages.map(data=>{
        let obj={
          actiontype : data.actiontype,
          conversationId: data.conversationId,
          convtype: data.convtype,
          date: data.date,
          document: data.document,
          groupId: data.groupId,
          groupMembers: data.groupMembers,
          groupNames: data.groupNames,
          loginid: data.loginid,
          message: data.message,
          messageCategory: data.messageCategory,
          messageFlag: data.messageFlag,
          messageId: data.messageId,
          messageType: data.messageType,
          readStatus: data.readStatus,
          receiverid: data.receiverid,
          userName: data.userName,
          dt: this.convertToDate(data.date)
        }
        return obj;
      })
      
      this.updateMsgCountDto.userid=localStorage.getItem('dealeruserid');
       this.updateMsgCountDto.conversationId=ConvId;
       this.chatService.GetUpdatedCountClick(this.updateMsgCountDto).subscribe(data=>{
         let el = document.getElementById('LeftCount_' + val.messageIDs);
         el.classList.add("hide");
      // this.msgCount=data[0].messengercount
      console.log(data);
      });
  
      if(ConvId!='0' && val.messageIDs !=""){
        this.doubletickDto.userid=localStorage.getItem('dealeruserid');
        this.doubletickDto.conversationID=ConvId;
        this.doubletickDto.messageIds=val.messageIDs;
        this.chatService.GetDoubleTick(this.doubletickDto).subscribe((data:any)=>{
        if (data != "0"){
          this.doubletickDto.messageIds=data.toString();
          this.chatService.UpdateDoubleTickMarkinSite(this.doubletickDto).subscribe(data=>{  console.log(data);});  
          }  
         });
      }
    });

  }

  convertToDate(ts) {
    let d = new Date(ts);
    return d.toDateString();
  }

  opengroup(tmp) {​​​​​​​​
  this.gpname='';
  this.ngbmodalActive=this.ngbmodal.open(tmp, {​​​​​​​​ size:'sm', backdrop:'static' }​​​​​​​​);
   
    }​​​​​​​​
  onclosemsg() {​​​​​​​​
  this.gpname=''
  this.selectedFile=''
  this.croppedImage=''
  this.ngbmodalActive.close();
    }​​​​​​​​
  isstatus='N';
  changesatus(eve) {​​​​​​​​
  if (eve.target.checked==false) {​​​​​​​​
  this.isstatus='Y';
      }​​​​​​​​ else {​​​​​​​​
  this.isstatus='N';
      }​​​​​​​​
   
    }​​​​​​​​
  next(tmp) {​​​​​​​​
  this.ngbmodalActive.close();
  this.ngbmodalActive=this.ngbmodal.open(tmp, {​​​​​​​​ size:'sm', backdrop:'static' }​​​​​​​​);
    }​​​​​​​​
  checkValue1(usr) {​​​​​​​​
   
  console.log(usr)
  this.addedurs1=this.addingusers.filter(ele=> {​​​​​​​​
  if (ele.Check) {​​​​​​​​
  return ele;
        }​​​​​​​​
      }​​​​​​​​);
    }​​​​​​​​
   
  addParticipants() {​​​​​​​​
   
  this.addingusers.forEach(ele=> {​​​​​​​​
  if (ele.Check) {​​​​​​​​
   
  this.newGroup.push(ele.identifier);
        }​​​​​​​​
      }​​​​​​​​);
  const fd:any=new FormData();
   
  fd.append('Action',"A"); 
  fd.append('Identifier',0); 
  fd.append('userid',localStorage.getItem('dealeruserid')); 
  fd.append('GroupName',this.gpname); 
  fd.append('Description',""); 
  fd.append('TagIds',"0"); 
  fd.append('GroupUsers',this.newGroup.toString()); 
  fd.append('IsPublic',this.isstatus); 
  fd.append('GroupImagedata', this.uploadedFileName);
  this.addedurs1= []
  console.log(fd)
  this.chatService.UserGroupAction(fd).subscribe(data=> {​​​​​​​​
  console.log(data)
  this.croppedImage=''
  this.selectedFile=''
  this.ngbmodalActive.close();
   if(this.chatlist==1){
     this.chatlist=0;
   }else{
    this.chatlist=1;
   }
      }​​​​​​​​)
    }​​​​​​​​

  DoubleTickMark(obj:UpdateMessage){
    
      if (obj.userid == this.receiverid && obj.conversationID == this.Conv_id) {
    
        let msgArray = obj.messageIds.split(',');
        for (let j = 0; j < msgArray.length; j++) {
          let el = document.getElementById('divfortickmark_' + msgArray[j]);
          el.classList.add("readStatusTick");
          el.classList.remove("readStatusblueTick");
        }
      }
  }
 
  toggleEmojiPicker() {
    console.log(this.showEmojiPicker);
        this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event) {
    console.log(this.emojitext)
    const { emojitext } = this;
    console.log(emojitext);
    console.log(`${event.emoji.native}`)
    const text = `${emojitext}${event.emoji.native}`;

    this.emojitext = text;
    // this.showEmojiPicker = false;
  }

  onFocus() {
    console.log('focus');
    this.showEmojiPicker = false;
  }
  onBlur() {
    console.log('onblur')
  }

  emojiToUnicode(messages) {
    this.MsgText = this.emojitext.trim().replace('&nbsp;', ' ').replace(/\\/g, '\\\\');
    let emojiRegexp = /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g;
    if (!messages)
      return;
    try {
      let newMessage = messages.match(emojiRegexp);
      for (let emoj in newMessage) {
        let emojmessage = newMessage[emoj];
        let index = messages.indexOf(emojmessage);
        if (index === -1)
          continue;
        emojmessage = "\\u" + emojmessage.charCodeAt(0).toString(16) + "\\u" + emojmessage.charCodeAt(1).toString(16);
        messages = messages.substr(0, index) + emojmessage + messages.substr(index + 2);
      }
      return messages;
    } catch (err) {
      console.error("error in emojiToUnicode" + err.stack);
    }
  };

  // tgle4
menuState:string = 'out';
statusClass:string= 'not-active';
RightBoard:string='N';
RightSingleBoard:string='S';
isShown: boolean = false ;
toggleMenu(){
  this.ReceiverStorInfo="";
  this.GroupStorInfos="";
  this.isShown = ! this.isShown;
  if(this.flag=="G"){  
      
       this.RightSingleBoard='S';  
       this.RightBoard='N'?'Y':'N';
       this.GroupInfoDto.userid=localStorage.getItem('dealeruserid');
       this.GroupInfoDto.GroupId=this.groupcode;
       this.GroupInfoDto.ConvId=this.Conv_id;
        this.chatService.GetGroupDatainfo(this.GroupInfoDto).subscribe(data=>{ this.GroupStorInfos=data});
  }
  else{
    this.RightBoard='N';
    this.RightSingleBoard='S'?'R':'S';
    this.ReceiverInfoDto.userid=localStorage.getItem('dealeruserid');
    this.ReceiverInfoDto.ReceiverId=this.receiverid;
     this.chatService.GetReceiverDataInfo(this.ReceiverInfoDto).subscribe(data=>{this.ReceiverStorInfo=data});
  }
  this.menuState = this.menuState === 'out' ? 'in' : 'out';
  this.statusClass = this.statusClass === 'not-active' ? 'active' :'not-active';
}


setActiveClass(){
  // this.statusClass = 'not-active';
}

public fileProgress(fileInput: any): void {
  this.fileData = <File>fileInput.target.files[0];
  this.uploadedFileName = <File>fileInput.target.files[0].name;

  const file = (fileInput.target as HTMLInputElement).files[0];

  this.dshipForm.patchValue({
    avatar: file
  });

  this.dshipForm.get('avatar').updateValueAndValidity();

  var fextension = this.Validatefileupload( this.uploadedFileName);

  if (fextension.toUpperCase() == "JPG" || fextension.toUpperCase() == "PNG" || fextension.toUpperCase() == "GIF" || fextension.toUpperCase() == "JPEG") 
  {
    this.Bindmessenger('image upload', 'I');
  }
  else if (fextension.toUpperCase() == "PDF" || fextension.toUpperCase() == "DOC" || fextension.toUpperCase() == "DOCX" || fextension.toUpperCase() == "TXT" || fextension.toUpperCase() == "XLS" || fextension.toUpperCase() == "XLXS" || fextension.toUpperCase() == "XML" || fextension.toUpperCase() == "ODS") 
  {
    this.Bindmessenger('file upload', 'F');   
  }
  else if (fextension.toUpperCase() == "WAV" || fextension.toUpperCase() == "MP3" || fextension.toUpperCase() == "WMA" || fextension.toUpperCase() == "OGG" || fextension.toUpperCase() == "CAF") 
  {
    this.Bindmessenger('audio upload', 'A');
  }
  else if (fextension.toUpperCase() == "AVI" || fextension.toUpperCase() == "FLV" || fextension.toUpperCase() == "WMV" || fextension.toUpperCase() == "MOV" || fextension.toUpperCase() == "MP4" || fextension.toUpperCase() == "WEBM") 
  {
    this.Bindmessenger('video upload', 'V');       
  }
  // this.preview();
}

Validatefileupload(filename) {
  var regex = new RegExp(/\./g)
  var charcount = Number(filename.split(/\./g).length) - 1;
  var VarableData = filename.split('.')[charcount];
  return VarableData;
}

openDocument(url){
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

playAudio(file, idx) {
  var audio=new audio(file);
  audio.load();
  audio.play();
}

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

  this.Image(tmp);
}

imageCropped(event: ImageCroppedEvent) {
 // this.croppedImage = event.base64;


  console.log(event);
  const fileToUpload: File = new File([this.dataURItoBlob(event.base64)], 'filename.png');
    this.selectedFile = fileToUpload;
    this.uploadedFileName = fileToUpload;
    console.log(this.uploadedFileName)
 
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



Image(tmp) {​​​​​​​​
    this.ngbmodalActive.close();
    this.ngbmodalActive=this.ngbmodal.open(tmp, {​​​​​​​​ size:'sm', backdrop:'static' }​​​​​​​​);
      }​​​​​​​​

      openmediaimg(tmp,img){
        this.mediaimage="";
        this.ngbmodalActive=this.ngbmodal.open(tmp​​​​​​​​);
        this.mediaimage=img;
      }
      onmediacloseimg(){
          this.mediaimage="";
        this.ngbmodalActive.close();
      }   

      selectedIndex:any;
      isRplyShown: boolean = false ;
      divrfor_reply:any='';
 replymessenger(_index: number, Mid,rlymsg) {
  this.divrfor_reply="";
    this.emojitext="";
    this.ParentId = [];
    this.ParentId.push(Mid);
    this.selectedIndex = _index;
    this.divrfor_reply=rlymsg; 
    this.isRplyShown =true;
   // var height = this.myIdentifier.nativeElement.offsetHeight;
}

CloseMessageReply(){
  this.divrfor_reply='';
  this.isRplyShown =false;
  
}
     
 
}



