import { Component, OnInit, Output, EventEmitter, Input, Inject } from '@angular/core';
import { ApiService } from '../../Core/_providers/api-service/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormControl } from '@angular/forms';
import { AlertifyService } from '../../Core/_providers/alert-service/alertify.service'
import { Router, NavigationEnd } from '@angular/router';
import {AdminServiceService} from '../../Core/_providers/admin-service/admin-service.service'

@Component({
  selector: 'app-inventory-analysis',
  templateUrl: './inventory-analysis.component.html',
  styleUrls: ['./inventory-analysis.component.scss']
})
export class InventoryAnalysisComponent implements OnInit {

  @Output() xInvtryClick: EventEmitter<any> = new EventEmitter<any>();
  @Input('storeDealerId') storeDealerId: string = "";
  @Input('loadByStockInfo') loadByStockInfo: any = [];
  url: string;
  inctvStorInfo: any[];
  topdealer: any;
  dlrshpId: string

  constructor(public apiSrvc: ApiService, private spinner: NgxSpinnerService,
    public fb: FormBuilder, private router: Router, private alertify: AlertifyService,private admsrvs:AdminServiceService) {
    // console.log(router.url);
    // localStorage.setItem('path', router.url);
    // this.url = localStorage.getItem('path')
    // console.log(this.url)
    // router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     this.url !== event.url;
    //     this.closeDialog();
    //   }
    // })
  }

  // modelForm=this.fb.group({ 
  //   ddlYear:['',''],
  //   ddlMake:['',''],
  //   ddlModel:['',''],
  //   ddlTrim:['',''],
  //   ddlStock:['',''],
  //   ddlIntrColor:['',''],
  //   ddlExtrColor:['',''],
  //   txtVin:""
  //   // year: ['', [Validators.required]],
  //   // model: ['', [Validators.required]]
  // })

  ddlYear = new FormControl('');
  ddlMake = new FormControl('');
  ddlModel = new FormControl('');
  ddlTrim = new FormControl('');
  ddlStock = new FormControl('');
  ddlIntrColor = new FormControl('');
  ddlExtrColor = new FormControl('');

  txtVin1 = new FormControl('');
  txtVin2 = new FormControl('');
  txtVin3 = new FormControl('');
  txtVin4 = new FormControl('');
  txtVin5 = new FormControl('');
  txtVin6 = new FormControl('');
  txtVin7 = new FormControl('');
  txtVin8 = new FormControl('');


  radioOff: string = "";
  radioOn: string = "";
  intStatus: boolean = true;
  _makeId: number = 0;
  _modelId: number = 0;
  _year: number = 0;
  _trim: string = "";
  _intrColor: string = "";
  _extrColor: string = "";
  _vin: string = "";
  _stockType: string = "";
  _glbDealerId: string = "";
  Result: string = "";

  ngOnInit(): void {


    this.spinner.show();
    this.getStoreIncentives();
    // this.loadByStockInfo=this.data
    // console.log(this.loadByStockInfo)
    // this.loadByStockInfo=   [{ "Year": "0", "MakeId": "0", "ModelId": "0" }];
    console.log("inventory page")
    this._glbDealerId = this.storeDealerId;
    console.log(this._glbDealerId)
    this._glbDealerId = localStorage.getItem('dealerstoreid')
    console.log(this._glbDealerId)

    this.radioOff = "assets/images/radio_off.png";
    this.radioOn = "assets/images/radio_on.png";
    console.log(this.loadByStockInfo)
    console.log("Inv By Stock" + this.loadByStockInfo["Year"]);
    if (this.loadByStockInfo.length != 0) {
      this.intStatus = false;
      this.ddlStock.setValue(0);
      this.loadByStock();
      this.getInvtryDropDownInfo("I", 0, 0, 0, "RCM");
    }
    else {
      this.ddlStock.setValue('NEW');
      this.ddlMake.setValue(0);
      this.intStatus = true;
      this.getInvtryDropDownInfo("Y", 0, 0, 0, "");
      this.getInvtryDropDownInfo("I", 0, 0, 0, "");

    }
    this.ddlTrim.setValue(0);
    this.ddlIntrColor.setValue(0);
    this.ddlExtrColor.setValue(0);

    this.getInvtryDropDownInfo("T", 0, 0, 0, "");
    this.getInvtryDropDownInfo("E", 0, 0, 0, "");
    //this.getInventoryDetails("");


    // this.spinner.hide();
  }

