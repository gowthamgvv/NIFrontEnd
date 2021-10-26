export class MessengerActionRequest
{
  public ConservationId: string='';
  public  userID : string='';
  public  ReceiverId : string='';
  public  GroupCode: number;
  public  Message :string='';
  public  MessageType : string='';
  public  Action : string='';
  public  MessageId :string='';
  public  ParentId :string='';
}


export class GetAllConversationData
  {
    public  Id :string='';
    public  ConversationId :string='';
    public  GroupId : number;
    public  UserId : number;
    public  CreatedId :number;
    public  MessageIDs :string='';
    public  UserImage :string='';
    public  UserName :string='';
    public  Description :string='';
    public  MsgLength :string='';
    public  MessageType :string='';
    public  ReadStatus :string='';
    public  AllowSendMessages :string='';
    public  GroupStatus :string='';
    public  GrpMembers :string='';
    public  GroupUserNames :string='';
    public  Counts :number;
    public  Date :any;
    public  GroupMessengerName :string=''
    public LoginId :number;
   
  }


  export class GetConversationDataByConservation
  {
    public  messageId :string='';
    public  conversationId :string='';
    public  userName :string='';
    public  message :string='';
    public  messageType :string='';
    public  document :string='';
    public  date :any;
    public  messageFlag :string='';
    public  groupId :string='';
    public  readStatus :string='';
    public  groupMembers :string='';
    public  groupNames :string='';
    public  convtype :string='';
   // public string Ackstatus { get; set; }
    public  actiontype :string='';
    public  messageCategory :string='';
    public  receiverid :number;
   // public  ReplyMessageInfo:ReplyMessageInfo;
     public loginid :number;
  //  public userMember :string='';
  //  public userImage :string='';
  //  public groupName :string='';
  //  public groupImage :string='';
     public  OnlineStatus :string='';

  }

  export class ReplyMessageInfo
  {
    public  Message :string='';
    public  FromUserName :string='';
    public  MessageDate :any
  }

  export class totalusers
  {
    public  userid :string='';
    public  dealerid :string='';
  }

   export class LeftValuesDto
   {
      public userid: string = '';
      public messageId: string = '';
    }

    export class GetConversationDataRequest
  {
    public ConservationId : string='';
    public userid: string='';
    public ReceiverId : string='';
    public MessageId : string='';
  }

  export class TotalCounts 
  {
   public  messengercount :number;
   public  userid :string='';
 }

 export class UserId
 {
   public  userid :string='';
 }

 export class TotalUpdatedCounts
  {
    public  userid :string='';
    public  conversationId :string='';
  }

  export class UpdateMessage
  {
    public  userid :string;
    public  conversationID :string
    public  messageIds :string
  }

  export class LoginUsers
  {
    public  UserId :string;
    public  connectionId :string
  }

  export class GroupStorInfo
  {
    public  userid :string;
    public  GroupId :number;
    public  ConvId :string
  }

  export class GetReceiverInfoReuest
  {
    public  userid :string;
    public  ReceiverId :string;
  }

  

 

  