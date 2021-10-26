import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/Core/_providers/api-service/api.service';

@Component({
  selector: 'app-dealer-stores',
  templateUrl: './dealer-stores.component.html',
  styleUrls: ['./dealer-stores.component.scss']
})
export class DealerStoresComponent implements OnInit {

   @Input('dlrstoreInfo') inctvStorInfo:any=[];
   @Input('brandId') brnd_Id:number=0;
   @Input('regionId') regnId:number=0;
  ackcount: any;
  
   

  constructor(private route: ActivatedRoute,
    private router: Router,public apiSrvc:ApiService) { }

  storIncntvInfo:any=[];

  upArwImg:string="";
  dwnArwImg:string="";

  dealerInfo:any=[];  


  invSafe:string="";
  invCaution:string="";
  invAlert:string="";
  onOnitStat:boolean=true;
  Result: string="";

  public isVisible: boolean = false;
  

  ngOnInit(): void {
    this.ackcount=localStorage.getItem('acknowledgecount');
    if(this.ackcount==1){
      this.ackcount= 'is '+ this.ackcount + ' new Incentive'
    }
    if(this.ackcount>1){
      this.ackcount='are '+ this.ackcount + ' new Incentives'

    }
    console.log(this.ackcount)
    if(this.ackcount!=0){

   setTimeout(()=> this.isVisible = true,2000)
   setTimeout(()=> this.isVisible = false,10000)
      // this.isVisible = true;
      // setTimeout(()=> this.isVisible = false,10000)
    }
   
    if(this.inctvStorInfo.length!=0)
    {
     
      this.Result='No Records Found !!';
      this.globalIndx=-1;
    }
    else
    {
      this.Result='';
    }
    
    this.upArwImg="assets/images/Arrow-upcircle.png";
    this.dwnArwImg="assets/images/Arrow-dwncircle.png";
  
    this.invSafe="assets/images/inv_tick.png";
    this.invCaution="assets/images/inv_caution.png";
    this.invAlert="assets/images/inv_alert.png";

    
  }



  globalIndx:number=-1;prevDlrshipId:number=0;
  onStoreClick(index:number,dlrshipId){
    localStorage.setItem('dealerstoreid',dlrshipId.toString());
    
      if(this.globalIndx==-1)
      {
          this.globalIndx=index;
          this. getSubStoreIncentives(this.brnd_Id,dlrshipId);
      }
      else if(this.prevDlrshipId==dlrshipId)
          this.globalIndx=-1;
      else
      {
        this.globalIndx=index;
        this. getSubStoreIncentives(this.brnd_Id,dlrshipId);
      }
      
        this.prevDlrshipId=dlrshipId;

       
  }

 
  clkDealerId:number=0;
  getSubStoreIncentives(brndid,dlrshpId){
      this.clkDealerId=dlrshpId;
      //  const obj={"dealerid": "5", "brandid": "1", "expression": ""};
      const obj={"BrandId": brndid,"DealershipId":dlrshpId.toString(), "IncentiveType": "" };
        
        this.storIncntvInfo=[];
    
        this.apiSrvc.postmethod('incentivedata/list',obj).subscribe((resp:any) =>{
          if(resp.status == "200"){
              if(resp.response!=null){
              
                this.storIncntvInfo=resp.response.IncentiveData.Data;
                
              }
          }
        })
    }

    onRegionCatch(regionId){
      this.regnId=regionId;
      console.log("Catch Region Id"+this.regnId);
    }

   
    onBrandLogoCatch(brandId){
      this.brnd_Id=brandId;
      console.log("Catch Brand Id"+this.brnd_Id);
    }

}
