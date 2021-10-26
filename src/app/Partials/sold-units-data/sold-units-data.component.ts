import { Component, OnInit, Output, EventEmitter, Input, Inject } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../Core/_providers/api-service/api.service';
import { FormBuilder, FormControl } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-sold-units-data',
  templateUrl: './sold-units-data.component.html',
  styleUrls: ['./sold-units-data.component.scss']
})
export class SoldUnitsDataComponent implements OnInit {
  url: string;
  soldunitsdata: any;
  solddata: any;
  record: string;
  unitprice: any = [];
  visible: string;
  constructor(public apiSrvc: ApiService, private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<SoldUnitsDataComponent>,
    public fb: FormBuilder, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(router.url);
    localStorage.setItem('path', router.url);
    this.url = localStorage.getItem('path')
    console.log(this.url)
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.url !== event.url;
        this.closeDialog();
      }
    })

  }


  @Output() xInvtryClick: EventEmitter<any> = new EventEmitter<any>();

  @Input() parentMessage: string;
  ngOnInit(): void {
  
  this.visible='N'
    this.Result = '';

    this.spinner.show();
    console.log(this.data)
 //   this.soldunitsdata = this.data
  //  console.log(this.soldunitsdata)
    this.url = localStorage.getItem('path')
    console.log(this.url)
    if (this.router.url !== this.url) {
      this.closeDialog();
    }
    const obj = {
      "Dealershipid": this.data[0].Dealershipid,
      "incentiveid": this.data[0].incentiveid,
      "lineitemid": this.data[0].lineitemid
    }
    console.log(obj)
    this.apiSrvc.postmethod('soldunitsdata/get', obj).subscribe((resp: any) => {
      console.log(resp)
      if (resp.status == "200") {

        this.solddata = resp.response;
        console.log(this.solddata.length)
        if (this.solddata.length > 0) {
          if (this.solddata[0].PriceType == 1) {
            this.record = "MSRP"
            for (var i = 0; i < this.solddata.length; i++) {

              // this.unitprice.push(this.solddata[i].MSRP)
              // }
              this.unitprice.push({
                'value': this.solddata[i].MSRP,
                'Vin': this.solddata[i].Vin,
                'Year': this.solddata[i].Year,
                'Brand': this.solddata[i].Brand,
                'ModelName': this.solddata[i].ModelName,
              });
            }
            console.log(this.unitprice)

          }
          if (this.solddata[0].PriceType == 0) {
            this.record = "SALEPRICE"
            for (var i = 0; i < this.solddata.length; i++) {

              this.unitprice.push({
                'value': this.solddata[i].SalePrice,
                'Vin': this.solddata[i].Vin,
                'Year': this.solddata[i].Year,
                'Brand': this.solddata[i].Brand,
                'ModelName': this.solddata[i].ModelName,
              });
            }
            console.log(this.unitprice)
          }
          // if (this.solddata[0].PriceType == undefined) {
          //   this.record = "MSRP"
          // }

        }
        else {
          this.visible='Y'
          this.record = "MSRP"
          this.Result = 'No Records Found !!';
        }
        //  this.record = 'N';
        //  alert(this.record)

        this.spinner.hide()

      }
    })
  }
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

  // ngOnInit(): void {
  //   this.spinner.show();
  //   this._glbDealerId=this.storeDealerId;
  //   this.radioOff="assets/images/radio_off.png";
  //   this.radioOn="assets/images/radio_on.png";
  //   console.log("Inv By Stock"+this.loadByStockInfo["Year"]);
  //   if(this.loadByStockInfo.length!=0)
  //   {
  //     this.intStatus=false;
  //     this.ddlStock.setValue(0);
  //     this.loadByStock();
  //     this.getInvtryDropDownInfo("I",0,0,0,"RCM");
  //   }
  //   else{
  //     this.ddlStock.setValue('NEW');
  //     this.ddlMake.setValue(0);
  //     this.intStatus=true;
  //     this.getInvtryDropDownInfo("Y",0,0,0,"");
  //     this.getInvtryDropDownInfo("I",0,0,0,"");

  //   }
  //   this.ddlTrim.setValue(0);
  //   this.ddlIntrColor.setValue(0);
  //   this.ddlExtrColor.setValue(0); 

  //   this.getInvtryDropDownInfo("T",0,0,0,"");
  //   this.getInvtryDropDownInfo("E",0,0,0,"");
  //   //this.getInventoryDetails("");


  //  // this.spinner.hide();
  // }

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

  //   onKey(e){
  // alert(e)
  //   }
  invntryDetails: any = [];
  getInventoryDetails(expr) {
    //this.spinner.show();
    this.intStatus = false;
    const obj = {
      "dealerId": this._glbDealerId.toString(),
      "expression": expr,

    };
    this.invntryDetails = [];

    this.apiSrvc.postmethod('inventory/getdata', obj).subscribe((resp: any) => {

      if (resp.status == "200") {
        if (resp.response != null) {
          this.invntryDetails = resp.response.Inventory.InventoryData;

        }
        if (this.invntryDetails.length == 0){
          this.Result = 'No Records Found !!';
          this.visible='Y';
        }
        else{
          this.Result = '';
          this.visible='N'
        this.spinner.hide();
        }
      }
    })
  }


  onInvClose() {
    //  this.xInvtryClick.emit();
    localStorage.setItem('display','Y');

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


    this.getInventoryDetails(expr);
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
            //   this.ddlYear.setValue(this.loadByStockInfo['Year']);
            // this.ddlMake.setValue(this.loadByStockInfo['MakeId']);
            //this.ddlModel.setValue(this.loadByStockInfo['ModelId']);
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
              //   this.getInvtryDropDownInfo("MK",this.loadByStockInfo['Year'],0,0,"RCM");
              // this.ddlYear.setValue(this.loadByStockInfo['Year']);
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
              //  this.getInvtryDropDownInfo("MD",this.loadByStockInfo['Year'],this.loadByStockInfo['MakeId'],0,"RCM");
              // this.ddlMake.setValue(this.loadByStockInfo["MakeId"]);
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
              //   this.ddlModel.setValue(this.loadByStockInfo["ModelId"]);
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
    this.closeDialog();

  }
  closeDialog(): void {
    this.dialogRef.close();
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
        this.getInventoryDetails(expr);
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

  // loadByStock(){
  //   if(this.loadByStockInfo.length!=0)
  //     {

  //       this.getInvtryDropDownInfo("Y",this.ddlYear.value,0,0,"RCM");
  //       // this.ddlYear.setValue(this.loadByStockInfo['Year']);
  //       // this.ddlMake.setValue(this.loadByStockInfo['MakeId']);
  //       // this.ddlModel.setValue(this.loadByStockInfo['ModelId']);

  //     }
  //}

}
