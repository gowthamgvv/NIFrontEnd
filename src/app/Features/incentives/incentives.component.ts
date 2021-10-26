import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from "../../Core/_providers/api-service/api.service";
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { AlertifyService } from '../../Core/_providers/alert-service/alertify.service';
import { environment } from '../../../environments/environment';
import { ModalDialogService } from 'src/app/Shared/modal-dialog/modal-dialog.service';
import { promise } from 'protractor';
import xml2js from 'xml2js';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-incentive-master',
  templateUrl: './incentives.component.html',
  styleUrls: ['./incentives.component.scss'],
  providers: [AngularMultiSelectModule],
})
export class IncentivesComponent implements OnInit {
  incentiveMasterForm: FormGroup;
  brandform: FormGroup;
  OemBrands: any[];
  selectedBrandsList: any = [];
  selectedBrandLogo: any = [];
  serachBrands: any = [];
  selectedbrandid: any = [];
  brandspopup: boolean = false;
  showBrand: boolean = false;
  selectedBrands: string[];
  showBrandAutofill: boolean;
  selectedItem: any;
  incentivetypes: any = [];
  regionsList: any = [];
  dealershipStores: any = [];
  dvStores: boolean = false;
  submitted = false;
  showIncentiveView: Boolean = false;
  showIncentiveDetails: boolean = false;
  showTermsandConditions: boolean = false;
  selectedchkList: any = [];
  VariablesData: any = [];
  LineItemsData: any = [];
  showregionadd: boolean = false;
  secondregionsList: any = [];
  TermsAndConditions: any = [];
  ShowAddIncentive: boolean = false;
  incentiveid: number = 0;
  incentiveVaraibles: any = [];
  finalObjData: any = {
    dealerregions: '',
  };
  incentivesData: any = [];
  showIncentiveLineItems: boolean = true;
  incentivesArray: any = [];
  hide: boolean;
  atozFltr: boolean;
  alphaSrch: string = '';
  tempincentives: any = [];
  SearchIncentiveForm: FormGroup;
  alphaColumns: any = ['MI_NAME'];
  variablesList: any[];
  showgrid: boolean = false;
  dropdownSettings = {};
  brandSettings={};
  selectedRegionItems = [];
  selectedSearchBrandItems=[];
  dropdownList = [];
  _glbBrandId: string = "";
  FinalArray: any = [];
  tacdata: any = [];
  dealerships: any = [];
  _glbIncentiveId: number = 0;
  showTermDiv: boolean = false;
  showLineItemsLink: boolean = false;
  @ViewChild('brandmenu', { static: false }) brandmenu: ElementRef;
  lineData: any = [];
  viewCancel: boolean = false;
  showTermDiv1: boolean = true;
  isEdit: boolean = true;
  detailViewType: string = '';
  _glbLineHdrId: number = 0;
  _glbLnhdrSeqnId:number=0;

  status: string;
  visible: boolean;
  data: boolean;
  incentiveacceptdata: any = [];

  ImagPath: any = `${environment.apiUrl}` + '/resources/images';
  editTerms: string;
  showLineItemsLink1: boolean;
  isPublish: boolean;
  showBrandImageDiv:boolean=true;
  FromDate: string;
  ToDate: string;
  srchBrids:any=[];
  selectedFile:any=null;
  fileName: any;
  AddView: boolean=false;EditView: boolean;
  dlrGropId: string;
  lineItemsInfo:any=[];
  glbIncentiveName: any="";
  glbIncentiveType: any="";
  showSearchDiv:boolean=true;
  originalFileName: any = '';
  DealerSpecificValues: any[];
  LoginUser :string= localStorage.getItem('dealeruserid');
  dealerShipId: any;
  showDealerIncentivePool: boolean=false;
  dealerdata: boolean;
  Dealerdata: any;
  dealerdatapool: any;
  edittandc: string='';
  dealerspecificdesvalue: any=[];
  popup: boolean;
  ComponentFinalArray: any[];
  ComponentDetailsArray: any;
  glbCntrEval: number = 0;
  showsearchBrand:boolean=true;
  showDropdown:boolean=false;
  showAddSymbol:boolean=true;
  tempdealerincentives:any=[];

