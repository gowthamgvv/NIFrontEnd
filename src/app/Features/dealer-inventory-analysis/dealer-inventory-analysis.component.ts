import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Core/_providers/api-service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SoldUnitsDataComponent } from '../../Partials/sold-units-data/sold-units-data.component';
import {InventoryComponent} from '../../Partials/dashboard/inventory/inventory.component';
import {NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalDialogService } from 'src/app/Shared/modal-dialog/modal-dialog.service';
import { AlertifyService } from 'src/app/Core/_providers/alert-service/alertify.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dealer-inventory-analysis',
  templateUrl: './dealer-inventory-analysis.component.html',
  styleUrls: ['./dealer-inventory-analysis.component.scss']
})
export class DealerInventoryAnalysisComponent implements OnInit {

  dlrGropId:string="";
  BrandID: string="0";
  DealerID: string = "0";
  InventoryDataList: any=[]; 
  DealerCounts: any=[]; 

  entbrand_arry:any=[];
  greenArrow: string = "../../../assets/images/plus2.png";
  redArrow: string = "../../../assets/images/minus.png";



  ent_brand={"slidesToShow": 3, "slidesToScroll": 1,  
 'infinite': true, 
 'arrows': true,
 'dots': false,
 'rows':1 
  };
  GetStoresList : any = [];
  Brands : any = [];
  GetAudistorelist:any=[];
  AudiBrands:any=[];
  lineid: string;
  txtboundval : number=0;

  invanybrand : any='0';
  invanyDealerShipId :any='0';
  isDisabled:boolean=false;

  constructor(public apiSrvc:ApiService, private spinner: NgxSpinnerService, private route: ActivatedRoute, private router: Router,public dialog: MatDialog, private modalSrvc:ModalDialogService, private alertify: AlertifyService,) { 
    
  }

  getBrandID(val){
    this.DealerID = "0";
    if(val !='All Brands')
     this.BrandID = val;
    else
      this.BrandID = "0";
    this.getStoresData();
  } 

  getDealerID(val){
    if(val !='All Stores')
     this.DealerID = val;
    else
      this.DealerID = "0";
    this.GetInventoryData();
  } 
 
  ngOnInit(): void {
   
    this.dlrGropId=localStorage.getItem('dealerGroupId'); 
   this.getbrandlist();
   this.entbrand_arry=[
    {brand:"Audi El Paso",styles:"Q3,Q5", color: "bdrgrn", Inv1: "23", Inv2: "32", Potential: "1550250", Earned: "1233500", ROI: "22", ConsumerCash: "1000", SpendCash: "8000"},
    {brand:"Audi Fort Worth",styles:"Q8,Q2", color: "bdrgrn", Inv1: "8", Inv2: "12" , Potential: "1200250", Earned: "655249", ROI: "28", ConsumerCash: "1800", SpendCash: "4500"},
    {brand:"Audi Grapevine",styles:"A3,A5", color: "bdrgrn", Inv1: "6", Inv2: "15", Potential: "1850250", Earned: "1543500", ROI: "31", ConsumerCash: "1500", SpendCash: "6000"},
    {brand:"Audi North Miami",styles:"Q2,A5", color: "bdrgrn", Inv1: "14", Inv2: "22", Potential: "1750250", Earned: "923988", ROI: "34", ConsumerCash: "1200", SpendCash: "5500"},
    {brand:"Audi Peabody",styles:"Q3,A5", color: "bdrgrn", Inv1: "20", Inv2: "32", Potential: "1200250", Earned: "1200100", ROI: "28", ConsumerCash: "1000", SpendCash: "8000"},
  ]

  this.DealerID = (localStorage.getItem('DealerId'));
  //  this.BrandID = parseInt(localStorage.getItem('BrandId'));
  this.BrandID = (localStorage.getItem('DealerBrand'));
 
  if( this.DealerID !="0"){
    this.getStoresData();
    this.invanybrand = this.BrandID;
    this.invanyDealerShipId = this.DealerID;

    this.isDisabled = true;

    this.GetInventoryData();
  }
  else{
    this.isDisabled =false;
  }

  }

  
  getStoresData() {​​​​​​​​
    const bd = {​​​​​​​​
            Brand: this.BrandID,
            Region: "",
            dealergroupid: this.dlrGropId.toString()
        }​​​​​​​​;
     this.apiSrvc.postmethod('incentivemaster/getdealerstores',bd).subscribe((data:any)=>{
    if (data.status == 200) {​​​​​​​​
      this.GetStoresList = data.response;
      this.GetInventoryData();
          }
        }​​​​​​​​);
      }​​​​​​​​