  globalInvntryIndx: number = -1;
  expandRow(index) {
    if (this.globalInvntryIndx == -1)

      this.globalInvntryIndx = index;
    else
      this.globalInvntryIndx = -1;
  }


  globalRadioIndex: number = -1;
  onRadioClick(index: number) {
    this.globalRadioIndex = index;

  }
  getdealershipid(e) {
    console.log(e.target.value)
    this.dlrshpId = e.target.value;
    // console.log(this.topincentive);

    // this.topincentive = ''
    // console.log(this.topincentive)

    // this.getSubStoreIncentives()
    // this.getRecomndInfo()
    this.getInventoryAnalysisDetails()
  }
  getStoreIncentives() {


    const obj = { "groupid": localStorage.getItem('dealerGroupId').toString(), "brandid": 0, "regionid": 0, "dealerid": localStorage.getItem('DealerId'), "incentivetype":"O" };

    console.log(obj)
    this.apiSrvc.postmethod('incentivedata/storesdata', obj).subscribe((resp: any) => {
      this.inctvStorInfo = [];
      //    this.spinner.hide();
      if (resp.status == "200") {
        if (resp.response != null) {

          this.inctvStorInfo = resp.response.StoresData.Data;

          console.log(this.inctvStorInfo)
          this.topdealer = this.inctvStorInfo[0].dealerid[0];
          this.getInventoryAnalysisDetails()
        }
      }
    })


  }

  invntryDetails: any = [];
  getInventoryAnalysisDetails() {
    //this.spinner.show();
    //   console.log(expr)
    this.intStatus = false;
    // const obj={
    //   "dealerId": this._glbDealerId.toString(),
    //   "expression":expr,

    // };
    const obj = {
      "dealerId": this.topdealer,

      "expression": ""
    }
    console.log(obj)
    if (obj.dealerId == 0) {
      this.alertify.error("please select Dealership")
    }
    this.invntryDetails = [];

    this.admsrvs.invenData(obj).subscribe((resp: any) => {
console.log(resp)
      if (resp.status == "200") {
        if (resp.response != null) {
          console.log(resp)
          this.invntryDetails = resp.response.Inventory.InventoryData;
console.log(this.invntryDetails)
        }
        if (this.invntryDetails.length == 0)
          this.Result = 'No Records Found !!';
        else
          this.Result = '';
        this.spinner.hide();
      }
    })
  }

  // getInventoryDetails(expr) {
  //   //this.spinner.show();
  //   // console.log(expr)
  //   this.intStatus = false;
  //   // const obj={
  //   //   "dealerId": this._glbDealerId.toString(),
  //   //   "expression":expr,

  //   // };
  //   const obj = {
  //     "Dealershipid": this.dlrshpId,
  //     "incentiveid": "0",
  //     "lineitemid": "0"
  //   }
  //   console.log(obj)
  //   this.invntryDetails = [];

  //   this.apiSrvc.postmethod('soldunitsdata/getincentiveinventorydata', obj).subscribe((resp: any) => {

  //     if (resp.status == "200") {
  //       if (resp.response != null) {
  //         console.log(resp)
  //         this.invntryDetails = resp.response;

  //       }
  //       if (this.invntryDetails.length == 0)
  //         this.Result = 'No Records Found !!';
  //       else
  //         this.Result = '';
  //       this.spinner.hide();
  //     }
  //   })
  // }

  onInvClose() {
    this.xInvtryClick.emit();
    this.clearDropDown();
  }


