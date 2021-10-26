import { config } from './../../app-config';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../Core/_providers/api-service/api.service';

@Component({
  selector: 'app-view-incentive',
  templateUrl: './view-incentive.component.html',
  styleUrls: ['./view-incentive.component.scss']
})
export class ViewIncentiveComponent implements OnInit {

  incentiveInfo:any=[]; 
  soldUnits:number=0;
  bonusEarned:number=0;
  projUnits:number=0;
  projectedEarnings:number=0;
  totalInfo:any=[];
  paramIndex:string="";  
  dealerInfo:any=[];
  dlrId:number=0;
  dlrGropId:string="";

  constructor(private route: ActivatedRoute,public apiSrvc:ApiService) { }



  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.paramIndex = params['inctvId'];
       this.dlrId =  params['dlrId'];
      console.log("Pram Index"+this.paramIndex)
    });
    //this.dealerInfo=environment.dealerInfo;
    //this.dealerInfo=config.dealerInfo;
    //this.dealerInfo=localStorage.getItem('dealerGroupId');
    this.dlrGropId=localStorage.getItem('dealerGroupId');
    //this.dealerInfo.DealerGroupID="5";
    console.log("DealerInfo"+this.dealerInfo.DealerGroupID);
    this.getIncentives(this.paramIndex);
    localStorage.setItem('dealerid',this.dlrId.toString());
    localStorage.setItem('incentiveid',this.paramIndex.toString());
  }


  getIncentives(inctvid:string){
    const obj={"dealerid":this.dlrId.toString(),"incentiveid":inctvid.toString()};
    
    this.incentiveInfo=[];

    this.apiSrvc.postmethod('incentivedata/itemsdata',obj).subscribe((resp:any) =>{
       if(resp.status == "200"){
          if(resp.response!=null){
            this.incentiveInfo=resp.response.IncentiveInfo;
            this.sumupIncentives();
          }
       }
    })
  }

  incInfo:any=[];
  sumupIncentives(){
    this.totalInfo=[];
   this.incInfo=[];
   this.soldUnits=0;
   this.bonusEarned=0;
   this.projUnits=0;
   this.projectedEarnings=0;

   this.incInfo=this.incentiveInfo.rawdata;
    if(this.incInfo.length!=0){
      console.log("length"+this.incInfo.length);
       for(let info=0;info<this.incInfo.length;info++){
         this.soldUnits=this.soldUnits+Number(this.incInfo[info].DID_SOLD_UNITS);
         console.log("sold value"+Number(this.incInfo[info].DID_SOLD_UNITS));
         this.bonusEarned= this.bonusEarned+Number(this.incInfo[info].DID_BONUS_EARNED);
         this.projUnits=this.projUnits+Number(this.incInfo[info].DID_PROJECTED_UNITS);
         this.projectedEarnings=this.projectedEarnings+Number(this.incInfo[info].DID_PROJECTED_EARNINGS);
       }
       this.totalInfo.push(this.soldUnits);
       this.totalInfo.push(this.bonusEarned);
       this.totalInfo.push(this.projUnits);
       this.totalInfo.push(this.projectedEarnings);
    }
       
  }
}
