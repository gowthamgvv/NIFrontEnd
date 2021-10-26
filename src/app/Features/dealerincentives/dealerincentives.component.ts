import { Component, OnInit, ViewChild } from '@angular/core';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminServiceService } from '../../Core/_providers/admin-service/admin-service.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../Core/_providers/alert-service/alertify.service';
import { environment } from '../../../environments/environment'
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import * as $ from 'jquery';
import { threadId } from 'worker_threads';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
 import {ApiService} from '../../Core/_providers/api-service/api.service'
//  import { NgbActiveModal,NgbModal } from '@ng-bootstrap/ng-bootstrap'
 
@Component({
  selector: 'app-dealerincentives',
  templateUrl: './dealerincentives.component.html',
  styleUrls: ['./dealerincentives.component.scss'],
  providers: [AngularMultiSelectModule],

})
export class DealerIncentivesComponent implements OnInit {
  dealergroup: any;
  staticarray: any = [];
  show: boolean = false;

  public dealerspecificvalues: any = []
  public response: any = []
  public data: any = []
  public dealerdata: any = [];
  public AvailableBonus: any = []
  public Fromdate; any = [];
  public Todate: any = [];
  public IncImage: any = []
  public perunit: any = []
  id: any;
  view: boolean = false;
  Incentiveid: number;
  fullUrl = `${environment.apiUrl}`;
  dealerspecific: FormGroup;
  detailsdealerspecific: FormGroup;
  detailSpecFormGroup: FormGroup;

  imagebinding = this.fullUrl + 'resources/images/'
  @ViewChild('closebutton') closebutton;
  submitted: boolean;
  ComponentFinalArray: any[];
  ComponentDetailsArray: any[];
  inc_id: any;
  dealer_id: any;
  array: any;
  incentiveVariables: any = [];
  tacdata: any = [];
  regionsdata: any;
  filterData: any;
  glbCntrEval: number = 0;
  // check: string='openModal1';

  popup: boolean;
  IsShowMenu: boolean = true;
  dealerspecificdesvalue: any;
  btnsub: boolean = false;
  checkingarray: any;
  dealerlen: number;
  notes: string;
  dealerstatus: any;
  buttons: boolean;
  acceptbutton: boolean = false;
  incentivedata: any;
  termsandconditions: any;
  incentivevariables: any = [];
  incentivemaster: any;
  incentivelineitems: any;
  dealeraccept: any;
  regionsData: any = [];
  fromDate: any;
  tncdealerspecificvalues: any = [];
  tncdealerspecificdelete: any[];
  incentivelineitemsdealers: any[];
  termsForm: FormGroup;
  termsynObj: any = [];
  searchQuery:any;
  ack: boolean;
  result: boolean;
  grpresult:boolean;
  dropdownSettingsSingle = {};
  dealerSpecData = [];
  ackDetail = false;
  enableackowledge: boolean;
  alphaSrch: string = '';
  alphaColumns: any = ['MI_NAME'];
  edittandc: string;
  tncdealerspecificyorn: any;
  SearchIncentiveForm: FormGroup;
  term: any='C';