  loadInvntryExpr() {
    let expr = "";

    //retrieving deropdown values
    this._year = this.ddlYear.value;
    this._makeId = this.ddlMake.value;
    this._modelId = this.ddlModel.value;
    this._stockType = this.ddlStock.value;
    this._intrColor = this.ddlIntrColor.value;
    this._extrColor = this.ddlExtrColor.value;
    this._trim = this.ddlTrim.value;
    console.log("Trim ddl value" + this._trim)
    console.log("ExtColor ddl value" + this._extrColor)
    console.log("IntColor ddl value" + this._intrColor)


    if (this.intStatus)
      this._year = 0;



    if (this._year != 0) {
      if (this.intStatus)
        expr += " and cdk.MakeYear=" + this._year + " and cdk.Stock like '%New%'";
      else
        expr += " and cdk.MakeYear=" + this._year + "";
    }
    if (this._makeId != 0)
      expr += " and cdk.brandid=" + this._makeId + "";
    if (this._modelId != 0)
      expr += " and cdk.modelid=" + this._modelId + "";
    if (this._stockType != "0")
      expr += " and cdk.Stock like '%" + this._stockType + "%'";
    if (this._intrColor != "0")
      expr += " and cdk.InteriorColor like '%" + this._intrColor + "%'";
    if (this._extrColor != "0")
      expr += " and cdk.ExteriorColor like '%" + this._extrColor + "%'";
    if (this._trim != "0")
      expr += " and sty.Trimname like '%" + this._trim + "%'";


  //  this.getInventoryDetails(expr);
  }

  onSubmit() {

  }

  ddlInvtryInfo: any = []; ddlYearInfo: any = []; ddlMakeInfo: any = []; ddlModelInfo: any = [];
  ddlTrimInfo: any = []; ddlExtClrInfo: any = []; ddlIntClrInfo: any = [];
  getInvtryDropDownInfo(srchType, year, make, model, fromEvent) {
    //  let year="",make="",model="";
    //     year=this.ddlYear.value;
    //     make=this.ddlMake.value;
    //     model=this.ddlMake.value;

    const obj = {
      "dealerId": this._glbDealerId.toString(),
      "srchtype": srchType,
      "Year": year,
      "Make": make,
      "Model": model

    };

    this.ddlInvtryInfo = [];

    this.apiSrvc.postmethod('inventory/getInfo', obj).subscribe((resp: any) => {
      //this.spinner.hide();
      if (resp.status == "200") {
        if (resp.response != null) {

          this.ddlInvtryInfo = resp.response;

          if (fromEvent === "RCM") {
            this.ddlYear.setValue(this.loadByStockInfo['Year']);
            this.ddlMake.setValue(this.loadByStockInfo['MakeId']);
            this.ddlModel.setValue(this.loadByStockInfo['ModelId']);
          }

          if (srchType === "Y") {
            this.ddlYearInfo = [];
            this.ddlYearInfo = this.ddlInvtryInfo;
            if (fromEvent === "") {
              this.ddlYear.setValue(0);
              this.ddlMake.setValue(0);
              this.getInvtryDropDownInfo("MK", this.ddlYear.value, 0, 0, "");
            }
            else if (fromEvent === "RCM") {
              this.getInvtryDropDownInfo("MK", this.loadByStockInfo['Year'], 0, 0, "RCM");
              this.ddlYear.setValue(this.loadByStockInfo['Year']);
            }
            else
              this.getInvtryDropDownInfo("MK", this.ddlYear.value, 0, 0, "");
          }

          if (srchType === "MK") {
            this.ddlMakeInfo = [];
            this.ddlMakeInfo = this.ddlInvtryInfo;
            this._makeId = this.ddlMake.value;


            if (fromEvent === "DDL") {
              this.ddlModel.setValue(0);
              if (this.ddlMake.value != "0")
                this.getInvtryDropDownInfo("MD", this.ddlYear.value, this.ddlMake.value, 0, "");
              this.ddlMake.setValue(this._makeId);

            }
            else if (fromEvent === "RCM") {
              this.getInvtryDropDownInfo("MD", this.loadByStockInfo['Year'], this.loadByStockInfo['MakeId'], 0, "RCM");
              this.ddlMake.setValue(this.loadByStockInfo["MakeId"]);
            }
            else {
              this.ddlMake.setValue(0);
              this.ddlModel.setValue(0);
            }

          }
          if (srchType === "MD") {
            this.ddlModelInfo = [];
            this.ddlModelInfo = this.ddlInvtryInfo;
            if (fromEvent === "RCM") {
              this.ddlModel.setValue(this.loadByStockInfo["ModelId"]);
              this.loadInvntryExpr();
            }
            else if (fromEvent === "")
              this.ddlModel.setValue(0);

          }

          if (srchType === "T") {
            this.ddlTrimInfo = [];
            this.ddlTrimInfo = this.ddlInvtryInfo;
            this.ddlTrim.setValue(0);
          }

          if (srchType === "E") {
            this.ddlExtClrInfo = [];
            this.ddlExtClrInfo = this.ddlInvtryInfo;
            this.ddlExtrColor.setValue(0);
          }

          if (srchType === "I") {
            this.ddlIntClrInfo = [];
            this.ddlIntClrInfo = this.ddlInvtryInfo;
            this.ddlIntrColor.setValue(0);
            if (fromEvent === "")
              this.loadInvntryExpr();
          }

          if (fromEvent === "DDL")
            this.loadInvntryExpr();


        }
      }
    })
  }


