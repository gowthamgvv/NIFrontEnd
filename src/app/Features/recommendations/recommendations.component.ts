import { Component, OnInit,ElementRef, } from '@angular/core';
import { ApiService } from '../../Core/_providers/api-service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {NgbPopover} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {
  entbrand_arry:any=[];

  ent_brand={"slidesToShow": 5, "slidesToScroll": 1,  
 'infinite': true, 
 'arrows': true,
 'dots': false,
 'rows':1
  };
  GetStoresList : any = [];
  Brands : any = [];
  GetAudistorelist:any=[];
  AudiBrands:any=[];
  DealerRecommendationData: any=[];
  DealerIncentiveData :any=[];
  DealerName:any=[];
  BrandID: number=0;
  DealerID: number = 0;
  dlrGropId: string;
  recombrand : any='0';
  recomDealerShipId :any='0';
  isDisabled:boolean=false;
  constructor(public apiSrvc:ApiService, private route: ActivatedRoute, private router: Router,private spinner: NgxSpinnerService,private elementRef: ElementRef) { }

  ngOnInit(): void {

    this.dlrGropId=localStorage.getItem('dealerGroupId'); 
   //this.getStoresData();
   this.getbrandlist();
  // this.getDealerRecommendation();
   this.entbrand_arry=[
    {brand:"Audi",styles:"Q3,Q5", color: "bdrgrn", Inv1: "42", Inv2: "32", Potential: "1550250", Earned: "1233500", ROI: "363", ConsumerCash: "1000", SpendCash: "8000"},
    {brand:"Audi",styles:"Q8,Q2", color: "bdrorg", Inv1: "8", Inv2: "12" , Potential: "1200250", Earned: "655249", ROI: "210", ConsumerCash: "1800", SpendCash: "4500"},
    {brand:"Audi",styles:"A3,A5", color: "bdrgrn", Inv1: "22", Inv2: "15", Potential: "1850250", Earned: "1543500", ROI: "319", ConsumerCash: "1500", SpendCash: "6000"},
    {brand:"Audi",styles:"Q2,A5", color: "bdrorg", Inv1: "32", Inv2: "22", Potential: "1750250", Earned: "923988", ROI: "220", ConsumerCash: "1200", SpendCash: "5500"},
    {brand:"Audi",styles:"Q3,A5", color: "bdrred", Inv1: "42", Inv2: "32", Potential: "1200250", Earned: "1200100", ROI: "280", ConsumerCash: "1000", SpendCash: "8000"},
    {brand:"Audi",styles:"A8,Q2", color: "bdrgrn", Inv1: "15", Inv2: "18", Potential: "1002540", Earned: "1233500", ROI: "350", ConsumerCash: "1100", SpendCash: "7000"}
  ]

   this.DealerID = parseInt(localStorage.getItem('DealerId'));
  //  this.BrandID = parseInt(localStorage.getItem('BrandId'));
  this.BrandID = parseInt(localStorage.getItem('DealerBrand'));

  if( this.DealerID !=0){
    this.getStoresData();
    this.recombrand = this.BrandID;
    this.recomDealerShipId = this.DealerID;
    this.isDisabled = true;

    this.getDealerRecommendation();
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
    this.GetAudistorelist=data.response;
    this.getDealerRecommendation();
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
          this.AudiBrands=response;
          });      
      }
      i :number=0;
      getDealerRecommendation(){
        this.spinner.show();
        const obj = { 
          "DealerGroupID": this.dlrGropId.toString(),
          "BrandId":this.BrandID,
          "DealershipId": this.DealerID 
        }
        this.apiSrvc.postmethod('recommendation/dealerrecommendationdata',obj).subscribe((response:any)=>{
           console.log(response);
           if(response.status == 200){
             if(response.response.DealerRecommendation !="Nodata")
               this.DealerRecommendationData = response.response.DealerRecommendation.Incentivedata;
             else {
              this.DealerRecommendationData=[];
             }  
             this.spinner.hide();
           }
        })
      }

      getRecmDealerID(val){
        if(val !='0')
        this.DealerID = val;
       else
         this.DealerID = 0;
       this.getDealerRecommendation();
      }

      getRecmBrandID(val){
        this.BrandID =val;
        this.DealerID = 0;
        this.getStoresData();
      } 
      ConvertStringToNumber(input: string) {
        var numeric = Number(input);
        return numeric;
    }

    openDaysExpirePopup(tooltip, greeting: string) {
      if (tooltip.isOpen()) {
        tooltip.close();
      } else {
        tooltip.open({greeting});
      }
    }

 

}
