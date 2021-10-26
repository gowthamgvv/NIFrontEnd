import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../Core/_providers/api-service/api.service';
import {AdminServiceService} from '../../Core/_providers/admin-service/admin-service.service'
import { environment } from '../../../environments/environment'
import { Router } from '@angular/router';


@Component({
  selector: 'app-detaildealerincentive',
  templateUrl: './detaildealerincentive.component.html',
  styleUrls: ['./detaildealerincentive.component.scss']
})
export class DetaildealerincentiveComponent implements OnInit {


incentiveacceptdata:any=[]
incentivedata:any =[];
termsandconditions: any =[];
incentivemaster:any=[];
incentivevariables:any=[];
incentivelineitems:any=[];

FromDate:any;
ToDate:any;

BrandImage:any;
Mi_Name: any;
TypeName:any;
dealeraccept: any;

regionsdata:any=[];

fullUrl = `${environment.apiUrl}`;
imagebinding = this.fullUrl + 'resources/images/'

DealerName:any;


  constructor(private ApiService:ApiService,private adminService:AdminServiceService,private route:Router) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('incentiveid'))
this.DealerName=localStorage.getItem('dealername')
    this.incentiveacceptdata=[];
      const obj = {
        "IND_MI_ID":localStorage.getItem('incentiveid')
    }
      this.ApiService.postmethod('incentiveaccept/statusbyid', obj).subscribe((response: any) => {
        if (response.status == 200) {
          if(response.response.length !=0)
          {
            // this.data=true;
            this.incentiveacceptdata = response.response;
  
          }
        }
      });
      const obj1 = {
        "IncentiveId": localStorage.getItem('incentiveid'),
        "DealerId": localStorage.getItem('dealerid'),
        "expression": ""
      }
      console.log(obj1)
      this.adminService.postmethod('incentivedata/forntendincentivesdata', obj1).subscribe(res => {
        console.log(res);
        if (res.status == 200) {
        this.incentivedata=res.response.IncentiveInfo
          this.termsandconditions=[]
        if(this.incentivedata.TermsAndConditions!= undefined && this.incentivedata.TermsAndConditions!=''){
          this.termsandconditions=this.incentivedata.TermsAndConditions[0].TermsAndCondition
        }

        if(this.incentivedata.IncentiveMasters!=undefined && this.incentivedata.IncentiveMasters!=''){
          this.incentivemaster= this.incentivedata.IncentiveMasters[0].IncentiveMaster[0];
        this.BrandImage=this.incentivemaster.BrandLogo[0]
          this.Mi_Name=this.incentivemaster.MI_NAME[0]
          this.TypeName=this.incentivemaster.typename[0];
          this.dealeraccept = this.incentivedata.DealerAccepts[0].DealerAccept[0].IND_DealerAcept
          console.log("Dealer Accept" + this.dealeraccept)
        }

        if(this.incentivedata.IncentiveVariables!=undefined && this.incentivedata.IncentiveVariables!=''){
          this.incentivevariables=this.incentivedata.IncentiveVariables[0].IncentiveVariable
          for (var i = 0; i < this.incentivevariables.length; i++) {
            if (this.incentivevariables[i].INV_MIV_ID == 8)
             this.FromDate = this.incentivevariables[i].INV_DATA;
            if (this.incentivevariables[i].INV_MIV_ID == 9)
            this.ToDate = this.incentivevariables[i].INV_DATA;
            if (this.incentivevariables[i].INV_MIV_ID == 5)
      this.regionsdata.push(this.incentivevariables[i].regioname)
          
        }
        }
        if (this.incentivedata.IncentiveLineItems != undefined && this.incentivedata.IncentiveLineItems != "" ) {
          this.incentivelineitems = this.incentivedata.IncentiveLineItems[0].IncentiveLineItem
          console.log(this.incentivelineitems)
        }
        
        }
      })

    
  }
  navigate(){
this.route.navigateByUrl('/New Incentives')
  }

}
