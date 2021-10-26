import { Component, ElementRef, OnInit, Renderer2, ViewChild,Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/Core/_providers/api-service/api.service';
import { Router } from '@angular/router';
import { async } from 'rxjs';


declare var $: any;

@Component({
  selector: 'app-store-incentives',
  templateUrl: './store-incentives.component.html',
  styleUrls: ['./store-incentives.component.scss']
})
export class StoreIncentivesComponent implements OnInit {

  
  @Input('strIncentiveInfo') strIncentiveInfo:any=[];
  @Input('storeDealerId') strDealerId:number=0;

  // @ViewChild('bonusTerm') bonusTerm:ElementRef;
  // @ViewChild('incClick') incClick:ElementRef;
  // @ViewChild('strClick') strClick:ElementRef;

  constructor(private renderer:Renderer2,public apiSrvc:ApiService,private router: Router) { 

  }

  onExpand:boolean=false;


  upStrArwImg:string="";
  dwnStrArwImg:string="";


  invStrSafe:string="";
  invStrCaution:string="";
  invStrAlert:string="";


  ngOnInit(): void {
    
    localStorage.setItem('glbStoreDealerId',this.strDealerId.toString());
    this.globaInctvlIndx=-1;
    this.upStrArwImg="assets/images/Arrow-upcircle.png";
    this.dwnStrArwImg="assets/images/Arrow-dwncircle.png";

    this.invStrSafe="assets/images/inv_tick.png";
    this.invStrCaution="assets/images/inv_caution.png";
    this.invStrAlert="assets/images/inv_alert.png";
   

   
  }

  globaInctvlIndx:number=-1;
  inctvIdInfo:number=0;
  onInctvClick(index:number,inctvid:any){
   
    this.onExpand=true;
    this.inctvIdInfo=inctvid;
    this.getIncDetails(this.inctvIdInfo);
   
    if(this.globaInctvlIndx==-1)
     this.globaInctvlIndx=index;
     else
     this.globaInctvlIndx=-1;
    
    

  }

  onOuterClick(){
  
    this.onExpand= false;

    this.globaInctvlIndx =-1;
  }


 incDetailpop:any=[];
 getIncDetails(inctvid:number){
  
  const obj={
    "DealerId": this.strDealerId.toString(),   
  "incentiveid":inctvid.toString()
};
  
  this.incDetailpop=[];

  this.apiSrvc.postmethod('incentivedata/detailsinfo',obj).subscribe((resp:any) =>{
      if(resp.status == "200"){
        if(resp.response!=null){
        
          this.incDetailpop=resp.response.Details;
         
          
              }
           }
        })
      }


glbRecmndPop:boolean=false;glbInctvId:number=0;glbInctvName:string="";
openRecomnd(inctvId,inctvname){
  this.glbInctvId=inctvId;
    this.glbRecmndPop=true;
    this.glbInctvName=inctvname;
    localStorage.setItem('glbInctvName',inctvname);
    localStorage.setItem('glbInctvId',inctvId);
    localStorage.setItem('glbdboardType','RI');

    
    this.apiSrvc.reload('dashboard');
}

  




  


  

}
