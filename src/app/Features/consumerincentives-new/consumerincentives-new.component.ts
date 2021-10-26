import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ApiService } from '../../Core/_providers/api-service/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
 
@Component({
  selector: 'app-consumerincentives-new',
  templateUrl: './consumerincentives-new.component.html',
  styleUrls: ['./consumerincentives-new.component.scss']
})
export class ConsumerincentivesNewComponent implements OnInit {
 
  enhancedIncentivesData:any=[]; 
  ProgramValuesData:any=[]; 
  incentvsColumns: any = ["programName"];
  incentivesForm: FormGroup
  alphaSrch: string = '';
 
  
 
 
  constructor(private httpClient: HttpClient, public apiSrvc:ApiService, private formBuilder: FormBuilder) {
    
   }
 
  ngOnInit(): void {    
    this.GetData();
    this.incentivesForm = this.formBuilder.group({
      txtSearch: ''
    })
  }
 
  onSearch() {
    this.alphaSrch = this.incentivesForm.controls['txtSearch'].value;
  }
 
  GetData(){
    this.httpClient.get("assets/jsonfiles/enhancedIncentives.json").subscribe(
      response=>{
      this.enhancedIncentivesData = response;
      this.ProgramValuesData = this.enhancedIncentivesData.oemRebates;
      console.log('manojkrishna', this.ProgramValuesData);      
    });
  }
 
}