  constructor(
    private ApiService: ApiService,
    private fB: FormBuilder,
    private datepipe: DatePipe,
    private cdRef: ChangeDetectorRef,
    private renderer: Renderer2,
    private alertify: AlertifyService,
    private modalSrvc:ModalDialogService,
    private router:Router,
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.brandmenu == undefined) {
        this.showBrandAutofill = false;
      } else this.showBrandAutofill = false;
    });

    this.incentiveMasterForm = this.fB.group({
      incentivename: ['', [Validators.required, Validators.maxLength(100)]],
      incentivetype: ['', Validators.required],
      region: ['', Validators.required],
      datefrom: ['', Validators.required],
      dateto: ['', Validators.required],
      file:[''],
      selectall:[''],
      description : [''],
      incentivecode :['']
    });
    this.brandform = this.fB.group({
      txtbrand: [''],
    });
    this.SearchIncentiveForm = this.fB.group({
      txtsearch: '',
      ddldate :'C',
      brandsrch:[[]],
      ddldropdown : '1'
    });
    this.dealerspecific = this.fB.group({
      quantities: this.fB.array([]),
      notes: [''],

    });
    this.detailsdealerspecific = this.fB.group({
      d_quantities: this.fB.array([]),
      d_notes: [''],

    });

    this.showTermsandConditions = false;
    this.ShowAddIncentive = false;

    this.showIncentiveView = false;
    this.showIncentiveLineItems = false;
    this.showgrid = true;
    // this.getLineItemsDetails();
  }
  ngAfterViewChecked() {
      this.cdRef.detectChanges();
    
  }

  ngOnInit(): void {
    this.GetBrandsList();

    this.dealerShipId = localStorage.getItem('DealerId');
    if(this.dealerShipId == 0){
      setTimeout(() => {
        this.getIncentivesList();
      }, 1000);
      this.showDealerIncentivePool=false;
      this.showsearchBrand=true;
    }

    else{
      this.showDropdown = true;
      this.showgrid=true;
      this.getIncentivesList();
      // this.showDealerIncentivePool=true;
      // this.showgrid=false;
      // this.getIncentivepoolBasedOnDealer();
      // this.showsearchBrand=false;
      // this.router.navigateByUrl('/dealerincentivepool')
    }
    this.getIncentiveTypes();
    this.getRegions();

    this.selectedRegionItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      text: 'Select',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class',
      primaryKey:"id",
      badgeShowLimit:1
      //lazyLoading : true
    };
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
    this.lineItemsInfo.push({incentiveId:"", incentiveName:"", incentiveType:"", lineHdrId:"", lineHdrSeqnId:"", brandId:"", viewType:""});
    this.detailSpecFormGroup = this.fB.group({
      detailsValues: new FormArray([]),
    })
    this.termsForm = this.fB.group({
      TermsInfo: this.fB.array([])
    });
  }
  getDealerIncentives()
  {
    if(this.SearchIncentiveForm.controls["ddldropdown"].value == "1"){
      this.getIncentivesList();
   this.showgrid=true;
    this.showDealerIncentivePool=false;
    this.showsearchBrand=true;
    this.showAddSymbol=true;
    }
    else{
      this.showAddSymbol=false;
    this.showDealerIncentivePool=true;
    this.showgrid=false;
    this.getIncentivepoolBasedOnDealer();
    this.showsearchBrand=false;
    }
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


          if (this.selectedbrandid != '') {
            if (this.selectedbrandid.length > 0) {
              for (let i = 0; i < this.selectedbrandid.length; i++) {
                //this.Brands.splice(this.selectedbrandid[i],1);
                this.OemBrands = this.OemBrands.filter(
                  (item) => item.brand_chrome_id != this.selectedbrandid[i]
                );
              }
            }
          }
          //console.log(this.Brands)
        }
      }
    );
  }
  regionValues(): FormArray {
    return this.incentiveMasterForm.get('regionValues') as FormArray;
  }
  addBrand() {
    this.showBrand = true;
  }
  filter(val: string): string[] {
    return this.OemBrands.filter(
      (option) =>
        option.brand_name.toLowerCase().indexOf(val.toLowerCase()) === 0
    );
  }
  OnChangeEvent(e) {
    this.selectedBrands = this.filter(e.target.value.toLowerCase());
    if(this.selectedBrands.length == 0)
      this.showBrandAutofill = false;
    else
      this.showBrandAutofill = true;
  }
  selectItem(event: Event, item, index) {
    event.stopPropagation();
    if (this.selectedbrandid == '') this.selectedbrandid = [];
    if (item != '') {
      this.selectedbrandid.push(item.brand_chrome_id);
      this.OemBrands = this.OemBrands.filter(
        (x) => x.brand_chrome_id != item.brand_chrome_id
      );
      this.selectedItem = item;
      this.showBrandAutofill = false;
      this.selectedBrandLogo.push(item.brand_logo);
      this.selectedBrandsList.push({
        brand_id: item.brand_chrome_id,
        brand_name: item.brand_name,
        brand_logo: item.brand_logo,
      });
      this.brandform.controls['txtbrand'].setValue('');
      // $(".modal-backdrop").remove();
    }
  }
  removeBrandTag(item, index, id) {
    this.OemBrands.push({ brand_chrome_id: id, brand_name: item });

    this.selectedBrandsList.splice(index, 1);
    this.selectedbrandid.splice(index, 1);
    this.selectedBrandLogo.splice(index, 1);
  }
  highlightRow(option) {
    this.selectedItem = option.brand_name;
  }
  closeModel() {
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
    this.showBrand = false;
    this.brandspopup = false;

    //this.dvStores = true;
    // this.incentiveForm.controls["region"].setValue("0");
    // this.getDealershipListByBrand();
  }

  getIncentiveTypes() {
    const obj = { incentivetype_id: 0, expression: '' };
    this.ApiService.postmethod('incentivetypes/get', obj).subscribe(
      (res: any) => {
        if (res.status == 200) {
          this.incentivetypes = res.response;
          this.incentivetypes = this.incentivetypes.filter((x:any)=> x.incentivetype_status=='Y');
        }
      }
    );
  }

  getRegions() {
    const obj = {
      region_id: 0,
    };
    this.ApiService.postmethod('regions/get', obj).subscribe((res: any) => {
      if (res.status == 200) {
        if (this.regionsList.length == 0) this.regionsList = res.response;
        this.secondregionsList = res.response;
        let arr = [];
        this.regionsList.forEach((element) => {
          arr.length === 0
            ? (arr = [{ id: element.region_iD, itemName: element.region_name }])
            : arr.push({
                id: element.region_iD,
                itemName: element.region_name,
              });
        });
        this.dropdownList = arr;
        console.log(this.dropdownList);
      }
    });
  }
