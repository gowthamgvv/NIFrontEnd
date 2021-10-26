import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ApiService } from '../../Core/_providers/api-service/api.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-consumer-incentives',
  templateUrl: './consumer-incentives.component.html',
  styleUrls: ['./consumer-incentives.component.scss']
})
export class ConsumerIncentivesComponent implements OnInit {

  entbrand_arry:any=[];
  id: any;

  ent_brand={"slidesToShow": 1, "slidesToScroll": 1,  
 'infinite': true, 
 'arrows': true,
 'dots': false,
 'rows':1 
  };
  GetStoresList : any = [];
  Brands : any = [];
  GetAudistorelist:any=[];
  AudiBrands:any=[];

  enhancedIncentivesData:any=[]; 
  ProgramValuesData:any=[]; 
  Consumer : any;
 

  constructor(public apiSrvc:ApiService, private route: ActivatedRoute, private router: Router, private httpClient: HttpClient, private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.params.id;

   }

  ngOnInit(): void {

   this.GetData();

    
   this.entbrand_arry=[
    {brand:"Audi",styles:"Q3,Q5", color: "bdrgrn", Inv1: "42", Inv2: "32", Potential: "1550250", Earned: "1233500", ROI: "363", ConsumerCash: "1000", SpendCash: "8000"},
    {brand:"Audi",styles:"Q8,Q2", color: "bdrorg", Inv1: "8", Inv2: "12" , Potential: "1200250", Earned: "655249", ROI: "210", ConsumerCash: "1800", SpendCash: "4500"},
    {brand:"Audi",styles:"A3,A5", color: "bdrgrn", Inv1: "22", Inv2: "15", Potential: "1850250", Earned: "1543500", ROI: "319", ConsumerCash: "1500", SpendCash: "6000"},
    {brand:"Audi",styles:"Q2,A5", color: "bdrorg", Inv1: "32", Inv2: "22", Potential: "1750250", Earned: "923988", ROI: "220", ConsumerCash: "1200", SpendCash: "5500"},
    {brand:"Audi",styles:"Q3,A5", color: "bdrred", Inv1: "42", Inv2: "32", Potential: "1200250", Earned: "1200100", ROI: "280", ConsumerCash: "1000", SpendCash: "8000"},
    {brand:"Audi",styles:"A8,Q2", color: "bdrgrn", Inv1: "15", Inv2: "18", Potential: "1002540", Earned: "1233500", ROI: "350", ConsumerCash: "1100", SpendCash: "7000"}
  ] 
  }

  GetData(){
    this.httpClient.get("assets/jsonfiles/enhancedIncentives.json").subscribe(
      response=>{
        console.log("CHekck :", response)
      this.enhancedIncentivesData = response;
      this.ProgramValuesData = this.enhancedIncentivesData.oemRebates;

      var filtered = this.ProgramValuesData.filter(e => e.programId == this.id); 
      this.Consumer = filtered[0];

      console.log("Finakl Obj :",filtered);
    });
  }


  
  
}
