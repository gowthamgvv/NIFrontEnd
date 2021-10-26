import { Injectable, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';          // import signalR
import { HttpClient,HttpHeaders } from '@angular/common/http';
//import { MessageDto } from '../Core/_models/message';
import { MessengerActionRequest,GetAllConversationData,
  GetConversationDataByConservation,TotalCounts,UpdateMessage,LoginUsers } from '../../_models/message';
import { from, Observable, Subject,BehaviorSubject } from 'rxjs';
import { AlertifyService } from '../../../Core/_providers/alert-service/alertify.service';


let headers = new HttpHeaders();  
headers.append('Content-Type', 'application/json');  
const httpOptions = {  
    headers: headers  
}; 
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  //  public connectionId : any;
  private  connection: any = new signalR.HubConnectionBuilder().withUrl("http://devappapi.netimpact.com/chatsocket")   // mapping to the chathub as in startup.cs
                                        .configureLogging(signalR.LogLevel.Information)
                                        .build();

 // private hubConnection: signalR.HubConnection;
   readonly POST_URL = "http://devappapi.netimpact.com/api/chat"

   private receivedMessageObject: GetAllConversationData = new GetAllConversationData();
   private sharedObj = new Subject<GetAllConversationData>();

   private receivedMessageObject1:GetConversationDataByConservation =new GetConversationDataByConservation();
   private sharedObj1=new Subject<GetConversationDataByConservation>();

  
   private sharedObj2=new Subject<TotalCounts>();

   private sharedObj3=new Subject<UpdateMessage>();

   loginusersDto:LoginUsers=new LoginUsers();
  constructor(private http: HttpClient,private alertify:AlertifyService) { 
  
    // this.connection.onclose(async () => {
    //   await this.start();
    // });
    this.connection.on("LeftOne", (GetAllConversationData,) => { this.mapReceivedMessage(GetAllConversationData); });
    this.connection.on("RightOne",(GetConversationDataByConservation)=>{this.mapReceivedMessage1(GetConversationDataByConservation);});
    this.connection.on("TotalCount",(TotalCounts)=>{this.GetTotalCounts(TotalCounts);});
    this.connection.on("refreshUpdateDoubleTickMark",(UpdateMessage)=>{this.GetDoubleTickMark(UpdateMessage);});
 
 this.start();  
      
  }

  // Strart the connection
 public async start() {
  try {
    await this.connection.start().then(()=>this.getConnectionId());
    console.log('Connection started');     
  } catch (err) {
    console.log(err);
    setTimeout(() => this.start(), 5000);
  } 
}

// createHubConnection() {

//   this.hubConnection = new signalR.HubConnectionBuilder()
//   .withUrl("http://localhost:42138/chatsocket")
//   .configureLogging(signalR.LogLevel.Information).build();
 

//   this.hubConnection.start().then(()=>this.getConnectionId()).catch(error => console.log(error));

//     this.hubConnection.on("LeftOne", (GetAllConversationData,) => { this.mapReceivedMessage(GetAllConversationData); });
//     this.hubConnection.on("RightOne",(GetConversationDataByConservation)=>{this.mapReceivedMessage1(GetConversationDataByConservation);});
//     this.hubConnection.on("TotalCount",(TotalCounts)=>{this.GetTotalCounts(TotalCounts);});
//     this.hubConnection.on("refreshUpdateDoubleTickMark",(UpdateMessage)=>{this.GetDoubleTickMark(UpdateMessage);});
 

// }

getConnectionId = () => {
  this.loginusersDto.UserId=localStorage.getItem('dealeruserid');
  this.loginusersDto.connectionId = this.connection.connectionId;
   return this.http.post(this.POST_URL+'/LoginUsers',this.loginusersDto).subscribe(data => console.log(data));
}

public stopHubConnection(){
    this.loginusersDto.UserId=localStorage.getItem('dealeruserid');
    this.loginusersDto.connectionId =this.connection.connectionId;
    return this.http.post(this.POST_URL+'/DisconnectedUsers',this.loginusersDto).subscribe(data =>
      this.connection.stop().catch(error => console.log(error))
      );
   
  }


  private mapReceivedMessage(GetAllConversationData): void {
   
       this.sharedObj.next(GetAllConversationData);
  
 }

 private mapReceivedMessage1(GetConversationDataByConservation): void {
   
    this.sharedObj1.next(GetConversationDataByConservation);
  
 }

 private GetTotalCounts(TotalCounts):void{
   
  this.sharedObj2.next(TotalCounts);
 }

 private GetDoubleTickMark(UpdateMessage):void{
    this.sharedObj3.next(UpdateMessage);
 }

  /* ****************************** Public Mehods **************************************** */

  // Calls the controller method

  public broadcastMessage(msgDto: FormData) {
   return this.http.post(this.POST_URL+'/MessegeInsert',msgDto,httpOptions).subscribe(data => console.log(data));
  }

  public retrieveMappedObject(): Observable<GetAllConversationData> {
    return this.sharedObj.asObservable();
  }

  public retrieveMappedObject1(): Observable<GetConversationDataByConservation> {
    return this.sharedObj1.asObservable();
  }

  public GetUsersList(userDto: any){
    return this.http.post(this.POST_URL+'/totalusers',userDto);
  }

  public GetmessengerList(leftDto: any) {
    return this.http.post(this.POST_URL+'/GetAllConversationData',leftDto);
  }

  public GetmessengerClick(rightDto: any) {
    return this.http.post(this.POST_URL+'/GetConversationData',rightDto);
  }

  public retrieveTotalCount(): Observable<TotalCounts> {
    return this.sharedObj2.asObservable();
  }

  public GetTotalCountList(UserDto:any){
    return this.http.post(this.POST_URL+'/TotalCount',UserDto);
  }

  public GetUpdatedCountClick(updateMsgCountDto:any){
    return this.http.post(this.POST_URL+'/TotalMessageUpdateCount',updateMsgCountDto);
  }

  public GetDoubleTick(doubletickDto:any){
    return this.http.post(this.POST_URL+'/UpdateMsgreadstatus',doubletickDto);
  }

  public UpdateDoubleTickMarkinSite(doubletickDtos:any){
    return this.http.post(this.POST_URL+'/UpdateDoubleTickMark',doubletickDtos);
  }
  
  public retriveDoubleTickMarks(): Observable<UpdateMessage> {
    return this.sharedObj3.asObservable();
  }

  public UserGroupAction(obj:FormData) { 
    return this.http.post(this.POST_URL+'/UserGroupAction',obj,httpOptions);
  }

  public GetGroupDatainfo(GroupInfoDto:any){
    return this.http.post(this.POST_URL+'/GetGroupData',GroupInfoDto);
  }

  public GetReceiverDataInfo(ReceiverInfoDto:any){
    return this.http.post(this.POST_URL+'/GetReciverInfo',ReceiverInfoDto);
  }



}
