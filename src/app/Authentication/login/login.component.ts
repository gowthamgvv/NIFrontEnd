import { config } from './../../app-config';
import { Component, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../Core/_providers/api-service/api.service';
import { LoginModel } from '../../Core/_models/login';
import { AlertifyService } from '../../Core/_providers/alert-service/alertify.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ChatService } from '../../Core/_providers/services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  @ViewChild('form') form: NgForm;


  decodedToken: any;
  jwtHelper = new JwtHelperService();
  loading = false;
  public  dealerInfo:any=[]; 


  constructor(
    private apiSrvc: ApiService,
    private router: Router,
    private alertify: AlertifyService,
    private chatService: ChatService
    
  ) { }

  ngOnInit(): void { }

  loggedIn() {
    return this.apiSrvc.loggedIn();
  }

  login() {
    if (this.form.invalid) { return false; }
    const loginModel = new LoginModel(this.username, this.password);
    this.loading = true;
    this.apiSrvc.login(loginModel).subscribe((res: any) => {
      console.log(res)
      if (res.status === 200) {
        const user = res.response;
        if (user) {
          localStorage.setItem('NetImpFrtEND_Token', user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
         
            this.alertify.success('Logged in successfully');
        
      
          console.log('pk', this.decodedToken );
          this.dealerInfo=this.decodedToken;
          localStorage.setItem('acknowledgecount',this.dealerInfo.AcknowledgeCount);

          localStorage.setItem('dealerGroupId',this.dealerInfo.DealerGroupID);
          localStorage.setItem('dealerGroupLogo',this.dealerInfo.DealerGroupLogo);
          localStorage.setItem('glbInctvName',"");
          localStorage.setItem('glbInctvId',"");
          localStorage.setItem('glbdboardType','DS');
          localStorage.setItem('glbStoreDealerId',"");
          localStorage.setItem('DealerId',this.dealerInfo.DealerId); 
          localStorage.setItem('DealerShipLogo',this.dealerInfo.DealerShipLogo);    
          localStorage.setItem('BrandId',this.dealerInfo.BrandId); 
          //environment.dealerInfo=this.dealerInfo;
          //config.dealerInfo=this.dealerInfo;
          localStorage.setItem('Role', this.dealerInfo.Role)
          localStorage.setItem('RoleUniqId',this.dealerInfo.Role);
          this.chatService.start();
          this.router.navigateByUrl('dashboard');
        }
      }
      else {
        this.alertify.error(res.error);
      }
      this.loading = false;
    });
  }
}
