import { Component, OnInit, Input} from '@angular/core';
import { ApiService } from '../../Core/_providers/api-service/api.service';
import { AlertifyService } from '../../Core/_providers/alert-service/alertify.service';
import { environment } from '../../../environments/environment';


import { Router, NavigationEnd } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { ChatService } from '../../Core/_providers/services/chat.service';
import {TotalCounts,UserId} from '../../Core/_models/message';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input("parentCount") msgCount: number ;
  
  DuId: any;
  displayFName: any;
  displayLName: any;
  ProfileImage: any;
  RoleName: any;
  MonthEnd: any;
  UpdatedDate: any;
  loginUsername: any;
  decodedToken: any;
  jwtHelper = new JwtHelperService();
  private date = new Date();
  public hour: any;
  public minute: string;
  public second: string;
  public ampm: string; 
  messengerCount:any;
  showdealershipdropdown:boolean=false;
  storesinfo :any=[];
  selectedDealership :any='';

  constructor(private router: Router, private apiSrvc: ApiService, private alertify: AlertifyService, private chatService: ChatService) { 
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url == '/messenger') {
          console.log(this.msgCount)
          if (this.msgCount == null) {
            this.messengerCount == 0
            console.log(this.messengerCount)
          } else {
            this.messengerCount == this.msgCount
            console.log(this.messengerCount)
          }
        }
        else {
          this.TotalCount();
        }
      }
    });
    
    
  }
  UserDto: UserId=new UserId();
  ngOnInit(): void {
    const token = localStorage.getItem('NetImpFrtEND_Token');
    this.decodedToken = this.jwtHelper.decodeToken(token);


    this.MonthEnd = (this.decodedToken.MonthEnd);
    localStorage.setItem('UpdatedDate',this.decodedToken.UpdatedDate);

    this.RoleName = (this.decodedToken.RoleName);
    this.ProfileImage = (`${environment.apiUrl}`+'/resources/images/' + this.decodedToken.Image);
    


    this.DuId = (this.decodedToken.DuId);
    localStorage.setItem('dealeruserid',this.DuId);
    this.loginUsername = (this.decodedToken.FirstName + ' ' + this.decodedToken.LastName);

    setInterval(() => {
      const date = new Date();
      this.updateDate(date);
    }, 1000);

    this.TotalCount();  
    this.chatService.retrieveTotalCount().subscribe( (receivedObj: TotalCounts) => { this.addToCountBox(receivedObj);});
    this.getStoresdata();

  }
  private updateDate(date: Date) {
    const hours = date.getHours();
    this.ampm = hours >= 12 ? 'PM' : 'AM';
    this.hour = hours % 12;
    this.hour = this.hour ? this.hour : 12;
    this.hour = this.hour < 10 ? '0' + this.hour : this.hour;

    const minutes = date.getMinutes();
    this.minute = minutes < 10 ? '0' + minutes : minutes.toString();

    const seconds = date.getSeconds();
    this.second = seconds < 10 ? '0' + seconds : seconds.toString();

  }

  LogOut() {
    localStorage.removeItem('NetImpFrtEND_Token');
    // this.router.navigate(['Login']);
    this.router.navigateByUrl('login');
    this.alertify.success('Logged Out Successfully');
    localStorage.removeItem('DealerBrand');

  }

  DealerID(DuId){
    localStorage.setItem('dealeruserid',DuId);
    this.router.navigate(['Profile']);
 }

 navigateToDashboard(){
  localStorage.setItem('glbStoreDealerId','');
  localStorage.setItem('DealerBrand','0');
  localStorage.setItem('DealerId','0');
    localStorage.setItem('glbdboardType','DS');
    this.apiSrvc.reload('dashboard');
    
  }

  addToCountBox(obj: TotalCounts){
    if(obj[0].userid== localStorage.getItem('dealeruserid')){
      let newObj = new TotalCounts();
      newObj.messengercount = obj[0].messengercount;
      this.messengerCount='';
      this.messengerCount=newObj.messengercount;
    }
   
  }

  TotalCount(): void {
    this.UserDto.userid = localStorage.getItem('dealeruserid');
    this.chatService.GetTotalCountList(this.UserDto).subscribe(data => {
      if (data[0].userid == localStorage.getItem('dealeruserid')) {
        this.messengerCount = '';
        this.messengerCount = data[0].messengercount;
        console.log(this.messengerCount)
this.msgCount=data[0].messengercount;
      }
 
    });
  }

  showdealerDropdown(){
    this.showdealershipdropdown =!this.showdealershipdropdown;
   
    //const ele = this.ddldsselect.nativeElement as HTMLElement;
    if(this.showdealershipdropdown)
      document.getElementById('ddldsselect').style.display="block";
      else
      document.getElementById('ddldsselect').style.display="none";
    var element = <HTMLInputElement>document.getElementById('ddldsselect');
   
    if(this.showdealershipdropdown){
       element.size = element.childNodes.length;  
       } 
       else {
       element.size = 0;   
        }
  }
  getStoresdata(){

    let grpId = localStorage.getItem('dealerGroupId');

    let dealeruserid = localStorage.getItem('dealeruserid');
    this.storesinfo =[];

    const obj={"groupid": grpId.toString(),"brandid":"0","regionid":"0", "dealerid":"0","incentivetype" :"O", "dealerUserId" :dealeruserid };
         
    this.apiSrvc.postmethod('incentivedata/storesdata',obj).subscribe((resp:any) =>{

       if(resp.status == 200){
         this.storesinfo = resp.response.StoresData.Data;
        // localStorage.setItem("dealerShipslist",JSON.stringify(this.storesinfo));
       }
    });
 }

  changeDealership(e){
     
    localStorage.setItem('DealerId',e.target.value);
    localStorage.setItem('DealerBrand',e.target.selectedOptions[0].dataset.dealerbrand);
    localStorage.setItem('DealerShipLogo', e.target.selectedOptions[0].dataset.dealerlogo);
    //this.selectedDealership = e.target.value;
    localStorage.setItem('dealeruserid',"0");
    localStorage.setItem('glbdboardType','DS');
    this.apiSrvc.reload('dashboard');
    this.showdealershipdropdown =true;
 }


}