//  Brand Related Functions
  onBrandItemSelect(item: any) {
    //this.showDealerStores(item);
    console.log(item);
    console.log(this.selectedSearchBrandItems);
    this.getIncentivesList();
  }
  OnBrandItemDeSelect(item: any) {
    //this.showDealerStores(item);
    console.log(item);
    console.log(this.selectedSearchBrandItems);
    this.getIncentivesList();
  }
  onBrandSelectAll(items: any) {
   // this.showDealerStores(items);
    console.log(items);
    this.getIncentivesList();
  }
  onBrandDeSelectAll(items: any) {
    //this.showDealerStores(items);
    console.log(items);
    this.getIncentivesList();
  }



  onItemSelect(item: any) {
    if(this.dealerShipId == 0)
      this.showDealerStores(item);
    console.log(item);
    console.log(this.selectedRegionItems);
  }
  OnItemDeSelect(item: any) {
    if(this.dealerShipId == 0)
     this.showDealerStores(item);
    console.log(item);
    console.log(this.selectedRegionItems);
  }
  onSelectAll(items: any) {
    if(this.dealerShipId == 0)
      this.showDealerStores(items);
    console.log(items);
  }
  onDeSelectAll(items: any) {
    if(this.dealerShipId == 0)
      this.showDealerStores(items);
    console.log(items);
  }
  regionids = [];
  showDealerStores(data) {
    
        this.dlrGropId=localStorage.getItem('dealerGroupId');
        if (this.selectedbrandid.length == 0) {
                  this.alertify.success('Please select Brand');
                  this.incentiveMasterForm.controls['region'].setValue('');
                  return false;
                }
        
          if (this.incentiveid == 0) {
            this.regionids = [];
            for (var i = 0;i < this.selectedRegionItems.length;i++)
              this.regionids.push(this.selectedRegionItems[i].id);
          }
          else{
            for (var i = 0;i < this.selectedRegionItems.length;i++)
              this.regionids.push(this.selectedRegionItems[i].id);
          }
       
    
        if (this.regionids.length != 0) {
          const obj = {
            Brand: this.selectedbrandid,
            Region: this.regionids,
            dealergroupid:this.dlrGropId
          };
          this.ApiService.postmethod('incentivemaster/getdealerstores', obj).subscribe((response: any) => {
            console.log(response);
            if (response.status == 200) {
              this.dealershipStores = response.response;
              if (this.dealershipStores.length != 0) this.dvStores = true;
              else this.dvStores = false;
              if(this.incentiveid !=0)
                this.getDealerShipsByIncentive(this.incentiveid)
            }
          });
        } else {
          this.selectedchkList = [];
          this.dvStores = false;
        }
    //   })
    // )
    
  }

  onAllCheckboxChangeEvent(e) {
    const checked = e.target.checked;
    if(checked==true){
    this.dealershipStores.forEach((item) => {
      item.selected = checked;
      item.checked = 'Y'
      this.selectedchkList.push(item.dealer_id);
    });
  }
  else{
    this.dealershipStores.forEach((item) => {
      item.selected = false;
      item.checked = 'N';
      this.selectedchkList=[];
    });
  }
  }

  onCheckboxChange(e,i) {
    if(e.srcElement.checked){
    if (e.target.value)
      //console.log(e.target.value)
      this.selectedchkList.push(e.target.value);
      if(this.dealershipStores.length == this.selectedchkList.length){
        this.incentiveMasterForm.controls["selectall"].setValue("Y");
      }
    }
    else{
      this.selectedchkList.splice((i-1),1);
      this.incentiveMasterForm.controls["selectall"].setValue("");
    }
  }

  OnSubmit() {
    this.submitted = true;
    this.regionids=[];
    if (this.incentiveMasterForm.invalid) {
      return;
    }
    if(this.selectedbrandid.length == 0)
    return false;
        var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    let todaydate = mm + '/' + dd + '/' + yyyy;
    // if(this.incentiveMasterForm.value.dateto < this.incentiveMasterForm.value.datefrom ){
    //  this.alertify.success('End Date should more than Start Date')
    //  return false
    // }
    if(this.selectedRegionItems.length!=0){
      for(var i=0;i<this.selectedRegionItems.length;i++)
        this.regionids.push(this.selectedRegionItems[i].id);
    }
    // if(this.selectedRegionItems.length == 0){
    //   this.regionids=[];
    //   for(var i=0;i<this.dropdownList.length;i++)
    //   this.regionids.push(this.dropdownList[i].id);
    // }
    let userId = localStorage.getItem('dealeruserid');
    const formdata:any = new FormData();
    console.log(userId);
    if (this.incentiveid == 0) {
      const obj = {
        inmname: this.incentiveMasterForm.value.incentivename,
        inmtypeid: this.incentiveMasterForm.value.incentivetype,
        inmstatus: 'Y',
        datefrom: this.datepipe.transform(this.incentiveMasterForm.value.datefrom, 'MM/dd/yyyy'),
        dateto: this.datepipe.transform(this.incentiveMasterForm.value.dateto,'MM/dd/yyyy'),
        regionValues: this.regionids.join(','),
        brandids: this.selectedbrandid.join(','),
        // dealer_id : 0
        dealerIds: this.selectedchkList.join(','),
        createdUser:userId,
        updatedUser:0,
        incentiveCreatedBy:'D',
        description:this.incentiveMasterForm.value.description,
        incentivecode : this.incentiveMasterForm.value.incentivecode
      };
      if (this.selectedFile && this.incentiveid == 0){
        formdata.append('data', JSON.stringify(obj));
       
          formdata.append('file', this.fileName);
        }
        else{
          formdata.append('data', JSON.stringify(obj));
        }
      console.log(obj);
      this.ApiService.postmethod('incentivelist', formdata).subscribe((res: any) => {
        if (res.status == 200) {
          this.alertify.success('Incentive Primary Details Added Successfully');
          this.incentiveid = res.response.inmid;
          this.ShowAddIncentive = false;
          this.showTermsandConditions = false;
          this.showgrid = false;
          this.showIncentiveLineItems = false;
          this.showIncentiveView = false;
          if(this.datepipe.transform(this.incentiveMasterForm.value.datefrom,'MM/dd/yyyy') > todaydate )
            this.SearchIncentiveForm.controls["ddldate"].setValue("F");
            else  if(this.datepipe.transform(this.incentiveMasterForm.value.dateto,'MM/dd/yyyy') < todaydate )
            this.SearchIncentiveForm.controls["ddldate"].setValue("P");
         else  this.SearchIncentiveForm.controls["ddldate"].setValue("C");  
          //this.getIncentivesList();
          this.viewIncentiveData(this.incentiveid, this.selectedbrandid, 'E');
        }
        else if(res.error=="IncentiveMaster Already Exists."){
          this.alertify.error("Incentive Master Already Exists");
          return false;
        }
      });
    } else {
      let regionVals=[];
      if(this.selectedRegionItems.length!=0){
       
        for(var i=0;i<this.selectedRegionItems.length;i++)
        regionVals.push(this.selectedRegionItems[i].id);
      }
      
      const obj = {
        inmid: this.incentiveid,
        inmname: this.incentiveMasterForm.value.incentivename,
        inmtypeid: this.incentiveMasterForm.value.incentivetype,
        inmstatus: 'Y',
        datefrom: this.datepipe.transform(this.incentiveMasterForm.value.datefrom,'MM/dd/yyyy'),
        dateto: this.datepipe.transform(this.incentiveMasterForm.value.dateto,'MM/dd/yyyy'),
        regionValues: regionVals.join(','),
        brandids: this.selectedbrandid.join(','),
        // dealer_id : 0
        dealerIds: this.selectedchkList.join(','),
        createdUser:0,
        updatedUser:userId,
        filename:'',
        incentiveCreatedBy:'D',
        description:this.incentiveMasterForm.value.description,
        incentivecode : this.incentiveMasterForm.value.incentivecode
      };
      console.log(obj)
      formdata.append('data', JSON.stringify(obj));
      if(this.fileName !='')
        formdata.append('file', this.fileName);
        else if(this.selectedFile !='')
        formdata.append('file', this.selectedFile);
      this.ApiService.putmethod('incentivelist', formdata).subscribe((res: any) => {
        if (res.status == 200) {
          this.alertify.success('Incentive Primary Details Updated Successfully');
          //this.incentiveid = 0;
          this.ShowAddIncentive = false;
          this.showTermsandConditions = false;
          this.showgrid = true;
          this.showIncentiveLineItems = false;
          this.showIncentiveView = false;
          if(this.datepipe.transform(this.incentiveMasterForm.value.datefrom,'MM/dd/yyyy') > todaydate )
          this.SearchIncentiveForm.controls["ddldate"].setValue("F");
        else  if(this.datepipe.transform(this.incentiveMasterForm.value.dateto,'MM/dd/yyyy') < todaydate )
          this.SearchIncentiveForm.controls["ddldate"].setValue("P");
       else  this.SearchIncentiveForm.controls["ddldate"].setValue("C"); 
         // this.getIncentivesList();
         this.viewIncentiveData(this.incentiveid, this.selectedbrandid, 'E');
        }
        else if(res.error=='IncentiveMaster Already Exists.'){
          this.alertify.error("Incentive Master Already Exists");
          return false;
        }
      });
    }
  }

  getIncentiveTermsAndConditions() {
    this.editTerms = '';
    const obj = {
      id: 0,
      "expression": "",
      "brandId": this._glbBrandId
    };
    this.ApiService.postmethod('termsandconditions/get', obj).subscribe(
      (response: any) => {
        console.log(response);
        if (response.status == 200) {
          this.TermsAndConditions = response.response;
          this.ShowAddIncentive = false;
          this.showTermsandConditions = true;
          this.showgrid = false;
          this.showIncentiveLineItems = false;
          this.showIncentiveView = false;

          // this.editTerms = 'Edit';
          
        }
      }
    );
  }
  incentiveRegions: any = [];
  getIncentiveVariablesData(): Promise<any> {
    return Promise.resolve(
      (() => {
        const obj = { IncentiveId: this.incentiveid, expression: '' };
        this.ApiService.postmethod(
          'incentivemaster/getvariabledata',
          obj
        ).subscribe((res: any) => {
          if (res.status == 200) {
            this.incentiveVaraibles = res.response;
            for(var i=0;i<this.incentiveVaraibles.length;i++){

            }
            this.incentiveRegions = [];
            this.incentiveVaraibles.forEach((element) => {
              if (element.regioname != '--')
                this.incentiveRegions.push(element.regioname);
              else{
                if(element.VariableName == " From")
                 this.FromDate="From "+element.INV_DATA;
                 if(element.VariableName == " To")
                 this.ToDate= element.INV_DATA;
              }  
            });
          }
        });
        return;
      })()
    );
  }
  TypeOfView: string = '';
  getDealerShipsByIncentive(inid):Promise<any> {
    return Promise.resolve(
      (()=>{
      this.selectedchkList = [];
      //this.dealershipStores = [];
      const obj = { IncentiveId: inid };
      this.ApiService.postmethod(
        'incentiveaccept/dealershipsbyincentive',
        obj
      ).subscribe((response: any) => {
        if (response.status == 200) {
          this.dealerships = response.response;
          //this.showDealerStores(this.regionids);
          if (this.dealerships.length != 0) {
            this.dvStores = true;
            for (var i = 0; i < this.dealerships.length; i++) {
              this.selectedchkList.push(this.dealerships[i].IND_Dealer_ID);
  
              let checked = false;
              let j=0;
              this.dealershipStores.forEach((item: any) => {
            
                if (item.dealer_id == this.selectedchkList[i]) {
                  this.dealershipStores[j].checked = 'Y';
                  item.value = item.dealer_id;
                  item.selected = checked;
                }
                j++;
              });
            }
          }
        }
      });
      return;

    })()
    );
   
  }

  viewIncentiveData(id, _brandId, TypeData) {
    this.showTermDiv = true;
    this.showSearchDiv=false;

    this.incentivesData=[];
    this.lineData=[];
    this.tacdata = [];
    this.VariablesData = [];
    this.LineItemsData = [];
    this.dealerships=[];
    this.incentiveRegions=[];
    this.FromDate='';
    this.ToDate='';
    
    if (TypeData == 'V') {
      this.TypeOfView = 'P';
      this.showLineItemsLink = false;
      this.isPublish = false;
      this.showTermDiv = false;
      //this.data=true;
     
    }
    if (TypeData == 'E') {
      this.TypeOfView = 'E';
      this.showLineItemsLink = true;
      this.isPublish = true;
      this.data=false;
    }

    this._glbBrandId = _brandId;
    this._glbIncentiveId = id;
    this.showIncentiveView = true;
    this.showgrid = false;
    this.selectedbrandid = [];
    this.GetBrandsList();
    // this.showIncentive = true;
    
    this.viewCancel = true;
    this.incentiveid = id;
    this.ViewIncentives();
    this.getIncentiveVariablesData();
    this.getIncentiveTermaAndConditionsData(id);
    this.getDealerShipsByIncentive(id);
    this.getIncentiveLineItemsData(id);
    //this.getIncentiveLineItemsData();

    if(TypeData == 'V')
    {
      this.incentiveaccept();
    }
  }

  ViewIncentives() {

    this.incentivesData=[];
    let param = this.SearchIncentiveForm.controls['ddldate'].value;
    const obj = { Id: this.incentiveid, expression: '','type':param,  "BrandIds":'',"groupId" : this.dealerGroupId, "dealerId" :  localStorage.getItem('dealeruserid')};
    this.ApiService.postmethod('incentivelist/dealerincentivemaster', obj).subscribe(
      (response: any) => {
        if (response.status == 200) {
          this.incentivesData = response.response[0];
          this._glbBrandId = response.response[0].brandids;
          this.glbIncentiveName=this.incentivesData.MI_NAME;
          this.glbIncentiveType=this.incentivesData.typename;
        
          this.lineItemsInfo["incentiveId"]=response.response[0].MI_ID;
          this.lineItemsInfo["incentiveName"]=response.response[0].MI_NAME;
          this.lineItemsInfo["incentiveType"]=response.response[0].typename;
          this.lineItemsInfo["brandId"]=response.response[0].brandids;
          console.log("Incentive Page BrandId"+this._glbBrandId);
        }
      }
    );
  }

  incentiveaccept() {
    this.incentiveacceptdata=[];
    const obj = {
      "IND_MI_ID":this.incentiveid
  }
    this.ApiService.postmethod('incentiveaccept/statusbyid', obj).subscribe((response: any) => {
      if (response.status == 200) {
        if(response.response.length !=0)
        this.data=true;
           this.incentiveacceptdata = response.response;
        console.log(this.incentiveacceptdata)
      }
    });
  }

  pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
  public presentDate: string = this.datepipe.transform(new Date(),'yyyy-MM-dd') ;
  public date1: string='';
  public date2: string='';

  display = [];
  changeFirstInput(e) {
    this.date1 = e.target.value;
    if(this.date2!='' && this.date2 < this.date1){
      this.alertify.error('Start Date Must be less than End Date');
      this.incentiveMasterForm.controls["datefrom"].setValue('');
      return false
    }
    this.display.push(this.date1);
  }

  changeSecondInput(e) {
    this.date2 = e.target.value;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    let todaydate =  yyyy + '-' +mm +'-'+dd;

    if(this.date1=='' && this.date2 > todaydate){
      this.incentiveMasterForm.controls["datefrom"].setValue(todaydate);

    }
    if(this.date2 < this.date1 ){
      this.alertify.error('End Date Must be greater than Start Date');
      this.incentiveMasterForm.controls["dateto"].setValue('');
      return false
    }
    this.display.push(this.date2);
    console.log('displayArray', this.display);
  }
  getLineItemsDetails() {
    const obj = {
      variableid: 0,
      expression: this.lineItemsInfo["brandId"],
    };
    //this.showIncentiveLineItems = true;
    this.ApiService.postmethod('incentivevariables/detailslist', obj).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.variablesList = res.response;
          this.ShowAddIncentive = false;
          this.showTermsandConditions = false;
          this.showgrid = false;
          this.showIncentiveLineItems = true;
          this.showIncentiveView = false;
        }
      }
    );
  }
  getIncentiveLineItemsData(incentiveid) {
    let ObjVal={};
     let UrlObjVal='';
     if(this.dealerShipId == 0){
         ObjVal ={IncentiveId: incentiveid, expression: '' };
         UrlObjVal = 'incentivemaster/getlineitems';
     }
     else if(this.dealerShipId != 0){
        ObjVal ={IncentiveId: incentiveid, expression: '','dealerid' : this.dealerShipId };
        UrlObjVal = 'incentivemaster/getlineitemsv1';
     }

    const obj = ObjVal;
    this.ApiService.postmethod(UrlObjVal, obj).subscribe(
      async (res: any) => {
        if (res.status == 200) {
          this.lineData = res.response;
          if(this.lineData.length !=0){
            this.DealerSpecificValues=[];
            for(var i=0;i<this.lineData.length;i++){
              if(this.lineData[i].Varaibles!='')
                this.DealerSpecificValues[i]= await this.parseXML(this.lineData[i].Varaibles);
            }
          }
        }
      }
    );
  }
  showIncentiveAddPanel() {
    this.showDealerIncentivePool=false;
    this.EditView=false;
    this.showSearchDiv=false;
    this.AddView=true;
    this.selectedFile='';
    this.fileName='';
    this.showBrandImageDiv=true;
    this.incentiveid = 0;
    this.submitted = false;
    this.ShowAddIncentive = true;

    this.showTermsandConditions = false;
    this.showgrid = false;
    this.showIncentiveLineItems = false;
    this.showIncentiveView = false;
    //this.selectedbrandid = [];
    this.dvStores = false;
    this.selectedchkList = [];
    this.selectedbrandid = [];
    this.selectedBrandsList = [];
    this.selectedBrandLogo = [];
    this.selectedBrands = [];
    this.getRegions();
    this.GetBrandsList();
    this.incentiveMasterForm = this.fB.group({
      incentivename: ['', Validators.required],
      incentivetype: ['', Validators.required],
      region: ['', Validators.required],
      datefrom: ['', Validators.required],
      dateto: ['', Validators.required],
      file:[''],
      description : [''],
      incentivecode :[''],
      selectall:['']
    });
    //this.incentiveMasterForm.controls['region'].setValue("");
    this.regionids = [];

    this.selectedRegionItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      text: 'Select',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class',
      primaryKey:"id",
      badgeShowLimit:1
    };
  }
   dealerGroupId=localStorage.getItem("dealerGroupId");
  getIncentivesList() {
    //this.alphaSrch="";
    this.showSearchDiv=true;
    this.incentivesArray = [];
    this.tempincentives=[];
    this.incentiveid=0;
    this.srchBrids=[];
    if(this.selectedSearchBrandItems.length!=0){
      for(var i=0;i<this.selectedSearchBrandItems.length;i++){
        this.srchBrids.push(this.selectedSearchBrandItems[i].id)
      }
    }
    let param = this.SearchIncentiveForm.controls['ddldate'].value;
    const obj = { Id: this.incentiveid, expression: '',type: param, "BrandIds": this.srchBrids.join(','),"groupId" : this.dealerGroupId, "dealerId" :  localStorage.getItem('dealeruserid')};
    this.ApiService.postmethod('incentivelist/dealerincentivemaster', obj).subscribe(
      (response: any) => {
        if (response.status == 200) {
          this.incentivesArray = response.response;
         // this.incentivesArray = this.incentivesArray.filter(x=>x.IncentiveType =='D');
          this.tempincentives = this.incentivesArray;
          if(this.incentivesArray.length == 0){
           this.onAlphaCatch("");
           this.atozFltr=false;
          }
          // this.showIncentiveView = false;
          // this.showIncentiveLineItems = false;
          // this.showTermsandConditions = false;
          // this.showgrid = true;
          console.log(this.tempincentives);
        }
      }
    );
  }