  assignDropDown(srchType) {
    if (srchType === "S") {
      this.loadInvntryExpr();
    }
    if (srchType === "Y") {
      this.ddlMake.setValue(0);
      this.getInvtryDropDownInfo("MK", this.ddlYear.value, 0, 0, "DDL")

    }
    if (srchType === "MK") {
      this.ddlModel.setValue(0);
      if (this.ddlMake.value != "0")
        this.getInvtryDropDownInfo("MD", this.ddlYear.value, this.ddlMake.value, 0, "DDL")
      else {
        this.ddlModelInfo = [];
        this.loadInvntryExpr();
      }
    }
    if (srchType === "MD") {
      this.loadInvntryExpr();
    }
    if (srchType === "T") {
      this.loadInvntryExpr();
    }
    if (srchType === "E")
      this.loadInvntryExpr();
    if (srchType === "I")
      this.loadInvntryExpr();

  }

  clearDropDown() {
    this.ddlStock.setValue('NEW');
    this.ddlMake.setValue(0);
    this.ddlTrim.setValue(0);
    this.ddlIntrColor.setValue(0);
    this.ddlExtrColor.setValue(0);
    // this.closeDialog()
  }


  _vinTxt: string = "";
  keytab($event) {
    let element = $event.srcElement.nextElementSibling;

    if (element == null) {
      this._vinTxt = this._vinTxt + this.txtVin1.value;
      this._vinTxt = this._vinTxt + this.txtVin2.value;
      this._vinTxt = this._vinTxt + this.txtVin3.value;
      this._vinTxt = this._vinTxt + this.txtVin4.value;
      this._vinTxt = this._vinTxt + this.txtVin5.value;
      this._vinTxt = this._vinTxt + this.txtVin6.value;
      this._vinTxt = this._vinTxt + this.txtVin7.value;
      this._vinTxt = this._vinTxt + this.txtVin8.value;
      let expr = ""

      if (this._vinTxt != "") {
        expr = "and vehicle_vin like '%" + this._vinTxt + "'";
     //   this.getInventoryDetails(expr);
      }
      else
        return;
    }

    else
      element.focus();
  }

  // onPaste(event:ClipboardEvent,$event){
  //   let pasTxt=event.clipboardData.getData('text');
  //   console.log("Pasted text"+pasTxt)
  //   return this.keytab($event);
  //   (paste)="onPaste($event,$event)"
  // }

  loadByStock() {
    if (this.loadByStockInfo.length != 0) {

      this.getInvtryDropDownInfo("Y", this.ddlYear.value, 0, 0, "RCM");
      // this.ddlYear.setValue(this.loadByStockInfo['Year']);
      // this.ddlMake.setValue(this.loadByStockInfo['MakeId']);
      // this.ddlModel.setValue(this.loadByStockInfo['ModelId']);

    }
  }
  // closeDialog(): void {
  //   this.dialogRef.close();
  // }


}
