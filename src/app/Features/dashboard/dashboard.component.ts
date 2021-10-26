import { config } from './../../app-config';
//import { environment } from './../../../environments/environment.prod';

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from '../../Authentication/login/login.component';
import { ApiService } from '../../Core/_providers/api-service/api.service';
import { NgxSpinnerService } from 'ngx-spinner';


declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Input('rcmndPopStatus') rcmndPopStatus:boolean=false;
  @Output() onRegionClick:EventEmitter<string>=new EventEmitter<string>();
  @Output() onCatgoryClick:EventEmitter<string>=new EventEmitter<string>();
  @Output() onBrandLogoClick:EventEmitter<string>=new EventEmitter<string>();
 
  @Output('brandId') brnd_Id:number=0;
  @Output('regionId') regnId:number=0;
  @Output('dealerId') dlrGropId:string="";

brndLogo:any=[];
regInfo:any=[];
regionsArray = [];
selectedchkList = [];
 selectedIndex: any=[];


public BrandsData = [
  { text: "DOMESTIC", val: "D" },
  { text: "IMPORT", val: "I" },
  { text: "LUXURY/EXOTIC", val: "L" }
];

imgUrl="http://devadmin.netimpact.com/assets/Images/BrandLogo/";

  constructor(private route: ActivatedRoute,
    private router: Router,public apiSrvc:ApiService,private spinner: NgxSpinnerService
   ) { }

  dlrGrpLogo:string="";
  showPartial:string="";
  glbInctvId:string="";
  glbInctvName:string="";
  glbdboardType:string="";
  strDealerId:string="";
  UpdatedDate: string="";
  ShowBrandsData=false;
  ShowNavbar=false;
  IncType:string='O';
  selectedInc:any='';
 

  ngOnInit() {

    // this.route.queryParams.subscribe(params => {
    //   this.brnd_Id = params['brndId'];
    //   console.log("BrandId"+this.brnd_Id)
    // });
    
    // this.dealerInfo=environment.dealerInfo;
    //this.dealerInfo=config.dealerInfo;
 

    this.spinner.show();
    this.dlrGropId=localStorage.getItem('dealerGroupId');
    if(localStorage.getItem('DealerId')!="0")
    {
      this.dlrGrpLogo=localStorage.getItem('DealerShipLogo');
      this.ShowBrandsData=false;
      this.ShowNavbar=false;
    }
    else{
      this.dlrGrpLogo=localStorage.getItem('dealerGroupLogo');
      this.ShowBrandsData=true;
      this.ShowNavbar=true;
    }
    this.glbInctvName=localStorage.getItem('glbInctvName');
    this.glbInctvId=localStorage.getItem('glbInctvId');
    this.glbdboardType=localStorage.getItem('glbdboardType');
    this.strDealerId=localStorage.getItem('glbStoreDealerId');
    this.UpdatedDate=localStorage.getItem('UpdatedDate');
  
    if(this.glbdboardType === "RI"){
      this.getRecomndInfo();
    }
    console.log("On region change"+this.regnId);
    
    //this.dealerInfo=localStorage.getItem('dealerInfo');
    //this.dealerInfo.DealerGroupID="5";
    
    this.brnd_Id=0;
    this.regnId=0;
    this.regionList();
    if(localStorage.getItem('DealerId')=="0"){   
        this.BrandsData.forEach((item: any) => {
        item.checked = 'Y';                
      });         
       
        this.selectedchkList.push({ id: "0", val: "'D'" });
        this.selectedchkList.push({ id: "1", val: "'I'" });
        this.selectedchkList.push({ id: "2", val: "'L'" });
        this.getBrandLogos("'D','I','L'");
     }
    this.getStoreIncentives(this.brnd_Id,this.IncType);
  
  }

  inctvStorInfo:any=[];
  getStoreIncentives(brndid,IncType){
    
    this.selectedInc = IncType;
     this.brnd_Id=brndid;
     let dealeruserid = localStorage.getItem('dealeruserid');
  
       const obj={"groupid": this.dlrGropId.toString(),"brandid":this.brnd_Id.toString(),"regionid":this.regnId.toString(), "dealerid":localStorage.getItem('DealerId'),"incentivetype" :IncType,"dealerUserId" :dealeruserid };
         
         this.apiSrvc.postmethod('incentivedata/storesdata',obj).subscribe((resp:any) =>{
          this.inctvStorInfo=[];
          this.spinner.hide();
           if(resp.status == "200"){
               if(resp.response!=null){
               
                 this.inctvStorInfo=resp.response.StoresData.Data;
                
             
               }
           }
         })
          
        
   }

   public selectedChange(e, btn){
    console.log(e, btn)
  }

   recmndInfo:any=[];
   getRecomndInfo(){
   
    this.spinner.show();
     const obj={ "incentiveid": this.glbInctvId.toString(),
                 "dealerid": this.strDealerId.toString(),
     };
       
       this.recmndInfo=[];
   
       this.apiSrvc.postmethod('recommendation/getinfo',obj).subscribe((resp:any) =>{
        this.spinner.hide();
           if(resp.status == "200"){
             if(resp.response!=null){
             
               this.recmndInfo=resp.response.Recommendation.Data;
               console.log("New ince Info",this.recmndInfo);
               
             }
           }
       })
     }
 

 

  getBrandLogos(type: any){

    let DataType: any = [];
    this.selectedchkList.forEach((item: any) => {
       DataType.push(item.val);    
    });         
    
    const obj={
      "dealergroupid": this.dlrGropId.toString(),
      "expression": "brand_category in ("+DataType.join(',')+")"};
    
    this.brndLogo=[];

    this.apiSrvc.postmethod('oembrands/getoembrands',obj).subscribe((resp:any) =>{
       if(resp.status == "200"){
          if(resp.response!=null){           
            this.brndLogo=resp.response;                         
          }
       }
    })
  }

  glbLogoType:string="r"; 
  onLogoClick(type){
    this.glbLogoType=type;
    
        this.getBrandLogos(type);
    this.brnd_Id=0;
   ;
    this.getStoreIncentives(this.brnd_Id,this.IncType);
  } 

 

  redirectdashbrd(brndId){
    this.brnd_Id=brndId;
  
    this.getStoreIncentives(brndId,this.IncType);
  }



  regionList() {

    this.regInfo=[];
   
    const obj = {
      region_id: 0
    };

    this.apiSrvc.postmethod('regions/get',obj).subscribe((res: any) => {
      if (res.status === 200) {
        this.regInfo = res.response;

        const roles = res.response;
        console.log(roles);
        if (roles) {
          this.regionsArray = res.response;
          // this.regTempData=this.regionsArray
          // console.log('rtd', this.regTempData);

          console.log('ra', this.regionsArray);
          // this.SpinnerService.hide();

        } 
      }
      else {
        // this.alertify.error(res.message);
      }
    }); 
  }

  showData(regionId){
    this.regnId=regionId;
   
    this.getStoreIncentives(this.brnd_Id,this.IncType);
  }

  loadHolman(){
    if(localStorage.getItem('DealerId')=="0"){
    this.regnId=0;
    this.brnd_Id=0;
    this.glbLogoType='D';
    this.getStoreIncentives(this.brnd_Id,this.IncType);
    this.regionList();
    this.getBrandLogos(this.glbLogoType);
    //this.globalIndx=-1;
    }
  }

  onRcmndClose(){
    localStorage.setItem('glbdboardType','DS');
    this.glbdboardType="DS";
  }

  // onCheckboxChange(e,i) {

  //   if (this.selectedIndex.indexOf(i) === -1) {
  //     this.selectedIndex.push(i);
  //   }
  //   else {
  //     let index = this.selectedIndex.indexOf(i);
  //     this.selectedIndex.splice(index, 1);
  //   }

  //   if(e.srcElement.checked){
  //   if (e.target.value)
  //     //console.log(e.target.value)
  //     this.selectedchkList.push("'"+ e.target.value+ "'");
  //     this.getBrandLogos(this.selectedchkList.toString());
  //   }
  //   else{
  //     // this.selectedchkList.splice(i,1);
  //     this.selectedchkList.forEach((value,index)=>{
  //       if(index==i) this.selectedchkList.splice(index,1);
  //   });
  //     this.getBrandLogos(this.selectedchkList.toString());
  //   }
  // } 


  // onCheckboxChange(e,i:number) {
  //   if (this.selectedIndex.indexOf(i) === -1) {
  //     this.selectedIndex.push(i);
  //   }
  //   else {
  //     let index = this.selectedIndex.indexOf(i);
  //     this.selectedIndex.splice(index, 1);
  //   }
  //   if(e.srcElement.checked){
  //   if (e.target.value)
  //     this.selectedchkList.push( {id : i, val:  "'"+ e.target.value+ "'"});
  //     this.getBrandLogos(this.selectedchkList);
  //   }
  //   else{
  //         this.selectedchkList = this.selectedchkList.filter(item => item.id != i);
  //     this.getBrandLogos(this.selectedchkList);
  //   }
  // }

  onCheckboxChange(e,i:number) { 
    $('.dvChk div').removeClass('checkboxCss highlight').addClass('UncheckboxCss');;
    if (this.selectedIndex.indexOf(i) === -1) {
      this.selectedIndex.push(i);
    }
    else {
      let index = this.selectedIndex.indexOf(i);
      this.selectedIndex.splice(index, 1);
    }
      this.selectedchkList=[];
      this.selectedchkList.push({id : ""+i+"", val:  "'"+ e.target.value+ "'"})
      this.getBrandLogos(this.selectedchkList);
  }

}