//   SortGrid(){
//     let field="MI_TS";
//    this.tempincentives.sort((a: any, b: any) => {
//      if (a[field] < b[field]) {
//          return -1;
//      } else if (a[field] > b[field]) {
//          return -1;
//      } else {
//          return 0;
//      }
//  });
//  this.tempincentives = this.tempincentives;
//    }
  
  getDimensionsByFind(id) {
    return this.OemBrands.find((x) => x.brand_chrome_id == id);
  }

  getIncentiveTermaAndConditionsData(id):Promise<any> {
    return Promise.resolve((()=>{
      this.tacdata = [];
      const obj = { IncentiveId: id, expression: '','BrandId' : this._glbBrandId };
      this.ApiService.postmethod(
        'termsandconditions/basedonincentive',
        obj
      ).subscribe((response: any) => {
        console.log(response);
        if (response.status == 200)
          if (response.response.length != 0) this.tacdata = response.response;
      });
      return;
    })()
    );
   
  }

  cancelEdit() {
    this.showIncentiveView = false;
    this.showSearchDiv=true;
    this.getIncentivesList();
    this.showgrid = true;
  }

  Publish() {
    let dealerid = 0;
     if(this.dealerShipId == 0)
      dealerid =  0;
     else
      dealerid = this.dealerShipId;
    const obj = { inm_id: this.incentiveid, dealer_id: dealerid,'incentivetype':'D' };
    this.ApiService.putmethod('incentiveaccept', obj).subscribe(
      (response: any) => {
        console.log(response);
        if (response.status == 200) {
          
          this.showIncentiveView = false;
          this.showIncentiveLineItems = false;
          this.showTermsandConditions = false;

          if(this.dealerShipId == 0){
          this.showgrid = true;
          this.showSearchDiv=true;
          this.getIncentivesList();
          this.closeModal('Confrim-publish');
          }
          else{
            this.closeModal('Confrim-publish');
            this.showgrid=false;
            this.UpdateStatus(this.incentiveid, dealerid);
            this.alertify.success("Incentive is added to your list and Data will populate soon.");
            this.getIncentivepoolBasedOnDealer();
            this.showDealerIncentivePool=true;
            this.showDropdown=true;
            this.showAddSymbol=false;
            this.showsearchBrand=false;

          }
          this.incentiveid = 0;
        }
      }
    );
  }

  BackToEdit() {
    this.showIncentiveLineItems = false;
    this.showIncentiveView = true;
    this.showIncentiveLineItems = false;
    this.showTermsandConditions = false;
  }
  CancelSAveClick() {
   if(this.incentiveid == 0){
      this.incentiveid = 0;
      this.showgrid = true;
      this.ShowAddIncentive = false;
      this.showSearchDiv=true;
    }
    else if(this.incentiveid !=0){
      this.showIncentiveView=true;
      this.ShowAddIncentive=false;
      
      }
  }
  onAlphaCatch(alphabet) {
    this.hide = true;
    this.atozFltr = true;
    this.alphaSrch = alphabet;
    this.incentivesArray = this.tempincentives;
    console.log(this.alphaSrch);
  }

  onSearch() {
    this.alphaSrch = this.SearchIncentiveForm.controls['txtsearch'].value;
    console.log(this.alphaSrch);
   if( this.SearchIncentiveForm.controls["ddldropdown"].value == "1")
       this.incentivesArray = this.tempincentives;
   else
     this.dealerdatapool = this.tempdealerincentives;  
  }

  atoZClick() {
    if (!this.atozFltr) this.atozFltr = true;
    else this.atozFltr = false;
  }
  editIncentive() {
    //this.incentiveid = id;
    //this.addclick = true;
    this.selectedFile='';
    this.showSearchDiv=true;
    this.showBrandImageDiv=false;
    this.ShowAddIncentive = true;
    this.showIncentiveView = false;
    this.showgrid = false;
    this.VariablesData = [];
    this.LineItemsData = [];
    this.submitted=false;
    this.getRegions();
    this.dropdownSettings = {
      singleSelection: false,
      text: 'Select Region(s)',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class',
      badgeShowLimit:1
    };

    this.selectedBrandsList = [];
    this.selectedBrandLogo = [];
    this.selectedbrandid = [];
    this.selectedRegionItems = [];
    this.selectedchkList = [];
    this.regionids = [];
    this.srchBrids=[];
    this.incentiveMasterForm = this.fB.group({
      incentivename: [''],
      incentivetype: [''],
      region: [''],
      datefrom: [''],
      dateto: [''],
      description : [''],
      file:[''],
      incentivecode :[''],
      selectall:['']
    });
    console.log(this.incentiveMasterForm.controls);
    let param = this.SearchIncentiveForm.controls['ddldate'].value;
    const obj = { Id: this.incentiveid, expression: '','type':param,"BrandIds": "","groupId" : this.dealerGroupId, "dealerId" :  localStorage.getItem('dealeruserid') };
    this.ApiService.postmethod('incentivelist/dealerincentivemaster', obj).subscribe((response: any) => {
        if (response.status == 200) {
          this.incentiveMasterForm.controls['incentivename'].setValue(response.response[0].MI_NAME);
          this.incentiveMasterForm.controls['incentivetype'].setValue(response.response[0].MI_TYPE_ID);
          this.incentiveMasterForm.controls['description'].setValue(response.response[0].Description);
          this.incentiveMasterForm.controls['incentivecode'].setValue(response.response[0].Code);
          if(response.response[0].DocName!='' || response.response[0].DocName!=null){
            this.EditView=true;
            this.AddView=false;
          this.selectedFile=response.response[0].DocName;
          this.originalFileName = response.response[0].OriginalFileName;
          }

          if(response.response[0].brandids!=''){
            let brids=response.response[0].brandids.split(',');
            if(brids.length>0){
              for (var i = 0; i < brids.length; i++) {
                this.selectedbrandid.push(brids);
              }
            }
          }
          if(response.response[0].BrandLogo!=''){
            let brids=response.response[0].BrandLogo.split(',');
            if(brids.length>0){
              for (var i = 0; i < brids.length; i++) {
                let brlogo=brids[i].split('@');

                this.selectedBrandsList.push({ 
                        brand_chrome_id: brlogo[1],
                        //brand_name: branditem.brand_name,
                        brand_logo: brlogo[0],
                      });

                //this.selectedbrandid.push(brlogo[1]);
                this.selectedBrandLogo.push(brlogo[0]);
                //this.selectedbrandid.push(branditem.brand_chrome_id);
              }
            }
          }

          const obj1 = { IncentiveId: this.incentiveid, expression: '' };
          this.ApiService.postmethod('incentivemaster/getvariabledata', obj1).subscribe((res: any) => {
            if (res.status == 200) {
              let changeformat = '';

              if (res.response.length != 0) {
                for (var i = 0; i < res.response.length; i++) {
                  if (res.response[i].INV_MIV_ID == 8) {
                    let fromdatestring = res.response[i].INV_DATA;

                    if (fromdatestring.indexOf('-') !== -1)
                      this.incentiveMasterForm.controls['datefrom'].setValue(fromdatestring);
                    else {
                      changeformat = this.datepipe.transform(fromdatestring,'yyyy-MM-dd');
                      this.incentiveMasterForm.controls['datefrom'].setValue(changeformat);
                    }
                  }
                  if (res.response[i].INV_MIV_ID == 9) {
                    let todatestring = res.response[i].INV_DATA;

                    if (todatestring.indexOf('-') !== -1)
                      this.incentiveMasterForm.controls['dateto'].setValue(res.response[i].INV_DATA);
                    else {
                      changeformat = this.datepipe.transform(todatestring,'yyyy-MM-dd' );
                      this.incentiveMasterForm.controls['dateto'].setValue(changeformat);
                    }
                  }

                  // if (res.response[i].VariableName == 'Brand') {
                  //   let branditem = this.getDimensionsByFind( res.response[i].INV_DATA);
                  //   //let branditem= this.OemBrands.find(x=> x.brand_chrome_id == res.response[i].INV_DATA)
                  //   setTimeout(()=>{
                  //   this.selectedBrandsList.push({
                  //     brand_chrome_id: branditem.brand_chrome_id,
                  //     brand_name: branditem.brand_name,
                  //     brand_logo: branditem.brand_logo,
                  //   });
                  //   this.selectedBrandLogo.push(branditem.brand_logo);
                  //   this.selectedbrandid.push(branditem.brand_chrome_id);
                  // },500);
                  // }

                  if (res.response[i].VariableName == 'Region') {
                    this.selectedRegionItems.push({ id: parseInt(res.response[i].INV_DATA), itemName: res.response[i].regioname, });
                    this.regionids.push(parseInt(res.response[i].INV_DATA));
                  }
                  
                }
                //this.GetBrandsList();
                //setTimeout(()=>{
                  this.showDealerStores(this.regionids);
                //},1000)
               
              }
             // this.getDealerShipsByIncentive(this.incentiveid);
            }
          });
        }
      }
    );
  }
  TermsAndConditionsSave(e) {
    console.log(e);
    this.FinalArray = e;
    const obj = { termsandconditionsdata: this.FinalArray };
    console.log(this.FinalArray);
    if (this.editTerms == '') {
      this.ApiService.postmethod('termsandconditionsdata', obj).subscribe(
        (res: any) => {
          console.log(res);
          if (res.status == 200) {
            //this.router.navigateByUrl('incentiveMaster');
            this.alertify.success('Terms and Conditions Added Successfully');
            this.showIncentiveLineItems = false;
            this.showIncentiveView = true;
           // this.showTermDiv = false;
            this.showIncentiveLineItems = false;
            this.showTermsandConditions = false;
            this.getIncentiveTermaAndConditionsData(this.incentiveid);
            this.showLineItemsLink = true;
           
            if(this.TypeOfView ='E'){
             this.showTermDiv=true;
             this.viewCancel = true;
            }
          }
        }
      );
    } else if (this.editTerms == 'Edit') {
      this.ApiService.postmethod('termsandconditionsdata', obj).subscribe(
        (res: any) => {
          console.log(res);
          if (res.status == 200) {
            //this.router.navigateByUrl('incentiveMaster');
            this.alertify.success('Terms and Conditions Added Successfully');
            this.showIncentiveLineItems = false;
            this.showIncentiveView = true;
            this.showTermDiv = false;
            this.showIncentiveLineItems = false;
            this.showTermsandConditions = false;
            this.getIncentiveTermaAndConditionsData(this.incentiveid);
            this.showLineItemsLink = true;
            this.viewCancel = false;
            if(this.TypeOfView=='E'){
              this.showTermDiv=true;
              this.viewCancel = true;
            }
          }
        }
      );
    }
  }
  onDetailsCancel(detailView) {
    this.getIncentiveLineItemsData(this._glbIncentiveId);
    this.showIncentiveLineItems = false;
    this.showIncentiveView = true;
    this.showLineItemsLink1 = true;
  }

  EditTermsAndConditions() {
    this.getIncentiveTermsAndConditions();
     this.editTerms = 'Edit';
    // this.showTermsandConditions = true;
  }

  EditLineItems(lineHdrId,squencId) {
    this.detailViewType = 'U';
    this._glbLineHdrId = lineHdrId;
    this._glbLnhdrSeqnId = squencId+1;
    this.lineItemsInfo["lineHdrId"]=lineHdrId;
    this.lineItemsInfo["lineHdrSeqnId"]=squencId+1;
    this.lineItemsInfo["viewType"]="U";
    this.getLineItemsDetails();
    // this.showIncentiveLineItems = true;
    
  }

  openModal(id: string) {
    this.modalSrvc.open(id);
    }
    closeModal(id: string) {
    this.modalSrvc.close(id);
    }
    openBrandModal(id: string) {
      //this.showBrand = false;
      this.modalSrvc.open(id);
    }
  
    closeBrandModal(id: string) {
      this.modalSrvc.close(id);
      $('body').removeClass('modal-open');
    }
    

    ViewLineItems(){
      this.detailViewType="";
      this._glbLineHdrId=1;
      this.lineItemsInfo["viewType"]="";
      this.lineItemsInfo["lineHdrId"]="1";
      this.getLineItemsDetails();
      }
      Processfile(e){
        this.EditView=false;
        this.AddView=true;
        this.selectedFile='';
        this.fileName= e.target.files[0];
        var reader = new FileReader();      
    reader.readAsDataURL(e.target.files[0]); 
    reader.onload = (event) => { 
      this.selectedFile = reader.result;
      };
    }

    Review(){
      const obj = { incentiveId: this.incentiveid, incentivetype: 'D' };
    this.ApiService.postmethod('incentivemaster/incentivereviewing', obj).subscribe(
      (response: any) => {
        console.log(response);
        if (response.status == 200) {
          this.incentiveid = 0;
          this.showIncentiveView = false;
          this.showIncentiveLineItems = false;
          this.showTermsandConditions = false;
          this.showgrid = true;
          this.showSearchDiv=true;
          this.getIncentivesList();
          this.closeModal('Confrim-review');
        }
      }
    );
    }
    parseXML(data) {  
      return new Promise(resolve => {  
        var k: string | number,  
          arr = [],  
          parser = new xml2js.Parser(  
            {  
              trim: true,  
              explicitArray: true  
            });  
        parser.parseString(data, function (err, result) {  
          var obj = result.Variables;  
          for (k in obj.variable) {  
            var item = obj.variable[k];  
            arr.push({  
              dealerspecific : item.MIV_DEALER_SPECIFIC, 
              name: item.MIV_DISPLAY_NAME,  
              value : item.DS,
              prefix: item.MIV_PREFIX
            });  
            console.log(arr)
          }  
          resolve(arr); 
        });  
      });  
    }
    deleteIncentiveData(inid) {
      let obj = { 'inmid': inid }
      if (confirm('Are you sure to delete ?')) {
        this.ApiService.deleteElement(obj, 'incentivelist').subscribe((res: any) => {
          if (res.status == 200) {
            this.alertify.success('Incentive deleted successfully');
            this.getIncentivesList();
          }
        });
      }
    }
    openDocument(url){
      var width  = screen.width;
      var height = screen.height;
      // var left   = screen.width - 960;
      // var top    = 20;
      var params = 'width='+width+', height='+height;
      //params += ', top='+top+', left='+left;
      params += ', directories=no';
      params += ', location=no';
      params += ', menubar=no';
      params += ', resizable=yes';
      params += ', scrollbars=no';
      params += ', status=no';
      params += ', toolbar=no'; 
      window.open(this.ImagPath+'/'+url, '_blank', params)
    }
    deleteDocument(){
      this.selectedFile='';
      this.fileName='';
      if(this.incentiveid !=0){
        this.originalFileName = '';
      }
   }

    // DealerIncentive pool functionality

   getIncentivepoolBasedOnDealer() {
   
    const obj = {
      "ID": this.dealerShipId,
      "type":this.SearchIncentiveForm.controls['ddldate'].value,
      "incentivetype": "D"
    }
    this.ApiService.postmethod('incentiveaccept/basedondealer', obj).subscribe(res => {
      console.log('get')
      console.log(res)
     // this.response = res
      if (res.status == 200) {
        this.Dealerdata = res.response;
        this.dealerdatapool = this.Dealerdata
        this.tempdealerincentives = this.dealerdatapool;
        console.log(this.data)
        console.log(this.dealerdatapool);
        // if (this.Dealerdata.length != 0) {
        //   this.result = false
        // }
        // else {
        //   this.result = true
        // }

      }
    })
  }

  regionsData:any=[];
  tncdealerspecificvalues:any=[];
  incentivelineitems:any=[];
  btnsub:boolean=false;
  incentivedata:any='';
  termsandconditions
 
  tncdealerspecificdelete: any[];
  incentivelineitemsdealers: any[];
  termsForm: FormGroup;
  termsynObj: any = [];
  dealerSpecData = [];
  ackDetail = false;
  enableackowledge: boolean;
  public dealerspecificvalues: any = [];
  fullUrl = `${environment.apiUrl}`;
  dealerspecific: FormGroup;
  detailsdealerspecific: FormGroup;
  detailSpecFormGroup: FormGroup;

  imagebinding = this.fullUrl + 'resources/images/'
 
  tncdealerspecificyorn: any;
  dealer_id: any;
  notes: string;
  incentivevariables: any = [];
  dealeraccept: any;
  public Todate: any = [];
  incentivemaster: any;
  fromDate: any;
  ackButton: boolean = false;


  details(item, i) {
    this.edittandc = 'N'

   // console.log(this.dealerspecificdesvalue)
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
    this.incentiveid = item.IND_MI_ID;

    const obj = {
      "IncentiveId": this.incentiveid,
      "DealerId": this.dealer_id,
      "expression": ""
    }
    console.log(obj)
    this.ApiService.postmethod('incentivedata/forntendincentivesdata', obj).subscribe(res => {
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

     this.dealerdatapool.forEach((element, index) => {
    //  console.log(index)
    //  console.log(i)
      if (index === i) {
        this.dealerdatapool[i].show = !this.dealerdatapool[i].show;

      } else {
        element.show = false;

      }
    });
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
  remove(i: number) {
    this.quantities().removeAt(i);
  }

  UpdateStatus(inmid, dealerid) {
    console.log(inmid)
    console.log(dealerid)
    const obj = {
      "inm_id": inmid,
      "dealer_id": dealerid,
      "IncentiveType": "D"  
    }
    this.ApiService.postmethod('incentiveaccept', obj).subscribe(res => {
      console.log(res)
      if (res.status == 200) {
        //  this.alertify.success("Request Accepted")
        // alert("Request Accepted")
        this.getIncentivepoolBasedOnDealer();
      }
      else {
        // alert("Please Check Details")
        //  this.alertify.error("Request Not Accepted")
      }
    })
  }
  cancel() {
  
  
    for (var i = 0; i <= this.dealerspecific.value.quantities.length; i++) {
      this.remove(i)
    }
  }
  hideandshow() {
    this.edittandc = 'Y'

  }
  editDealertermsandconditions() {

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
          "Ds_inc_id": this.incentiveid,
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

      this.ApiService.deleteElement(obj, 'dealerspecificvalues').subscribe((res: any) => {
        console.log(res)
        if (res.status === 200) {
          //  this.alertify.success("DealerSpecific Deleted Successfully")
          const obj1 = {
            "dealerspecificvalues": this.ComponentFinalArray
          }
          console.log(obj1)
          this.ApiService.postmethod('dealerspecificvalues', obj1).subscribe(res => {
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
              this.getIncentivepoolBasedOnDealer();

            }
            else {
              this.alertify.error("Please check!!")
            }
          })
        }
      })
    }
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
    this.incentiveid = item.IND_MI_ID;
    localStorage.setItem('incentiveid',this.incentiveid.toString())

    const obj = {
      "IncentiveId": this.incentiveid,
      "DealerId": this.dealer_id,
      "expression": ""
    }
    console.log(obj)
    this.ApiService.postmethod('incentivedata/forntendincentivesdata', obj).subscribe(res => {
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
      "IND_MI_ID":this.incentiveid
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

    this.dealerdatapool.forEach((element, index) => {
    //  console.log(index)
    //  console.log(i)
      if (index === i) {
        this.dealerdatapool[i].show = !this.dealerdatapool[i].show;

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

  overallopenmodelpopup() {
    this.setDealerSpecDetail();
    this.saveDealerSpecific();

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
        'Ds_in_id': this.incentiveid,
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
      this.UpdateStatus(this.incentiveid, this.dealer_id)
      this.alertify.success("Incentive is added to your list and Data will populate soon.")
    }

    else {
      const obj = {
        "dealerspecificvariablevalues": this.ComponentDetailsArray
      }
      console.log(obj);
      this.ApiService.postmethod('dealerspecificvariablevalues', obj).subscribe(res => {
        console.log(res)
        if (res.status == 200) {
          this.submitted = false;
          this.UpdateStatus(this.incentiveid, this.dealer_id)
          this.alertify.success("Incentive is added to your list and Data will populate soon.")
          $('.modal-backdrop').remove();
          this.popup = false;
          this.ackButton = false;
          this.getIncentivepoolBasedOnDealer();
        }
        else {
          this.alertify.error("Please check!!")
        }
      });
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
          "Ds_inc_id": this.incentiveid,
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

  savedealer() {
    console.log(this.ComponentFinalArray)
    if (this.ComponentFinalArray == undefined) {
      this.UpdateStatus(this.incentiveid, this.dealer_id)
      this.alertify.success("Incentive is added to your list and Data will populate soon.")

    }

    else {
      const obj = {
        "dealerspecificvalues": this.ComponentFinalArray
      }
      console.log(obj)
      this.ApiService.postmethod('dealerspecificvalues', obj).subscribe(res => {
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
          this.UpdateStatus(this.incentiveid, this.dealer_id)
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

  overallaknowledge() {
    if (this.ComponentFinalArray.length == 0 && this.ComponentDetailsArray.length ==0 ) {
      this.UpdateStatus(this.incentiveid, this.dealer_id)
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
    if (this.ComponentDetailsArray.length != 0) {
      this.saveDetailSpec();
    }
    
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
        if (this.btnsub == true || this.ackDetail == true) {
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
              this.dealerSpecData.push({ id: varblId, value: event.target.value, lineId: lineId, combinationId: this.setEvalOptVal.length !== 0 ? this.setEvalOptVal : "0" });
            }
            else {
              this.dealerSpecData[overAllIndex] = { id: varblId, value: event.target.value, lineId: lineId, combinationId: this.setEvalOptVal.length !== 0 ? this.setEvalOptVal : "0" };
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
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      this.alertify.error("Enter Numbers only!!")
      return false;
    }

    return true;

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
    
  
}