      getbrandlist(){
        const obj={
          "dealergroupid": this.dlrGropId.toString(),
          "expression": "brand_category in ('L','I','D')"};
        
        this.apiSrvc.postmethod('oembrands/getoembrands',obj).subscribe(
          response => {
          this.Brands=response; 
          });     
        
      }
 
      toggleWithGreeting(tooltip, greeting: string) {
        if (tooltip.isOpen()) {
          tooltip.close();
        } else {
          tooltip.open({greeting});
        }
      }
      GetInventoryData(){
        this.spinner.show();
        const obj={
          "DealerGroupID": this.dlrGropId.toString(),
          "BrandId": this.BrandID,
          "DealershipId":  this.DealerID 
        };
        
        this.apiSrvc.postmethod('inventory/getinventoryanalysis',obj).subscribe(
          response => {
            console.log(response)
          // this.InventoryDataList=response.response.InventoryAnalysis.IncDetails[0].IncentiveDetails; 
          // this.DealerCounts= response.response.InventoryAnalysis.InventoryData;
          // this.spinner.hide();
          if(response.response.InventoryAnalysis.IncDetails!=undefined){
            this.InventoryDataList=response.response.InventoryAnalysis.IncDetails[0].IncentiveDetails; 
            this.DealerCounts= response.response.InventoryAnalysis.InventoryData;
            this.spinner.hide();
              }
              else{
                this.InventoryDataList=[];
                this.spinner.hide();
                this.DealerCounts=[];
              }
          });   
            
      }
	    opensales(incval, lineval) {
    console.log(incval, lineval)
    if(lineval =='1'){
      this.lineid="0"
    }
    else{
      this.lineid=lineval.LineId[0]
    }
      const dataRes = [{
        "Dealershipid": localStorage.getItem('dealerid'),
        "incentiveid": incval.IncentiveId[0],
        "lineitemid":this.lineid
      }
      ]
  console.log(dataRes)
      const dialogRef = this.dialog.open(SoldUnitsDataComponent, {
        width: '100%',
        data: dataRes
      });
  
  }
  openinventory(incval, lineval){
    console.log(incval,lineval)
    if(lineval =='1'){
      this.lineid="0"
    }
    else{
      this.lineid=lineval.LineId[0]
    }
    const dataRes = [{
      "Dealershipid": localStorage.getItem('dealerid'),
      "incentiveid": incval.IncentiveId[0],
      "lineitemid": this.lineid
    }
    ]
console.log(dataRes)

    const dialogRef = this.dialog.open(InventoryComponent, {
      width: '100%',
      data: dataRes
    });
  }

  IncId : number =0;
  lineId : number =0;
  dealershipId :number =0;
  BoundId :number = 0;
  openModal(id: string,IncId :number,lineId:number,dealershipId:number,boundVal: number,CntId:number) {
    this.modalSrvc.open(id);
    this.IncId =  IncId
    this.lineId = lineId
    this.dealershipId  = dealershipId;
   this.BoundId = CntId;
   
    this.txtboundval= boundVal;
    
    }
    closeModal(id: string) {

      if(this.BoundId == 0){
     
      const obj = {
        "incentiveid": this.IncId.toString(),
        "dealerId": this.dealershipId.toString(),
        "lineId": this.lineId.toString(),
        "value": this.txtboundval
    }

      this.apiSrvc.postmethod('inventory',obj).subscribe((response:any)=>{
          if(response.status == 200){
            console.log(response)
            this.modalSrvc.close(id);
            this.GetInventoryData();

          }
      })
    }
    else{
      const obj = {
        "invBId": this.BoundId,
        "incentiveid": this.IncId,
        "dealerId": this.dealershipId,
        "lineId": this.lineId,
        "value": this.txtboundval
    }

      this.apiSrvc.putmethod('inventory',obj).subscribe((response:any)=>{
          if(response.status == 200){
            console.log(response)
            this.modalSrvc.close(id);
            this.GetInventoryData();

          }
      })
    }

      }

      numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
    
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          this.alertify.error("Enter Numbers only!!")
          return false;
        }
    
        return true;
    
      }
      CloseOverAllModal(id: string){
        this.modalSrvc.close(id);
      }
}

