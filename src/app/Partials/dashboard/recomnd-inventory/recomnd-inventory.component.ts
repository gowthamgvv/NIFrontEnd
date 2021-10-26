import { Component, EventEmitter, Input, OnInit,Output } from '@angular/core';
import { environment } from './../../../../environments/environment.prod';
import { ApiService } from '../../../Core/_providers/api-service/api.service';
import { MatDialog} from '@angular/material/dialog';
import {ChartComponent} from '../../../Features/chart/chart.component';
import {InventoryComponent} from '../inventory/inventory.component'

@Component({
  selector: 'app-recomnd-inventory',
  templateUrl: './recomnd-inventory.component.html',
  styleUrls: ['./recomnd-inventory.component.scss']
})
export class RecomndInventoryComponent implements OnInit {

  @Output() xRecmndClick:EventEmitter<any>=new EventEmitter<any>();
  @Input('recomndInfo') recomndInfo:any=[];
  @Input('InctvId') inctvId:number=0;
  @Input('storeDealerId') storDealerId:number=0;
  @Input('InctvName') InctvName:string="";

   dealerInfo:any=[];
   loadInvntryByStock:any=[{"Year":"","MakeId":"","ModelId":""}];


  //invNameInfo:any=[];
  UpdatedDate: string="";

  constructor(public apiSrvc: ApiService, public dialog: MatDialog) { }
 
  ngOnInit(): void {
    this.UpdatedDate=localStorage.getItem('UpdatedDate');
  }

  onRecomndClose(){
    this.xRecmndClick.emit();
  }
 
  gridStat:string="";
  viewIndex:number=0;glbModelName:string="";
  onView(index,lineId,modelName){
    this.glbModelName=modelName;
    this.gridStat="V";
    this.viewIndex=index;
    console.log("view index"+index);
    this.getRecomndDetails(lineId);
  }
  checking(val){
    console.log(val)
  }

  recomndDetails:any=[];
  getRecomndDetails(lineId){
   
    const obj={
      "incentiveid": this.inctvId.toString(),
      "dealerid": this.storDealerId.toString(),
      "lineid": lineId.toString()
    };
      
      this.recomndDetails=[];
  
      this.apiSrvc.postmethod('incentivedata/recommendation',obj).subscribe((resp:any) =>{
         if(resp.status == "200"){
            if(resp.response!=null){           
              this.recomndDetails=resp.response.Details;                     
            }
         }
      })
    }


    showInvntry:boolean=false;
    viewInventory(){
      this.showInvntry=true;
      // alert(this.showInvntry)
      this.loadInvntryByStock=[];
      this.loadInvntryByStock["Year"] = 0;
      this.loadInvntryByStock["MakeId"] = 0;
      this.loadInvntryByStock["ModelId"] = 0;
      this.showInvntry = true;
      // this.loadInvntryByStock = [];
      const dialogRef = this.dialog.open(InventoryComponent, {
        width: '100%',
        data: this.loadInvntryByStock

      });
    }
  
    hideInventory(){
      this.showInvntry=false;
     
    }

    // loadIntryByStk(year,makeid,modelid){
    //   this.loadInvntryByStock["Year"]=year;
    //   this.loadInvntryByStock["MakeId"]=makeid;
    //   this.loadInvntryByStock["ModelId"]=modelid;
    //   this.showInvntry=true;
    // }

  

loadIntryByStk(year,makeid,modelid){​​​​​​​​
 console.log(this.loadInvntryByStock)
if(this.loadInvntryByStock.length===0)
 {​​​​​​​​
    this.loadInvntryByStock=[{​​​​​​​​"Year":"","MakeId":"","ModelId":""}​​​​​​​​];
 }​​​​​​​​
    this.loadInvntryByStock["Year"]=year;
    this.loadInvntryByStock["MakeId"]=makeid;
    this.loadInvntryByStock["ModelId"]=modelid;
    this.showInvntry=true;
    console.log(this.loadInvntryByStock)
   const dialogRef = this.dialog.open(InventoryComponent, {
        width: '100%',
        data: this.loadInvntryByStock
        
      });
}

 openDialog(TrendInfo): void {
   console.log(TrendInfo)
  localStorage.setItem('TrendInfo',TrendInfo);
  const dialogRef = this.dialog.open(ChartComponent, {
    width: '800px',
    data: {}
  });
 
}
 

}
