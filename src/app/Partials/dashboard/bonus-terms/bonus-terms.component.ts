import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../../Core/_providers/api-service/api.service';
import { AlertifyService } from '../../../Core/_providers/alert-service/alertify.service';
import { MatDialog } from '@angular/material/dialog';
import { SoldUnitsDataComponent } from '../../sold-units-data/sold-units-data.component';
@Component({
  selector: 'app-bonus-terms',
  templateUrl: './bonus-terms.component.html',
  styleUrls: ['./bonus-terms.component.scss']
})
export class BonusTermsComponent implements OnInit {

  @Input('inctvDetails') inctvDetails:any=[];
  @Input('storeDealerId') strDealerId:number=0;
  @Input('storeInvId') strInvId:number=0;
  rulesArray: any = [];
  temprules: any = [];
  GoalVal=true;
  GoalEdit=true;
  GoalText=false;
  currentVal="";
  GoalValue:any;
  @ViewChild('box') searchElement: ElementRef;

  dealerid: string;
  incentiveid: string;
  display = 'Y'


  constructor(private rulesSrvc: ApiService,
    private alertify: AlertifyService, public dialog: MatDialog) { }

  // constructor(private rulesSrvc: ApiService,
  //   private alertify: AlertifyService) { }

  ngOnInit(): void { 
    this.display = 'Y'
    localStorage.setItem('glbStoreDealerId',this.strDealerId.toString());
    localStorage.setItem('storeInvId',this.strInvId.toString());
    this.dealerid = localStorage.getItem('dealerid')
    this.incentiveid = localStorage.getItem('incentiveid')
    console.log(this.dealerid);
    console.log(this.incentiveid)
    this.getrules();
    this.getGoalvalue();
  }

  private newMethod() {
    return this;
  }

  getrules() {
    this.rulesArray = [];
  
    const obj = 
    {    
      "DealerId": this.strDealerId,
      "IncentiveId":this.strInvId,
      "expression": ""
     };
    this.rulesSrvc.postmethod('termsandconditions/dealertermsandconditionsbasedonincentive', obj).subscribe((response: any) => {
      if (response.status == 200) {
        this.rulesArray = response.response;
        console.log(this.rulesArray)
       
        this.temprules = this.rulesArray;

        
      //  console.log(this.temprules)
      }
    });
  }

  getGoalvalue(){
    const obj = 
      {    
        "Dealer_Id": this.strDealerId,
        "Incentive_Id":this.strInvId
       };
       this.rulesSrvc.postmethod('dealerincentivegoles/get',obj).subscribe((response: any) => {
        if (response.status == 200) {
          if(response.response.length){
            this.GoalValue=response.response[0].DIG_Goal;
          }else{this.GoalValue="--";}     
        }
       });
  }
  viewinventory() {
    // this.xInvtryClick.emit();
    this.display = 'N';
    const dataRes = [{
      "Dealershipid": this.strDealerId,
      "incentiveid": this.strInvId,
      "lineitemid": "0"
    }
    ]

    const dialogRef = this.dialog.open(SoldUnitsDataComponent, {
      width: '100%',
      data: dataRes
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      this.display = "Y";
    });
  }

  UpdateGoal(val){
    if(val!=""){
      this.currentVal=val;
      const obj = 
      {    
        "DEALER_ID": this.strDealerId,
        "MI_ID":this.strInvId,
        "GOAL": this.currentVal
       };
       console.log(obj);
       this.rulesSrvc.putmethod('dealerincentivegoles',obj).subscribe((response: any) => {
        if (response.status == 200) {
          this.getGoalvalue();
          this.Cancel();
          this.alertify.success("Goal value updated successfully")
        }
      });
    }else{
      this.alertify.error("Please select goal");
    }
   

  }

  EditGoal(){
   this.GoalVal=false;
   this.GoalEdit=false;
   this.GoalText=true;
   setTimeout(()=>{ // this will make the execution after the above boolean has changed
    this.searchElement.nativeElement.focus();
  },0);  
  }

  Cancel(){
    this.GoalVal=true;
    this.GoalEdit=true;
    this.GoalText=false;
  }

  _keyPress(event: any) {
    const pattern = /[0-9+( )-]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


}