  selectedSearchBrandItems=[];
  brandSettings={};
  serachBrands: any = [];
  selectedSearchStoreItems=[];
  storeSettings={};
  serachstores: any=[]
  OemBrands: any[];
  dlrGropId: any;
  brnd_Id: any;
  stores: any;
  srchBrids: any =[];
  srchstrids: any =[];
  incentiveacceptdata: any[];

   
    constructor( private router:Router, private ApiService: ApiService,private adminService: AdminServiceService, private SpinnerService: NgxSpinnerService, private alertify: AlertifyService, private fB: FormBuilder) {
    this.dealerspecific = this.fB.group({
      quantities: this.fB.array([]),
      notes: [''],

    });
    this.detailsdealerspecific = this.fB.group({
      d_quantities: this.fB.array([]),
      d_notes: [''],

    });

  }
  ngOnInit(): void {
  //  this.viewdetailinformation('39','9')
    this.GetBrandsList();
    this.getStoreIncentives('0');
    this.dealergroup = localStorage.getItem('dealerGroupId')
    this.edittandc = 'N'
    this.id = localStorage.getItem('DealerId')
    console.log(this.id)
    if (this.id == 0) {
      this.getbasedongroup();
    }
    else {
      this.get();

    }
    this.notes = "";
    this.glbCntrEval = 0;
    this.dropdownSettingsSingle = {
      singleSelection: true,
      text: 'Select',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class',
      primaryKey: "id",
      badgeShowLimit: 1
      //lazyLoading : true
    };
    //  this.getbasedongroup()
    this.selectedSearchBrandItems=[];
    this.brandSettings={
      singleSelection: false,
      text: 'Select Brand',
    
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class',
      primaryKey:"id",
      badgeShowLimit:1
    }
    this.storeSettings={
      singleSelection: false,
      text: 'Select Store',
    
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class',
      primaryKey:"id",
      badgeShowLimit:1
    }
    this.detailSpecFormGroup = this.fB.group({
      detailsValues: new FormArray([]),
    })
    this.termsForm = this.fB.group({
      TermsInfo: this.fB.array([])
    });
    this.SearchIncentiveForm = this.fB.group({
      txtsearch: '',
    
    });

  }
  GetBrandsList() {
    this.OemBrands = [];
    this.dlrGropId=localStorage.getItem('dealerGroupId');
    const obj = { dealergroupid: this.dlrGropId,'expression' : '' };
    this.ApiService.postmethod('oembrands/getoembrands', obj).subscribe(
      (response: any) => {
        if (response.message == 'success') {
          this.OemBrands = response.response;
          this.serachBrands = response.response;
console.log(this.serachBrands)
          let arr = [];
          this.OemBrands.forEach((element) => {
            arr.length === 0
              ? (arr = [{ id: element.brand_chrome_id, itemName: element.brand_name }])
              : arr.push({
                  id: element.brand_chrome_id,
                  itemName: element.brand_name,
                });
          });
          this.serachBrands = arr;
console.log(this.serachBrands)

          // if (this.selectedbrandid != '') {
          //   if (this.selectedbrandid.length > 0) {
          //     for (let i = 0; i < this.selectedbrandid.length; i++) {
          //       //this.Brands.splice(this.selectedbrandid[i],1);
          //       this.OemBrands = this.OemBrands.filter(
          //         (item) => item.brand_chrome_id != this.selectedbrandid[i]
          //       );
          //     }
          //   }
          // }
          //console.log(this.Brands)
        }
      }
    );
  }
  onBrandItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedSearchBrandItems);
    this.selectedSearchStoreItems=[];
    this.getbasedongroup();

  }
  OnBrandItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedSearchBrandItems);
    this.selectedSearchStoreItems=[];

    this.getbasedongroup();

  }
  onBrandSelectAll(items: any) {
    console.log(items);
this.selectedSearchStoreItems=[];

this.getbasedongroup();

  }
  onBrandDeSelectAll(items: any) {
    console.log(items);
 this.selectedSearchStoreItems=[];

 this.getbasedongroup();

  }
  getStoreIncentives(brndid){
    
     this.brnd_Id=brndid;
  
       const obj={"groupid": this.dlrGropId.toString(),"brandid":this.brnd_Id.toString(),"regionid":"0", "dealerid":localStorage.getItem('DealerId'), "incentivetype":"O" };
         
         this.ApiService.postmethod('incentivedata/storesdata',obj).subscribe((resp:any) =>{
          this.serachstores=[];
           if(resp.status == "200"){
               if(resp.response!=null){
               this.stores=resp.response.StoresData.Data;
                 this.serachstores=resp.response.StoresData.Data;
                 console.log(this.serachstores)
                 let arr = [];
                 this.stores.forEach((element) => {
                   arr.length === 0
                     ? (arr = [{ id: element.dealerid, itemName: element.dealername }])
                     : arr.push({
                         id: element.dealerid,
                         itemName: element.dealername,
                       });
                 });
                 this.serachstores = arr;
       console.log(this.serachstores)
             
               }
           }
         })
          
        
   }

  onStoreItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedSearchStoreItems);
    this.selectedSearchBrandItems=[]
    this.getbasedongroup()
  }
  OnStoreItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedSearchStoreItems);
    this.selectedSearchBrandItems=[]

    this.getbasedongroup()
  }
  onStoreSelectAll(items: any) {
    console.log(items);
    this.selectedSearchBrandItems=[]

    this.getbasedongroup()
  }
  onStoreDeSelectAll(items: any) {
    console.log(items);
    this.selectedSearchBrandItems=[]

    this.getbasedongroup()

  }
  viewdetailinformation(val) {
  //  localStorage.setItem('incentiveid',incid)
  localStorage.setItem('dealerid',val.IND_Dealer_id)
  localStorage.setItem('dealername',val.dealer_name)
console.log(val)
    this.router.navigateByUrl('/incentivepooldetails')
 
  }

  searchFilter() {
    //  alert(val)
    if (this.id == 0) {
      console.log(this.searchQuery)
      let searchValue = this.searchQuery;
      if (searchValue == '') {
        this.dealerdata = this.data;
      } else {
        this.dealerdata = this.data.filter(item => {
          if (searchValue == '') {
            this.dealerdata = this.data;
          } else {
            if (item.MI_NAME != null && item.MI_NAME != "") {
              return item.MI_NAME.toUpperCase().includes(searchValue.trim().toUpperCase())
           
            } 
          }  
         
        })
        console.log(this.dealerdata.length)
        if(this.dealerdata.length==''){
          this.grpresult=true
        }
        else{
          this.grpresult=false
        }
      }
    }
    else {
      console.log(this.searchQuery)
      let searchValue = this.searchQuery;
      if (searchValue == '') {
        this.data = this.dealerdata;
      } else {
        this.data = this.dealerdata.filter(item => {
          if (searchValue == '') {
            this.data = this.dealerdata;
          } else {
            if (item.MI_NAME != null && item.MI_NAME != "") {
             
              return item.MI_NAME.toUpperCase().includes(searchValue.trim().toUpperCase())
           
            } 

          }  
         
        })
        console.log(this.data.length)
        if(this.data.length==''){
          this.result=true
        }
        else{
          this.result=false
        }
       }

    }
     
    }

  get() {
    console.log('hii')
    const obj = {
      "ID": this.id,
      "type":this.term,
      "incentiveType": "O"
      //"ID": 564897
    }
    this.adminService.postmethod('incentiveaccept/basedondealer', obj).subscribe(res => {
      console.log('get')
      console.log(res)
      this.response = res
      if (this.response.status == 200) {
        this.data = this.response.response;
        this.dealerdata = this.data
        console.log(this.data)
        console.log(this.dealerdata);
        if (this.data.length != 0) {
          this.result = false
        }
        else {
          this.result = true
        }

      }
    })
  }
  getterm(e){
    this.searchQuery=''
    console.log(e.target.value)
this.term=e.target.value;
if (this.id == 0) {
  this.getbasedongroup();
}
else {
  this.get();

}

  }
  getbasedongroup() {
    //console.log('hii')
    if(this.selectedSearchBrandItems.length!=0){
      for(var i=0;i<this.selectedSearchBrandItems.length;i++){
        this.srchBrids.push(this.selectedSearchBrandItems[i].id)
      }
    }
  
    if(this.selectedSearchStoreItems.length!=0){
      for(var i=0;i<this.selectedSearchStoreItems.length;i++){
        this.srchstrids.push(this.selectedSearchStoreItems[i].id)
      }
    }
    const obj = {
      "GroupID": 4,
      "type":this.term,
      "BrandIds":this.srchBrids.join(','),
      "DealerIds":this.srchstrids.join(','),
      "IncentiveType": "O" 
      //"ID": 564897'

    }
    console.log(obj)
    this.adminService.postmethod('incentiveaccept/poolbasedondealer', obj).subscribe(res => {
      console.log('responce by group')
      console.log(res)
      this.response = res
      this.srchBrids=[];
      this.srchstrids=[];
      if (this.response.status == 200) {
        this.data = this.response.response;
        this.dealerdata = this.data;
        //   console.log(this.data)
        console.log(this.dealerdata);
     this.srchBrids=[];
     this.srchstrids=[];

        var obj = {};

        for (var i = 0, len = this.dealerdata.length; i < len; i++)
          obj[this.dealerdata[i]['MI_NAME']] = this.dealerdata[i];
        this.dealerdata = new Array();
        for (var key in obj)
          this.dealerdata.push(obj[key]);
        console.log(this.dealerdata)
        this.data=this.dealerdata
        if (this.data.length != 0) {
          this.grpresult = false
        }
        else {
          this.grpresult = true
        }

      }
    })
  }

  UpdateStatus(inmid, dealerid) {
    console.log(inmid)
    console.log(dealerid)
    const obj = {
      "inm_id": inmid,
      "dealer_id": dealerid,
      "IncentiveType": "" 
    }
    this.adminService.postmethod('incentiveaccept', obj).subscribe(res => {
      console.log(res)
      if (res.status == 200) {
        //  this.alertify.success("Request Accepted")
        // alert("Request Accepted")
        this.get();
      }
      else {
        // alert("Please Check Details")
        //  this.alertify.error("Request Not Accepted")
      }
    })
  }
  TermsInfo(): FormArray {
    return this.termsForm.get('TermsInfo') as FormArray;
  }
  termsvalue(dt): FormGroup {
    return this.fB.group({
      label: [dt.MIT_DISPLAYNAME],
      //  values: [dt.DealerValue]
      dtctermvalue: ['N', [Validators.required]],


    });
  };
  termsAction() {

    this.termsynObj = [];

    for (var x in this.tncdealerspecificyorn) {
      (<FormArray>this.termsForm.get('TermsInfo')).push(this.termsvalue(this.tncdealerspecificyorn[x]));
      // (<FormArray>this.dealerspecific.get('quantities')).push(this.value(this.tncdealerspecificvalues[T]));

    }

  }
  getValu(eva, ind) {
    console.log('Evnt :', eva);
    console.log('Form array ', this.termsForm);


    if (eva.target.checked == true) {
      console.log('read', eva.target.checked);
      this.termsForm.get('TermsInfo').value[ind].dtctermvalue = 'Y';
    }
    else {
      this.termsForm.get('TermsInfo').value[ind].dtctermvalue = 'N';
    }

    console.log('maaa', this.termsForm);

  }






  quantities(): FormArray {
    return this.dealerspecific.get('quantities') as FormArray;
  }

  newQuantity(): FormGroup {
    return this.fB.group({
      label: '',
      values: ['', Validators.required]
    });
  }

  value(dt): FormGroup {
    return this.fB.group({
      label: [dt.MIT_DISPLAYNAME],
      values: [dt.DealerValue]

    });
  };
 
  onSearch() {
    this.alphaSrch = this.dealerdata.controls['txtsearch'].value;
    console.log(this.alphaSrch);
  //  this.incentivesArray = this.tempincentives;
  }

  remove(i: number) {
    this.quantities().removeAt(i);
  }
  acceptstatus() {
    this.popup = true;
  }
  cancelpopup() {
    this.popup = false;
  }

  detailPop: boolean = false;
  setDealerSpecDetail() {
    this.ackDetail = true;
    const buttonModal = document.getElementById("openDetailModal")
    buttonModal.click();
    this.ComponentDetailsArray = [];
    //  if (this.detailSpecFormGroup.value.detailsValues.length > 0) {
    //     for(let i=0;i<this.detailSpecFormGroup.value.detailsValues.length;i++){
    //       let varId=this.detailSpecFormGroup.value.detailsValues[i].varblId;
    //       let value=this.detailSpecFormGroup.value.detailsValues[i].idx;
    //     }
    //  }
    for (let i = 0; i < this.dealerSpecData.length; i++) {


      this.ComponentDetailsArray.push({
        'value': this.dealerSpecData[i].value,
        'Ds_var_id': this.dealerSpecData[i].id,
        'Ds_in_id': this.Incentiveid,
        'Ds_line_id': this.dealerSpecData[i].lineId,
        'Ds_DealerId': this.dealer_id,
        'DS_CombinationId': this.dealerSpecData[i].combinationId,
        'Ds_status': "Y",
        'DS_notes': ""
      });
    }
    console.log(this.ComponentDetailsArray)
    this.detailPop = true;
  }

  ackButton: boolean = false;
  saveDetailSpec() {
    this.submitted = true;

    console.log(this.ComponentDetailsArray);
    if (this.ComponentDetailsArray == undefined) {
      this.UpdateStatus(this.Incentiveid, this.dealer_id)
      this.alertify.success("Incentive is added to your list and Data will populate soon.")
    }

    else {
      const obj = {
        "dealerspecificvariablevalues": this.ComponentDetailsArray
      }
      console.log(obj);
      this.adminService.postmethod('dealerspecificvariablevalues', obj).subscribe(res => {
        console.log(res)
        if (res.status == 200) {
          this.submitted = false;
          this.UpdateStatus(this.Incentiveid, this.dealer_id)
          this.alertify.success("Incentive is added to your list and Data will populate soon.")
          $('.modal-backdrop').remove();
          this.popup = false;
          this.ackButton = false;
          this.get();
        }
        else {
          this.alertify.error("Please check!!")
        }
      });
    }
  }

  savedealer() {
    console.log(this.ComponentFinalArray)
    if (this.ComponentFinalArray == undefined) {
      this.UpdateStatus(this.Incentiveid, this.dealer_id)
      this.alertify.success("Incentive is added to your list and Data will populate soon.")

    }

    else {
      const obj = {
        "dealerspecificvalues": this.ComponentFinalArray
      }
      console.log(obj)
      this.adminService.postmethod('dealerspecificvalues', obj).subscribe(res => {
        console.log(res)
        if (res.status == 200) {
          this.ComponentFinalArray.splice(0)
          // this.alertify.success("DealerSpecific Submitted Successfully")
          for (var i = 0; i <= this.dealerspecific.value.quantities.length; i++) {
            this.remove(i)
          }
          this.dealerspecificvalues.splice(0)
          this.submitted = false;
          //   this.details(this.ComponentFinalArray,i);
          this.UpdateStatus(this.Incentiveid, this.dealer_id)
          this.alertify.success("Incentive is added to your list and Data will populate soon.")
          $('.modal-backdrop').remove();
          this.popup = false;

        }
        else {
          this.alertify.error("Please check!!")
        }
      })


    }
  }
  saveDealerSpecific() {
    console.log(this.dealerspecific.value)
    // if(this.popup == false){
    //   console.log(this.popup)
    //       this.alertify.error("Please enter value")

    // }
    this.submitted = true;
    if (this.dealerspecific.invalid) {
      return;
    }


    this.ComponentFinalArray = [];
    if (this.dealerspecific.value.quantities.length > 0) {

      for (var i = 0; i < this.dealerspecific.value.quantities.length; i++) {
        this.ComponentFinalArray.push({
          'Dealer_value': this.dealerspecific.value.quantities[i].values,
          "Ds_inc_term_id": this.tncdealerspecificvalues[i].Ds_inc_term_id,
          "Ds_inc_id": this.Incentiveid,
          "Ds_dealer_specific_id": 5,
          "Ds_status": "Y",
          "DS_notes": this.dealerspecific.value.notes
        });
      }
      console.log(this.ComponentFinalArray)

    }
    if(this.ComponentFinalArray.length>0){
    for (var i = 0; i <= this.ComponentFinalArray.length; i++) {
      if (this.ComponentFinalArray[i].Dealer_value == "" || this.ComponentFinalArray[i].Dealer_value == undefined) {
        //    $('.modal-backdrop').remove();
        this.popup = false;

        this.alertify.error("Please enter value")
        console.log(this.popup)
      }


      else {
        this.popup = true

      }

    }

    }
  

  }



  cancel() {


    for (var i = 0; i <= this.dealerspecific.value.quantities.length; i++) {
      this.remove(i)
    }
  }
  hideandshow() {
    this.edittandc = 'Y'

  }
  edittermsandconditions() {

    this.popup = true
    this.tncdealerspecificdelete = [];

    for (var i = 0; i < this.tncdealerspecificvalues.length; i++) {

      this.tncdealerspecificdelete.push({

        "Dealer_specific_values_id": this.tncdealerspecificvalues[i].dealerspecificid,
      });

    }

    console.log(this.tncdealerspecificdelete)

    console.log(this.dealerspecific.value)

    this.submitted = true;
    if (this.dealerspecific.invalid) {
      return;
    }


    this.ComponentFinalArray = [];
    if (this.dealerspecific.value.quantities.length > 0) {

      for (var i = 0; i < this.dealerspecific.value.quantities.length; i++) {
        this.ComponentFinalArray.push({
          "Dealer_value": this.dealerspecific.value.quantities[i].values,
          "Ds_inc_term_id": this.tncdealerspecificvalues[i].Ds_inc_term_id,
          "Ds_inc_id": this.Incentiveid,
          "Ds_dealer_specific_id": 5,
          "Ds_status": "Y",
          "DS_notes": this.dealerspecific.value.notes
        });
      }
      console.log(this.ComponentFinalArray)

    }






  }
  editdealer() {
    console.log(this.tncdealerspecificdelete)
    console.log(this.ComponentFinalArray)

    if (this.tncdealerspecificdelete != undefined) {
      const obj = {
        "deletedealerspecificvalues": this.tncdealerspecificdelete
      }
      console.log(obj)

      this.adminService.deleteElement(obj, 'dealerspecificvalues').subscribe((res: any) => {
        console.log(res)
        if (res.status === 200) {
          //  this.alertify.success("DealerSpecific Deleted Successfully")
          const obj1 = {
            "dealerspecificvalues": this.ComponentFinalArray
          }
          console.log(obj1)
          this.adminService.postmethod('dealerspecificvalues', obj1).subscribe(res => {
            console.log(res)
            if (res.status == 200) {
              this.ComponentFinalArray = [];
              this.alertify.success("Incentive is added to your list and Data will populate soon.")
              for (var i = 0; i <= this.dealerspecific.value.quantities.length; i++) {
                this.remove(i)
              }
              this.dealerspecificvalues = [];
              this.submitted = false;

              $('.modal-backdrop').remove();
              this.popup = false;
              this.get();

            }
            else {
              this.alertify.error("Please check!!")
            }
          })
        }
      })
    }
  }
  details(item, i) {
    this.edittandc = 'N'

    console.log(this.dealerspecificdesvalue)
    this.dealerspecificdesvalue = ''
    this.regionsData = []
    this.tncdealerspecificvalues = []
    this.incentivelineitems = []
    this.btnsub = false;
    this.incentivedata = [];
    this.termsandconditions = [];
    const qlen = this.dealerspecific.get('quantities')['controls'].length;
    if (qlen >= 1) {
      for (var j = 0; j <= this.dealerspecific.value.quantities.length; j++) {
        this.remove(j)
      }
      this.notes = ""
    }
    console.log('item......i', item, i);
    this.dealer_id = item.IND_DEALER_ID;
    this.Incentiveid = item.IND_MI_ID;

    const obj = {
      "IncentiveId": this.Incentiveid,
      "DealerId": this.dealer_id,
      "expression": ""
    }
    console.log(obj)
    this.adminService.postmethod('incentivedata/forntendincentivesdata', obj).subscribe(res => {
      console.log(res)
      if (res.status == 200) {
        this.incentivedata = res.response.IncentiveInfo;
        console.log(this.incentivedata)
        if (this.incentivedata.TermsAndConditions !== undefined) {
          this.termsandconditions = this.incentivedata.TermsAndConditions[0].TermsAndCondition
          console.log(this.termsandconditions)
          for (var i = 0; i < this.termsandconditions.length; i++) {
            if (this.termsandconditions[i].MIT_ISDEALERSPECIFIC == 'Y')
              // this.tncdealerspecificvalues.push(this.termsandconditions[i].MIT_DISPLAYNAME);
              this.tncdealerspecificvalues.push({
                'MIT_DISPLAYNAME': this.termsandconditions[i].MIT_DISPLAYNAME,
                'DealerValue': this.termsandconditions[i].DealerValue,
                "Ds_inc_term_id": this.termsandconditions[i].INT_MIT_ID[0],
                "Notes": this.termsandconditions[i].Notes,
                "dealerspecificid": this.termsandconditions[i].DealerSpecificValueId,
              });
            if (this.termsandconditions[i].MIT_ISDEALERSPECIFIC == 'Y' && this.termsandconditions[i].MIT_TYPE == "1")
              // this.tncdealerspecificvalues.push(this.termsandconditions[i].MIT_DISPLAYNAME);
              this.tncdealerspecificyorn.push({
                'MIT_DISPLAYNAME': this.termsandconditions[i].MIT_DISPLAYNAME,
                // 'DealerValue': this.termsandconditions[i].DealerValue,
                // "Ds_inc_term_id": this.termsandconditions[i].INT_MIT_ID[0],
                // "Notes": this.termsandconditions[i].Notes,
                // "dealerspecificid": this.termsandconditions[i].DealerSpecificValueId,
              });
          }
          console.log(this.tncdealerspecificyorn)

          console.log(this.tncdealerspecificvalues)

          if (this.tncdealerspecificvalues.length > 0) {
            const qlen = this.dealerspecific.get('quantities')['controls'].length;
            if (qlen >= 1) {
              for (var j = 0; j <= this.dealerspecific.value.quantities.length; j++) {
                this.remove(j)
              }
              this.notes = ""
            }
            console.log(this.tncdealerspecificvalues.length)
            for (let T in this.tncdealerspecificvalues) {
              (<FormArray>this.dealerspecific.get('quantities')).push(this.value(this.tncdealerspecificvalues[T]));
            }
          }
        }
        this.incentivevariables = this.incentivedata.IncentiveVariables[0].IncentiveVariable
        console.log(this.incentivevariables)
        for (var i = 0; i < this.incentivevariables.length; i++) {
          if (this.incentivevariables[i].INV_MIV_ID == 8)
            this.fromDate = this.incentivevariables[i].INV_DATA;
          console.log(this.fromDate)
          if (this.incentivevariables[i].INV_MIV_ID == 9)
            this.Todate = this.incentivevariables[i].INV_DATA;
          console.log(this.Todate)
          if (this.incentivevariables[i].INV_MIV_ID == 5)
            this.regionsData.push(this.incentivevariables[i].regioname)
          console.log(this.regionsData)
          // if(this.incentivevariables[i].INV_MIV_ID != 5)
          // this.regionsData="No Regions"
        }
        this.incentivemaster = this.incentivedata.IncentiveMasters[0].IncentiveMaster[0];
        console.log(this.incentivemaster)
        this.dealeraccept = this.incentivedata.DealerAccepts[0].DealerAccept[0].IND_DealerAcept
        console.log("Dealer Accept" + this.dealeraccept)
        if (this.incentivedata.IncentiveLineItems != undefined) {
          this.incentivelineitems = this.incentivedata.IncentiveLineItems[0].IncentiveLineItem
          console.log(this.incentivelineitems)
          console.log(this.incentivelineitems.length)

          // if (this.incentivelineitems.length > 0) {
          //   console.log(this.incentivelineitems.length)
          //   console.log(this.incentivelineitems[0].Varaibles[0].Variables[0].variable[0].MIV_DEALER_SPECIFIC)
          //   for (var i = 0; i < this.incentivelineitems.length; i++) {
          //     if (this.incentivelineitems[i].Varaibles[0].Variables[0].variable[0].MIV_DEALER_SPECIFIC == "Y") {
          //       console.log(this.incentivelineitems[i].Varaibles[0].Variables[0].variable[0].MIV_DEALER_SPECIFIC)

          //       this.incentivelineitemsdealers.push({

          //         "dealerstatus": this.incentivelineitems[i].Varaibles[0].Variables[0].variable[0].MIV_DEALER_SPECIFIC
          //       })
          //     }
          //   }
          //   console.log(this.incentivelineitemsdealers)
          // }
          this.ackButton = true;
        }
      }
    })



    this.data.forEach((element, index) => {
    //  console.log(index)
    //  console.log(i)
      if (index === i) {
        this.data[i].show = !this.data[i].show;

      } else {
        element.show = false;

      }
    });
  }
  detail(item, i) {
    this.edittandc = 'N'

    console.log(this.dealerspecificdesvalue)
    this.dealerspecificdesvalue = ''
    this.regionsData = []
    this.tncdealerspecificvalues = []
    this.incentivelineitems = []
    this.btnsub = false;
    this.incentivedata = [];
    this.termsandconditions = [];
    const qlen = this.dealerspecific.get('quantities')['controls'].length;
    if (qlen >= 1) {
      for (var j = 0; j <= this.dealerspecific.value.quantities.length; j++) {
        this.remove(j)
      }
      this.notes = ""
    }
    console.log('item......i', item, i);
    this.dealer_id = item.IND_DEALER_ID;
  //  localStorage.setItem('dealerid',this.dealer_id)
    this.Incentiveid = item.IND_MI_ID;
    localStorage.setItem('incentiveid',this.Incentiveid.toString())

    const obj = {
      "IncentiveId": this.Incentiveid,
      "DealerId": this.dealer_id,
      "expression": ""
    }
    console.log(obj)
    this.adminService.postmethod('incentivedata/forntendincentivesdata', obj).subscribe(res => {
      console.log(res)
      if (res.status == 200) {
        this.incentivedata = res.response.IncentiveInfo;
        console.log(this.incentivedata)
        if (this.incentivedata.TermsAndConditions !== undefined) {
          this.termsandconditions = this.incentivedata.TermsAndConditions[0].TermsAndCondition
          console.log(this.termsandconditions)
          for (var i = 0; i < this.termsandconditions.length; i++) {
            if (this.termsandconditions[i].MIT_ISDEALERSPECIFIC == 'Y')
              // this.tncdealerspecificvalues.push(this.termsandconditions[i].MIT_DISPLAYNAME);
              this.tncdealerspecificvalues.push({
                'MIT_DISPLAYNAME': this.termsandconditions[i].MIT_DISPLAYNAME,
                'DealerValue': this.termsandconditions[i].DealerValue,
                "Ds_inc_term_id": this.termsandconditions[i].INT_MIT_ID[0],
                "Notes": this.termsandconditions[i].Notes,
                "dealerspecificid": this.termsandconditions[i].DealerSpecificValueId,
              });
            if (this.termsandconditions[i].MIT_ISDEALERSPECIFIC == 'Y' && this.termsandconditions[i].MIT_TYPE == "1")
              // this.tncdealerspecificvalues.push(this.termsandconditions[i].MIT_DISPLAYNAME);
              this.tncdealerspecificyorn.push({
                'MIT_DISPLAYNAME': this.termsandconditions[i].MIT_DISPLAYNAME,
                // 'DealerValue': this.termsandconditions[i].DealerValue,
                // "Ds_inc_term_id": this.termsandconditions[i].INT_MIT_ID[0],
                // "Notes": this.termsandconditions[i].Notes,
                // "dealerspecificid": this.termsandconditions[i].DealerSpecificValueId,
              });
          }
          console.log(this.tncdealerspecificyorn)

          console.log(this.tncdealerspecificvalues)

          if (this.tncdealerspecificvalues.length > 0) {
            const qlen = this.dealerspecific.get('quantities')['controls'].length;
            if (qlen >= 1) {
              for (var j = 0; j <= this.dealerspecific.value.quantities.length; j++) {
                this.remove(j)
              }
              this.notes = ""
            }
            console.log(this.tncdealerspecificvalues.length)
            for (let T in this.tncdealerspecificvalues) {
              (<FormArray>this.dealerspecific.get('quantities')).push(this.value(this.tncdealerspecificvalues[T]));
            }
          }
        }
        this.incentivevariables = this.incentivedata.IncentiveVariables[0].IncentiveVariable
        console.log(this.incentivevariables)
        for (var i = 0; i < this.incentivevariables.length; i++) {
          if (this.incentivevariables[i].INV_MIV_ID == 8)
            this.fromDate = this.incentivevariables[i].INV_DATA;
          console.log(this.fromDate)
          if (this.incentivevariables[i].INV_MIV_ID == 9)
            this.Todate = this.incentivevariables[i].INV_DATA;
          console.log(this.Todate)
          if (this.incentivevariables[i].INV_MIV_ID == 5)
            this.regionsData.push(this.incentivevariables[i].regioname)
          console.log(this.regionsData)
          // if(this.incentivevariables[i].INV_MIV_ID != 5)
          // this.regionsData="No Regions"
        }
        this.incentivemaster = this.incentivedata.IncentiveMasters[0].IncentiveMaster[0];
        console.log(this.incentivemaster)
        this.dealeraccept = this.incentivedata.DealerAccepts[0].DealerAccept[0].IND_DealerAcept
        console.log("Dealer Accept" + this.dealeraccept)
        if (this.incentivedata.IncentiveLineItems != undefined) {
          this.incentivelineitems = this.incentivedata.IncentiveLineItems[0].IncentiveLineItem
          console.log(this.incentivelineitems)
          console.log(this.incentivelineitems.length)

          if (this.incentivelineitems.length > 0) {
            console.log(this.incentivelineitems.length)
            console.log(this.incentivelineitems[0].Varaibles[0].Variables[0].variable[0].MIV_DEALER_SPECIFIC)
            // for (var i = 0; i < this.incentivelineitems.length; i++) {
            //   if (this.incentivelineitems[i].Varaibles[0].Variables[0].variable[0].MIV_DEALER_SPECIFIC == "Y") {
            //     console.log(this.incentivelineitems[i].Varaibles[0].Variables[0].variable[0].MIV_DEALER_SPECIFIC)

            //     this.incentivelineitemsdealers.push({

            //       "dealerstatus": this.incentivelineitems[i].Varaibles[0].Variables[0].variable[0].MIV_DEALER_SPECIFIC
            //     })
            //   }
            // }
            console.log(this.incentivelineitemsdealers)
          }
          this.ackButton = true;
        }
      }
    })

    this.incentiveacceptdata=[];
    const obj1 = {
      "IND_MI_ID":this.Incentiveid
  }
    this.ApiService.postmethod('incentiveaccept/statusbyid', obj1).subscribe((response: any) => {
      if (response.status == 200) {
        if(response.response.length !=0)
        {
          // this.data=true;
          this.incentiveacceptdata = response.response;
          console.log(this.incentiveacceptdata)
     //     this.ngbmodalActive=this.ngbmodal.open(tmp, {​​​​​​​​ backdrop:'static' }​​​​​​​​);

        }
      }
    });

    this.dealerdata.forEach((element, index) => {
    //  console.log(index)
    //  console.log(i)
      if (index === i) {
        this.dealerdata[i].show = !this.dealerdata[i].show;

      } else {
        element.show = false;

      }
    });
  }
  onKey(event: any) { // without type info
    console.log(this.notes)
    console.log(event.target.value)
    this.dealerspecificdesvalue = event.target.value
    console.log(this.dealerspecificdesvalue)
    const qlen = this.dealerspecific.get('quantities')['controls'].length;
    console.log(qlen)
    if (qlen >= 1) {
      for (var i = 0; i <= this.dealerspecific.get('quantities')['controls'].length; i++) {
        //    console.log(this.dealerspecific.get('quantities')['controls'][i].value.values)
        if (this.dealerspecific.get('quantities')['controls'][i].value.values[0] == '' || this.dealerspecific.get('quantities')['controls'][i].value.values[0] == null) {
          this.btnsub = false
          console.log(this.btnsub)
          console.log(qlen)
          this.enableackowledge = false
        } else {
          this.btnsub = true;
          console.log(this.btnsub)
          console.log(qlen)
          if (this.btnsub == true && this.ackDetail == true) {
            console.log(this.btnsub)
            console.log(this.ackDetail)
            this.enableackowledge = true
            console.log(this.enableackowledge)
          }
        }
      }

    }

  }

  Spec_newQuantity(varblId, lineId, combId): FormGroup {
    return this.fB.group({
      idx: new FormControl('', Validators.required),
      varblId: varblId,
      lineId: lineId,
      combId: combId
    });
  }

  get detailsValues(): FormArray {
    return this.detailSpecFormGroup.get('detailsValues') as FormArray;
  }

  addSpecInputField(varblId, lineId, combId) {

    this.detailsValues.push(this.Spec_newQuantity(varblId, lineId, combId));
  }

  d_quantities(): FormArray {
    return this.dealerspecific.get('quantities') as FormArray;
  }

  d_newQuantity(): FormGroup {
    return this.fB.group({
      label: '',
      values: ['', Validators.required]
    });
  }
  d_value(dt): FormGroup {
    return this.fB.group({
      label: [dt.MIT_DISPLAYNAME],
      values: [dt.INT_VALUE]

    });
  };



  d_remove(i: number) {
    this.quantities().removeAt(i);
  }

  onItemSelect(item: any, uniqId: any) {

    console.log(item);


  }

  OnItemDeSelect(item: any, uniqId: any) {

    console.log(item);

  }
  onSelectAll(items: any, uniqId: any) {

    console.log(items);

  }
  onDeSelectAll(items: any, uniqId: any) {

    console.log(items);

  }

  onAngularClose(uniqId: any, varblId: any) {

  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      this.alertify.error("Enter Numbers only!!")
      return false;
    }

    return true;

  }


  DealerSpecData(event, index, varblId, lineId) {

    if (event.target.value == "") {
      this.alertify.error("Enter value!!")
    }
    else {
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        this.alertify.error("Enter Numbers only!!")
        return false;
      }
      else {

        this.ackDetail = true;
        console.log(this.enableackowledge)
        if (this.btnsub == true && this.ackDetail == true) {
          console.log(this.btnsub)
          console.log(this.ackDetail)
          console.log(this.enableackowledge)

          this.enableackowledge = true
          console.log(this.enableackowledge)

          let indexVal = 0, overAllIndex = 0, currentIndex = 0;

          if (event.target.value != "") {

            for (let i = 0; i < this.dealerSpecData.length; i++) {

              currentIndex = i;
              if (this.dealerSpecData[i].id == varblId && this.dealerSpecData[i].lineId == lineId) {
                indexVal++;
                overAllIndex = i;
              }


              //indexVal2=this.dealerSpecData[i].indexOf(lineId);

            }


            if (indexVal == 0) {
              this.dealerSpecData.push({ id: varblId, value: event.target.value, lineId: lineId, combinationId: this.setEvalOptVal.length !== 0 ? this.setEvalOptVal[index] : "0" });
            }
            else {
              this.dealerSpecData[overAllIndex] = { id: varblId, value: event.target.value, lineId: lineId, combinationId: this.setEvalOptVal.length !== 0 ? this.setEvalOptVal[index] : "0" };
            }
          }
          // this.dealerSpecData[index] === undefined
          // ? (

          // : this.dealerSpecData[index].push({
          //   id: varblId,
          //   itemName: $event.target.value,
          //   lineId: lineId, 
          //   combinationId:this.setEvalOptVal
          // });
        }
      }
    }
  }

  setEvalOptVal: any = [];
  setEvalOperator($event, idx) {
    this.glbCntrEval++;
    let evalOpt = 0, evalCntr = 0;
    for (let i = 0; i < this.setEvalOptVal.length; i++) {

      if (this.glbCntrEval !== 1) {
        if (i == idx) {
          evalCntr++;
          evalOpt = i;

        }
      }
    }
    if (evalCntr > 0) {
      this.setEvalOptVal[evalOpt] = $event.target.value;
    }
    else {
      this.setEvalOptVal.push($event.target.value);
    }
  }
  openmodelpopup() {
    // this.setDealerSpecDetail();
    // this.saveDealerSpecific();
 //   this.ackDetail = true;
    // const buttonModal = document.getElementById("openDetailSubmitModal")
    // buttonModal.click();
  }


  overallopenmodelpopup() {
    this.setDealerSpecDetail();
    this.saveDealerSpecific();

  }
  overallaknowledge() {
    if (this.ComponentFinalArray.length == 0 && this.ComponentDetailsArray.length ==0 ) {
      this.UpdateStatus(this.Incentiveid, this.dealer_id)
      this.alertify.success("Incentive is added to your list and Data will populate soon.")
    }
    if (this.ComponentDetailsArray == undefined) {
      this.savedealer();
    }
    if (this.ComponentFinalArray == undefined) {
      this.saveDetailSpec();
    }
    if (this.ComponentFinalArray.length != 0 && this.ComponentDetailsArray.length != 0) {
      this.savedealer();
      this.saveDetailSpec();
      //  this.edittandc=false;
    }
  }


}