import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ApiService } from '../../Core/_providers/api-service/api.service';
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from '../../Core/_providers/alert-service/alertify.service';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';

declare var $: any;

@Component({
  selector: 'app-dealersetup',
  templateUrl: './dealersetup.component.html',
  styleUrls: ['./dealersetup.component.scss']
})
export class DealersetupComponent implements OnInit {
  
  
  srchst: any = 's';
  tabType = 'sales';
  roleid: any;
  dlrid: any;
  grpid: any = 0;
  showusers = false;
  showDealerterms = false;
  dealerSetup = true;
  dshipForm: FormGroup;
  getstatesresp: any = [];
  Getdealership: any;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  uploadedFileName: any;
  public BrandNames: any = [];
  getBrandName: any = [];
  displayBrands: any;
  finalObjData: any = {
    dealername: '',
    dealeraddress1: '',
    dealeraddress2: '',
    dealeraddress3: '',
    dealercity: '',
    dealerstate: '',
    dealercountry: '',
    dealerzip: '',
    dealerphone: '',
    dealerwebsiteaddress: '',
    dealergooglemaplink: '',
    dealerregion: '',
    dealertimezone: '',
    dealerstatus: 'Y',
    dealerbrands: '',
    dealergroupid: '',
    dealercreateduser: 1001,
    dealerupdateduser: 1001,
    dealershipdetails: [],
  };
  bindImage = `${environment.apiUrl}` + '/resources/images/';
  EditedLogoFile: any;

  // Brands
  selectedBrands: any = [];
  showBrandDiv: boolean = false;
  typelist: any;
  selectedItem: any;
  showBrands: boolean = false;
  selectedBrandsList: any = [];
  showBrandAutofill: boolean;
  electedBrandLogo: any = [];
  selectedbrandid: any = [];
  OemBrands: any[];
  serachBrands: any = [];
  public Brands: any = [];
  selectedBrandLogo: any = [];
  brandforms: FormGroup;
  @ViewChild('brandmenu', { static: false }) brandmenu: ElementRef;
  ImagPath: any = `${environment.apiUrl}` + '/resources/images';
  brandspopup: Boolean = false;
  showImagepreview: Boolean = true;
  showHolidays: Boolean = true;


  dealersHoursTimings: any = [];
  GetDealershipsList: any = [];
  dealergroups: any = [];
  showdata: any = false;
  selectedDealer: any;
  holidaysList: any = [];
  StrHldyform: FormGroup;
  holidaysForm: FormGroup
  action: any = 'A';
  status: any;
  hoursrecordd: any;
  AddEdit: any = false;
  submitted = false;
  isLoading: any = false;
  showbuttondata: any = false;
  insertType: any = '';
  phoneFormat: any[] = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  alphaSrch: string = '';
  alphaColumns: any = ["Dh_holiday_name"];
  okCallback: () => any;
  cancelCallback: () => any

  constructor(private ApiService: ApiService, private SpinnerService: NgxSpinnerService,
    private formBuilder: FormBuilder, private alertify: AlertifyService,
    private activatedRoute: ActivatedRoute, private renderer: Renderer2,) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.brandmenu == undefined) {
        this.showBrandAutofill = false;
      } else this.showBrandAutofill = false;
    });
    this.getStoreHolidaysList();
    this.getGroups();

    this.getStatesData();


    this.dshipForm = this.formBuilder.group({
      dship: ['', [Validators.required, Validators.maxLength(100), Validators.pattern('[a-zA-Z0-9- ]*')]],
      address: ['', [Validators.required, Validators.maxLength(50)]],
      dcity: ['', [Validators.required, Validators.maxLength(50)]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(5)]],
      phone: ['', [Validators.required]],
      webaddress: ['', [Validators.required, Validators.maxLength(100)]],
      gmaplink: ['', [Validators.required, Validators.maxLength(1000)]],
      fileUpload: ['', [Validators.required]],
      avatar: [null],

    });
    this.brandforms = this.formBuilder.group({
      txtbrand: [''],
    });
  }

  get f() { return this.dshipForm.controls; }

  ngOnInit(): void {
    this.StrHldyform = this.formBuilder.group({
      id: [],
      toDte: ['', [Validators.required]],
      frmDte: ['', [Validators.required]],
      status: [],
      hldyName: ['', [Validators.required]]
    });
    this.holidaysForm = this.formBuilder.group({
      txtSearch: ''
    })

    this.dlrid = localStorage.getItem('DealerId');
    this.grpid = localStorage.getItem('dealerGroupId');
    this.roleid = localStorage.getItem('Role');

    this.getDealerships(this.grpid);

    if (this.dlrid != "" || this.dlrid != null || this.dlrid != 0) {
      this.getDealerId(this.dlrid);
    }

    console.log('localgid', this.grpid)
    console.log('localdid', this.dlrid)
  }


  // users() {
  //   this.showusers = true;
  //   this.showDealerterms = false;
  //   this.dealerSetup = false;
  // }
  // dealerterms() {
  //   this.showDealerterms = true;
  //   this.showusers = false;
  //   this.dealerSetup = false;
  // }
  storeS(typ) {
    this.srchst = typ;

    // this.dealerSetup = true;
    // this.showusers = false;
    // this.showDealerterms = false;
  }

  onSearch() {
    this.alphaSrch = this.holidaysForm.controls['txtSearch'].value;
  }

  DealerEditOnSubmit() {

    this.submitted = true;
    // if (this.dshipForm.invalid) {
    //   return;
    // }
    const fd: any = new FormData();
    this.finalObjData.action = 'U';
    this.finalObjData.dealername = this.dshipForm.value.dship;
    this.finalObjData.dealeraddress1 = this.dshipForm.value.address;
    this.finalObjData.dealeraddress2 = this.Getdealership.dealer_address2;
    this.finalObjData.dealeraddress3 = this.Getdealership.dealer_address3;
    this.finalObjData.dealercity = this.dshipForm.value.dcity;
    this.finalObjData.dealerstate = this.dshipForm.value.state;
    this.finalObjData.dealerzip = this.dshipForm.value.zip;
    this.finalObjData.dealerphone = this.dshipForm.value.phone;
    this.finalObjData.dealerwebsiteaddress = this.dshipForm.value.webaddress;
    this.finalObjData.dealercountry = this.Getdealership.dealer_country;
    this.finalObjData.dealergooglemaplink = this.dshipForm.value.gmaplink;
    this.finalObjData.dealerregion = this.Getdealership.dealer_region;
    this.finalObjData.dealertimezone = this.Getdealership.DEALER_TIMEZONE;
    this.finalObjData.dealershipdetails = [];
    this.finalObjData.dealerbrands = this.Getdealership.dealer_brands;
    this.finalObjData.dealergroupid = this.Getdealership.dealer_dg_id;
    this.finalObjData.dealerid = this.Getdealership.dealer_id;
    // this.finalObjData.dealerbrands = this.selectedbrandid;
    // this.finalObjData.dealergroupid = this.dealergrpid;
    if (this.uploadedFileName != '' && this.uploadedFileName != undefined) {
      console.log('file name', this.uploadedFileName);

      fd.append('file', this.fileData);
    } else {
      fd.append('file', this.EditedLogoFile);
    }




    fd.append('data', JSON.stringify(this.finalObjData));

    // // Display the key/value pairs
    // for (var pair of fd.entries()) {
    // console.log(pair[0]+ ', ' + pair[1]); 
    // }


    console.log('fd', fd);

    this.ApiService.putmethod('dealerships', fd).subscribe(resp => console.log("Resp :", resp));

    //Save Salers Hours
    // console.log("Final Object :",this.dealersHoursTimings);
    // console.log("Selected Obj :", this.selectedDealer);
    if (this.insertType == 'sa') {
      const finaObj = {
        // "action"  :   "S",
        "DID": this.selectedDealer,
        "Dw_Day0StartTime": this.getTruevalue(this.dealersHoursTimings[0].value),
        "Dw_Day0EndTime": this.getTruevalue(this.dealersHoursTimings[0].highValue),
        "Dw_0Off": this.getTruevalue(this.dealersHoursTimings[0].ds_off),
        "Dw_Day1StartTime": this.getTruevalue(this.dealersHoursTimings[1].value),
        "Dw_Day1EndTime": this.getTruevalue(this.dealersHoursTimings[1].highValue),
        "Dw_1Off": this.getTruevalue(this.dealersHoursTimings[1].ds_off),
        "Dw_Day2StartTime": this.getTruevalue(this.dealersHoursTimings[2].value),
        "Dw_Day2EndTime": this.getTruevalue(this.dealersHoursTimings[2].highValue),
        "Dw_2Off": this.getTruevalue(this.dealersHoursTimings[2].ds_off),
        "Dw_Day3StartTime": this.getTruevalue(this.dealersHoursTimings[3].value),
        "Dw_Day3EndTime": this.getTruevalue(this.dealersHoursTimings[3].highValue),
        "Dw_3Off": this.getTruevalue(this.dealersHoursTimings[3].ds_off),
        "Dw_Day4StartTime": this.getTruevalue(this.dealersHoursTimings[4].value),
        "Dw_Day4EndTime": this.getTruevalue(this.dealersHoursTimings[4].highValue),
        "Dw_4Off": this.getTruevalue(this.dealersHoursTimings[4].ds_off),
        "Dw_Day5StartTime": this.getTruevalue(this.dealersHoursTimings[5].value),
        "Dw_Day5EndTime": this.getTruevalue(this.dealersHoursTimings[5].highValue),
        "Dw_5Off": this.getTruevalue(this.dealersHoursTimings[5].ds_off),
        "Dw_Day6StartTime": this.getTruevalue(this.dealersHoursTimings[6].value),
        "Dw_Day6EndTime": this.getTruevalue(this.dealersHoursTimings[6].highValue),
        "Dw_6Off": this.getTruevalue(this.dealersHoursTimings[6].ds_off),
        "Dw_WorkWeek": "firstweek",
        "Dw_WorkWeekNo": "2",
        "Dw_Status": "Y"
      }

      console.log("OutUp :", finaObj);
      console.log('St id: ', this.selectedDealer);
      if (this.selectedDealer) {

        this.ApiService.postmethod('dealerhours', finaObj).subscribe(
          data => {
            console.log("Updated Response :", data);
            if (data['status'] == 200) {
              //  this.gettingDealersHours(this.selectedDealer);
              this.gettingSalesHours(this.tabType);
            }
          });
      }
    }
    else if (this.insertType == 's') {
      const finaObj = {
        // "action"  :   "S",
        "DID": this.selectedDealer,
        "Dws_Day0StartTime": this.getSTruevalue(this.dealersHoursTimings[0].value),
        "Dws_Day0EndTime": this.getSTruevalue(this.dealersHoursTimings[0].highValue),
        "Dws_0Off": this.getSTruevalue(this.dealersHoursTimings[0].ds_off),
        "Dws_Day1StartTime": this.getSTruevalue(this.dealersHoursTimings[1].value),
        "Dws_Day1EndTime": this.getSTruevalue(this.dealersHoursTimings[1].highValue),
        "Dws_1Off": this.getSTruevalue(this.dealersHoursTimings[1].ds_off),
        "Dws_Day2StartTime": this.getSTruevalue(this.dealersHoursTimings[2].value),
        "Dws_Day2EndTime": this.getSTruevalue(this.dealersHoursTimings[2].highValue),
        "Dws_2Off": this.getSTruevalue(this.dealersHoursTimings[2].ds_off),
        "Dws_Day3StartTime": this.getSTruevalue(this.dealersHoursTimings[3].value),
        "Dws_Day3EndTime": this.getSTruevalue(this.dealersHoursTimings[3].highValue),
        "Dws_3Off": this.getSTruevalue(this.dealersHoursTimings[3].ds_off),
        "Dws_Day4StartTime": this.getSTruevalue(this.dealersHoursTimings[4].value),
        "Dws_Day4EndTime": this.getSTruevalue(this.dealersHoursTimings[4].highValue),
        "Dws_4Off": this.getSTruevalue(this.dealersHoursTimings[4].ds_off),
        "Dws_Day5StartTime": this.getSTruevalue(this.dealersHoursTimings[5].value),
        "Dws_Day5EndTime": this.getSTruevalue(this.dealersHoursTimings[5].highValue),
        "Dws_5Off": this.getSTruevalue(this.dealersHoursTimings[5].ds_off),
        "Dws_Day6StartTime": this.getSTruevalue(this.dealersHoursTimings[6].value),
        "Dws_Day6EndTime": this.getSTruevalue(this.dealersHoursTimings[6].highValue),
        "Dws_6Off": this.getSTruevalue(this.dealersHoursTimings[6].ds_off),
        "Dws_WorkWeek": "firstweek",
        "Dws_WorkWeekNo": "2",
        "Dws_Status": "Y"
      }

      console.log("OutUp :", finaObj);
      if (this.selectedDealer) {

        this.ApiService.postmethod('dealerhours/adddealerservicehours', finaObj).subscribe(
          data => {
            console.log("Updated Response :", data);
            if (data['status'] == 200) {
              this.gettingServiceHours(this.tabType);
            }
          });
      }
    }
    else if (this.insertType == 'p') {
      const finaObj = {
        // "action"  :   "S",
        "DID": this.selectedDealer,
        "Dwp_Day0StartTime": this.getTruevalue(this.dealersHoursTimings[0].value),
        "Dwp_Day0EndTime": this.getTruevalue(this.dealersHoursTimings[0].highValue),
        "Dwp_0Off": this.getTruevalue(this.dealersHoursTimings[0].ds_off),
        "Dwp_Day1StartTime": this.getTruevalue(this.dealersHoursTimings[1].value),
        "Dwp_Day1EndTime": this.getTruevalue(this.dealersHoursTimings[1].highValue),
        "Dwp_1Off": this.getTruevalue(this.dealersHoursTimings[1].ds_off),
        "Dwp_Day2StartTime": this.getTruevalue(this.dealersHoursTimings[2].value),
        "Dwp_Day2EndTime": this.getTruevalue(this.dealersHoursTimings[2].highValue),
        "Dwp_2Off": this.getTruevalue(this.dealersHoursTimings[2].ds_off),
        "Dwp_Day3StartTime": this.getTruevalue(this.dealersHoursTimings[3].value),
        "Dwp_Day3EndTime": this.getTruevalue(this.dealersHoursTimings[3].highValue),
        "Dwp_3Off": this.getTruevalue(this.dealersHoursTimings[3].ds_off),
        "Dwp_Day4StartTime": this.getTruevalue(this.dealersHoursTimings[4].value),
        "Dwp_Day4EndTime": this.getTruevalue(this.dealersHoursTimings[4].highValue),
        "Dwp_4Off": this.getTruevalue(this.dealersHoursTimings[4].ds_off),
        "Dwp_Day5StartTime": this.getTruevalue(this.dealersHoursTimings[5].value),
        "Dwp_Day5EndTime": this.getTruevalue(this.dealersHoursTimings[5].highValue),
        "Dwp_5Off": this.getTruevalue(this.dealersHoursTimings[5].ds_off),
        "Dwp_Day6StartTime": this.getTruevalue(this.dealersHoursTimings[6].value),
        "Dwp_Day6EndTime": this.getTruevalue(this.dealersHoursTimings[6].highValue),
        "Dwp_6Off": this.getTruevalue(this.dealersHoursTimings[6].ds_off),
        "Dwp_WorkWeek": "firstweek",
        "Dwp_WorkWeekNo": "2",
        "Dwp_Status": "Y"
      }

      console.log("OutUp :", finaObj);
      if (this.selectedDealer) {

        this.ApiService.postmethod('dealerhours/adddealerpartshours', finaObj).subscribe(
          data => {
            console.log("Updated Response :", data);
            if (data['status'] == 200) {
              this.gettingPartsHours(this.tabType);
            }
          });
      }
    }




  }

  public fileProgress(fileInput: any): void {
    this.fileData = <File>fileInput.target.files[0];
    this.uploadedFileName = <File>fileInput.target.files[0].name;
    console.log('file upload', this.uploadedFileName);

    const file = (fileInput.target as HTMLInputElement).files[0];
    this.dshipForm.patchValue({
      avatar: file
    });

    this.dshipForm.get('avatar').updateValueAndValidity();

    this.preview();
  }

  public preview(): void {
    // Show preview
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    };
  }

  EditDealerShip(dsid, gruoupid) {

    const obj =
    {
      "dealerid": dsid,
      "expression": "dealer_dg_id =" + gruoupid,

    };
    this.ApiService.postmethod('dealerships/get', obj).subscribe((response: any) => {
      console.log('EditDealerShip', response);

      if (response.status == 200) {
        this.Getdealership = JSON.parse(response.response[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']);
        this.Getdealership = this.Getdealership[0];
        console.log('manoj', this.Getdealership);


        if (this.Getdealership != '') {

          this.previewUrl = this.bindImage + this.Getdealership.dealer_logo;
          this.EditedLogoFile = this.Getdealership.dealer_logo;

          this.dshipForm = this.formBuilder.group({
            dship: [this.Getdealership.dealer_name, [Validators.required, Validators.maxLength(1000), Validators.pattern('[a-zA-Z0-9- ]*')]],
            address: [this.Getdealership.dealer_address1, [Validators.required, Validators.maxLength(1000)]],
            dcity: [this.Getdealership.dealer_city, [Validators.required, Validators.maxLength(50)]],
            state: [this.Getdealership.dealer_state, [Validators.required]],
            zip: [this.Getdealership.dealer_zip, [Validators.required, Validators.maxLength(5)]],
            phone: [this.Getdealership.dealer_phone, [Validators.required]],
            webaddress: [this.Getdealership.dealer_websiteaddress, [Validators.required]],
            gmaplink: [this.Getdealership.dealer_googlemaplink, [Validators.required]],
            fileUpload: [this.Getdealership.dealer_logo, [Validators.required]],
            avatar: [null]
          });
        }


      }
    });
  }

  getBrandsList() {
    const obj = {
      "brand_id": "0"
    }
    this.ApiService.postmethod('brands/get', obj).subscribe(res => {
      console.log(res);
      if (res.status == 200) {
        this.BrandNames = res.response;
        console.log(this.BrandNames);
        this.getBrandName = this.BrandNames.filter(item => item.brand_chrome_id == this.Getdealership.dealer_brands);
        this.displayBrands = this.getBrandName[0].brand_name;
      }
    });
  }


  highlightRow(option) {
    this.selectedItem = option.OEM_Name;
  }

  OnChange(e) {
    this.selectedBrands = this.find(e.target.value.toLowerCase());
    this.showBrandAutofill = true;
  }
  find(val: string): string[] {
    return this.OemBrands.filter(
      (option) =>
        option.brand_name.toLowerCase().indexOf(val.toLowerCase()) === 0
    );
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
      this.selectedBrandLogo.push(item.brand_name);
      console.log("brandlogo", this.selectedBrandLogo);

      this.selectedBrandsList.push({
        brand_id: item.brand_chrome_id,
        brand_name: item.brand_name,
        brand_logo: item.brand_logo,
      });
      this.brandforms.controls['txtbrand'].setValue('');
    }
  }
  removeBrandTag(item, index, id) {
    this.OemBrands.push({ brand_chrome_id: id, brand_name: item });

    this.selectedBrandsList.splice(index, 1);
    this.selectedbrandid.splice(index, 1);
    this.selectedBrandLogo.splice(index, 1);
  }

  highlightRows(option) {
    this.selectedItem = option.brand_name;
  }

  closeModel() {
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
    this.showBrands = false;
    // this.brandspopup = false;
  }

  closeImagepreview() {
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
    this.showImagepreview = false;
  }

  openImgModal(){
    this.showImagepreview = true;
  }

  addBrand() {
    this.showBrands = true;
  }

  allBrandsList() {
    this.OemBrands = [];
    const obj = { brand_id: 0 };
    this.ApiService.postmethod('oembrands/get', obj).subscribe(
      (response: any) => {
        if (response.message == 'success') {
          this.OemBrands = response.response;
          this.serachBrands = response.response;
          if (this.selectedbrandid != '') {
            if (this.selectedbrandid.length > 0) {
              for (let i = 0; i < this.selectedbrandid.length; i++) {
                this.OemBrands = this.OemBrands.filter(
                  (item) => item.brand_chrome_id != this.selectedbrandid[i]
                );
              }
            }
          }
        }
      }
    );
  }



  getStatesData() {
    const obj = { sg_id: 0 }
    this.ApiService.postmethod('States/get', obj).subscribe((res: any) => {
      this.getstatesresp = res.response;
      console.log('Getstates', this.getstatesresp);
    });
  }

  allowNumbers(event: any) {
    const pattern = /[0-9+( )-]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  //Check box change
  checkBoxChange(obj, evnt, ind) {
 
    if (evnt.target.checked) {
      console.log("True Checked..!");
      if (confirm("Are you sure you want to select one more working day for a week!")) {
        var el = document.getElementById('ngsslide'+ind);
        console.log("dom value :", el);

        this.dealersHoursTimings[ind].options = Object.assign({}, this.dealersHoursTimings[ind].options, {disabled: false});
        this.dealersHoursTimings[ind].ds_off = 'N';
        console.log("Obj ..", this.dealersHoursTimings[ind]);
      }     
    }else if(!evnt.target.checked){  
      console.log("False Checked..!");
      if (confirm("Are you sure you want to select a off for a week..!")) {

        this.dealersHoursTimings[ind].options = Object.assign({}, this.dealersHoursTimings[ind].options, {disabled: true});
        this.dealersHoursTimings[ind].ds_off = 'Y';      
        console.log("Obj ..", this.dealersHoursTimings[ind]);
      }                
    }
    // else {
    //   this.cancelCallback()
      
    // }

    console.log('Main obj', this.dealersHoursTimings);
  }

  changeVal(val1, val2) {
    console.log("val 1", val1);
    console.log("val 2", val2);
    console.log("Main Obj", this.dealersHoursTimings);
  }


  getGroups() {
    const obj = { "dealergroupid": 0, "expression": "dg_status = 'Y'" }
    this.ApiService.postmethod('dealershipgroups/get', obj).subscribe((resp: any) => {
      if (resp.status = 200) {
        if (resp.response[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B'] != "") {
          this.dealergroups = JSON.parse(resp.response[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']);
        }
      }
    });

  }

  changeGroup(grpid) {
    this.SpinnerService.show();
    this.showdata = false;
    this.getDealerships(grpid);
  }

  getDealerships(grpid) {
    const bd = {
      //"dealerid":0
      "dealerid": 0,
      "expression": "dealer_dg_id =" + this.grpid
    };
    this.ApiService.postmethod('dealerships/get', bd).subscribe((data: any) => {
      console.log("Dealser Ship List :", data);
      if (data.status == 200) {
        this.GetDealershipsList = JSON.parse(data.response[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']);
        console.log("Dealer Data :", this.GetDealershipsList);

        if (this.dlrid == "" || this.dlrid == null || this.dlrid == 0) {
          this.dlrid = this.GetDealershipsList[0].dealer_id;
          this.getDealerId(this.dlrid);
        }

        this.SpinnerService.hide();
      } else {
        this.SpinnerService.hide();
      }
    });
  }

  getDealerId(did) {
    console.log('Selected Dealer Id :', did);
    //  this.SpinnerService.show(); 
    this.isLoading = true;
    this.selectedDealer = did;
    this.showbuttondata = true;
    this.showdata = true;
    this.EditDealerShip(did, this.grpid);
    this.getBrandsList();
    this.allBrandsList();
    //  this.gettingDealersHours(did);
    this.gettingSalesHours(this.tabType);
  }

  // Brands 
  OnChangeEvent(e) {
    this.selectedBrands = this.filter(e.target.value.toLowerCase());
    this.showBrandDiv = true;
    // let brlist=this.Brands;

  }

  filter(val: string): string[] {
    return this.Brands.filter(option =>
      option.brand_name.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }


  //Getting Dealers Hours List
  gettingSalesHours(typ) {
    this.tabType = typ;
    this.insertType = 'sa';
    this.isLoading = true;
    const obj = {
      "id": "0",
      "expression": "ds_dealerid='" + this.selectedDealer + "'"
    }

    this.dealersHoursTimings = [];
    this.ApiService.postmethod('dealerhours/get', obj).subscribe(
      data => {
        if (data['status'] == 200) {
          console.log("Dealers Hours :", data);

          const respDt = data['response'][0];

          if (data['response'][0]) {
            console.log("Has Data...!");
            this.dealersHoursTimings = [
              {
                week: 'Monday',
                ds_off: respDt.DS_MONOFF,
                value: this.convertTimeFormat(respDt.DS_MONSTARTTIME),
                highValue: this.convertTimeFormat(respDt.DS_MONENDTIME),
                options: {
                  floor: 4,
                  ceil: 22,
                  disabled : (respDt.DS_MONOFF == 'Y' ? true : false),
                  translate: (value: number): string => {
                    return this.getTruevalue(value);
                  }
                }
              },
              {
                week: 'Tuesday',
                ds_off: respDt.DS_TUEOFF,
                value: this.convertTimeFormat(respDt.DS_TUESTARTTIME),
                highValue: this.convertTimeFormat(respDt.DS_TUEENDTIME),
                options: {
                  floor: 4,
                  ceil: 22,
                  disabled : (respDt.DS_TUEOFF == 'Y' ? true : false),
                  translate: (value: number): string => {
                    return this.getTruevalue(value);
                  }
                }
              },
              {
                week: 'Wednesday',
                ds_off: respDt.DS_WEDOFF,
                value: this.convertTimeFormat(respDt.DS_WEDSTARTTIME),
                highValue: this.convertTimeFormat(respDt.DS_WEDENDTIME),
                options: {
                  floor: 4,
                  ceil: 22,
                  disabled : (respDt.DS_WEDOFF == 'Y' ? true : false),
                  translate: (value: number): string => {
                    return this.getTruevalue(value);
                  }
                }
              },
              {
                week: 'Thursday',
                ds_off: respDt.DS_THUOFF,
                value: this.convertTimeFormat(respDt.DS_THUSTARTTIME),
                highValue: this.convertTimeFormat(respDt.DS_THUENDTIME),
                options: {
                  floor: 4,
                  ceil: 22,
                  disabled : (respDt.DS_THUOFF == 'Y' ? true : false),
                  translate: (value: number): string => {
                    return this.getTruevalue(value);
                  }
                }
              },
              {
                week: 'Friday',
                ds_off: respDt.DS_FRIOFF,
                value: this.convertTimeFormat(respDt.DS_FRISTARTTIME),
                highValue: this.convertTimeFormat(respDt.DS_FRIENDTIME),
                options: {
                  floor: 4,
                  ceil: 22,
                  disabled : (respDt.DS_FRIOFF == 'Y' ? true : false),
                  translate: (value: number): string => {
                    return this.getTruevalue(value);
                  }
                }
              },
              {
                week: 'Saturday',
                ds_off: respDt.DS_SATOFF,
                value: this.convertTimeFormat(respDt.DS_SATSTARTTIME),
                highValue: this.convertTimeFormat(respDt.DS_SATENDTIME),
                options: {
                  floor: 4,
                  ceil: 22,
                  disabled : (respDt.DS_SATOFF == 'Y' ? true : false),
                  translate: (value: number): string => {
                    return this.getTruevalue(value);
                  }
                }
              },
              {
                week: 'Sunday',
                ds_off: respDt.DS_SUNOFF,
                value: this.convertTimeFormat(respDt.DS_SUNSTARTTIME),
                highValue: this.convertTimeFormat(respDt.DS_SUNENDTIME),
                options: {
                  floor: 4,
                  ceil: 22,
                  disabled : (respDt.DS_SUNOFF == 'Y' ? true : false),
                  translate: (value: number): string => {
                    return this.getTruevalue(value);
                  }
                }
              }

            ]
          } else {
            console.log("No Data...!");
            this.dealersHoursTimings = [
              {
                week: 'Monday',
                ds_off: 'N',
                value: 8,
                highValue: 22,
                options: {
                  floor: 4,
                  ceil: 22,

                  translate: (value: number): string => {
                    return this.getTruevalue(value);
                  }
                }
              },
              {
                week: 'Tuesday',
                ds_off: 'N',
                value: 8,
                highValue: 22,
                options: {
                  floor: 4,
                  ceil: 22,

                  translate: (value: number): string => {
                    return this.getTruevalue(value);
                  }
                }
              },
              {
                week: 'Wednesday',
                ds_off: 'N',
                value: 8,
                highValue: 22,
                options: {
                  floor: 4,
                  ceil: 22,

                  translate: (value: number): string => {
                    return this.getTruevalue(value);
                  }
                }
              },
              {
                week: 'Thursday',
                ds_off: 'N',
                value: 8,
                highValue: 22,
                options: {
                  floor: 4,
                  ceil: 22,

                  translate: (value: number): string => {
                    return this.getTruevalue(value);
                  }
                }
              },
              {
                week: 'Friday',
                ds_off: 'N',
                value: 8,
                highValue: 22,
                options: {
                  floor: 4,
                  ceil: 22,

                  translate: (value: number): string => {
                    return this.getTruevalue(value);
                  }
                }
              },
              {
                week: 'Saturday',
                ds_off: 'Y',
                value: 8,
                highValue: 22,
                options: {
                  floor: 4,
                  ceil: 22,

                  translate: (value: number): string => {
                    return this.getTruevalue(value);
                  }
                }
              },
              {
                week: 'Sunday',
                ds_off: 'Y',
                value: 8,
                highValue: 22,
                options: {
                  floor: 4,
                  ceil: 22,

                  translate: (value: number): string => {
                    return this.getTruevalue(value);
                  }
                }
              }

            ]
          }
        }

        console.log("my obj ", this.dealersHoursTimings);
        this.isLoading = false;
        this.showdata = true;
        this.SpinnerService.hide();
      });

  }

  //Convert 24hrs time to 12hrs time
  getTruevalue(val) {
    if (val < 12) {
      return val + ':00 AM';
    } else if (val >= 12) {
      var vals = ((val + 11) % 12 + 1);
      return vals + ':00 PM';
    } else {
      return val;
    }

  }

  //Convert 12hrs time to 24hrs time 
  convertTimeFormat(tm) {
    if (tm != null) {
      var time = tm;
      var hrs = Number(time.match(/^(\d+)/)[1]);
      var mnts = Number(time.match(/:(\d+)/)[1]);
      var format = time.match(/\s(.*)$/)[1];
      if (format == "PM" && hrs < 12) hrs = hrs + 12;
      if (format == "AM" && hrs == 12) hrs = hrs - 12;
      var hours = hrs.toString();
      var minutes = mnts.toString();
      if (hrs < 10) hours = "0" + hours;
      if (mnts < 10) minutes = "0" + minutes;
      return hours;
    } else {
      return 0;
    }
  }

  //Convert Date formate
  dtConv(dt) {
    var date = new Date(dt);
    return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
  }


  dtConv2(dt) {
    var date = new Date(dt);
    return date.getFullYear() + '-' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate()));
  }

  checkstatus(evt) {
    let target = evt.target;
    if (target.checked) {
      this.status = "Y";
    } else {
      this.status = "N";
    }
  }

  //Store Holidays grid
  getStoreHolidaysList() {
    const objholiday = {
      "Dh_id": "0",
      "expression": ""
    }

    this.ApiService.postmethod('dealerholidays/get', objholiday).subscribe(
      data => {
        console.log("Holidays List :", data);
        if (data['status'] == 200) {
          this.holidaysList = data['response'];
          console.log('holidays', this.holidaysList);
          this.SpinnerService.hide();
        } else {
          this.SpinnerService.hide();
        }
      });
  }

  addHoliday() {
    this.action = 'A';
    this.AddEdit = true;
    this.StrHldyform.get("hldyName").setValue('');
    this.StrHldyform.get("frmDte").setValue('');
    this.StrHldyform.get("toDte").setValue('');
    this.StrHldyform.get("status").setValue('');
    //this.StrHldyform.get('hldyName').clearValidators();
    //this.StrHldyform.get('frmDte').clearValidators();
    //this.StrHldyform.get('toDte').clearValidators();
    //this.StrHldyform.get('status').clearValidators();
  }

  ShowUpdatePanel(obj) {
    this.action = 'U';
    this.AddEdit = true;
    this.showHolidays = true;
    this.hoursrecordd = obj;
    console.log("update record", obj);
    this.StrHldyform.get("hldyName").setValue(obj.Dh_holiday_name);
    this.StrHldyform.get("frmDte").setValue(this.dtConv2(obj.Dh_start_date));
    this.StrHldyform.get("toDte").setValue(this.dtConv2(obj.Dh_end_date));
    this.StrHldyform.get("status").setValue(obj.Dh_status);
    this.status = obj.Dh_status;

  }

  Save(typ) {

    // let CreatedUserId = localStorage.getItem("uId");
    let CreatedUserId = "2009";
    this.submitted = true;
    console.log(this.StrHldyform);
    if (this.StrHldyform.invalid) {
      console.log("invalid");
      return;
    }
    const formValue = this.StrHldyform.value;
    console.log('formValue', formValue);
    let holidaydata;
    if (this.action == 'A') {

      holidaydata = {
        //  "action":this.action,      
        "Dh_Dealer_id": "qwerty",
        "Dh_holiday_name": formValue.hldyName,
        "Dh_start_date": formValue.frmDte,
        "Dh_end_date": formValue.toDte,
        "Dh_CreatedUserId": CreatedUserId
      }
      this.ApiService.postmethod('dealerholidays', holidaydata).subscribe((data: any) => {
        console.log(data);
        if (data.message == "success") {
          this.showdata = true;
          this.AddEdit = false;
          this.getStoreHolidaysList();
          $(".modal-backdrop").remove();
          this.alertify.success(data.response);
        }
      },
        (error) => {
          console.log(error);
        });

    } else if (this.action == 'U') {
      holidaydata = {
        // "action":this.action,      
        "Dh_Dealer_id": "qwerty",
        "Dh_holiday_name": formValue.hldyName,
        "Dh_start_date": formValue.frmDte,
        "Dh_end_date": formValue.toDte,
        "Dh_CreatedUserId": CreatedUserId,
        "Dh_id": this.hoursrecordd.Dh_id,
        "Dh_status": this.status,
      }
      this.ApiService.putmethod('dealerholidays', holidaydata).subscribe((data: any) => {
        console.log(data);
        if (data.message == "success") {          
          this.showdata = true;
          this.AddEdit = false;
          this.getStoreHolidaysList();
          $(".modal-backdrop").remove();
          this.alertify.success('Dealer Holidays Updated Successfully');
          this.showHolidays = false;
          // this.alertify.success(data.response);
        }
      },
        (error) => {
          console.log(error);
        });

    }
  }


  ClosePopup() {
    this.submitted = false;
    this.StrHldyform.reset();
    $(".modal-backdrop").remove();
  }

  gettingServiceHours(typ) {
    this.tabType = typ;
    this.insertType = 's';
    this.isLoading = true;
    const obj = {
      "id": "0",
      "expression": "dsh_dealerid='" + this.selectedDealer + "'"
    }

    this.dealersHoursTimings = [];
    this.ApiService.postmethod('dealerhours/dealerservicehours', obj).subscribe(
      data => {
        if (data['status'] == 200) {
          console.log("Dealers Service Hours :", data);

          const respsDt = data['response'][0];

          if (data['response'][0]) {
            console.log("Has Data...!");
            this.dealersHoursTimings = [
              {
                week: 'Monday',
                ds_off: respsDt.DSH_MONOFF,
                value: this.convertTimeFormat(respsDt.DSH_MONSTARTTIME),
                highValue: this.convertTimeFormat(respsDt.DSH_MONENDTIME),
                options: {
                  floor: 4,
                  ceil: 18,

                  translate: (value: number): string => {
                    return this.getSTruevalue(value);
                  }
                }
              },
              {
                week: 'Tuesday',
                ds_off: respsDt.DSH_TUEOFF,
                value: this.convertTimeFormat(respsDt.DSH_TUESTARTTIME),
                highValue: this.convertTimeFormat(respsDt.DSH_TUEENDTIME),
                options: {
                  floor: 4,
                  ceil: 18,

                  translate: (value: number): string => {
                    return this.getSTruevalue(value);
                  }
                }
              },
              {
                week: 'Wednesday',
                ds_off: respsDt.DSH_WEDOFF,
                value: this.convertTimeFormat(respsDt.DSH_WEDSTARTTIME),
                highValue: this.convertTimeFormat(respsDt.DSH_WEDENDTIME),
                options: {
                  floor: 4,
                  ceil: 18,

                  translate: (value: number): string => {
                    return this.getSTruevalue(value);
                  }
                }
              },
              {
                week: 'Thursday',
                ds_off: respsDt.DSH_THUOFF,
                value: this.convertTimeFormat(respsDt.DSH_THUSTARTTIME),
                highValue: this.convertTimeFormat(respsDt.DSH_THUENDTIME),
                options: {
                  floor: 4,
                  ceil: 18,

                  translate: (value: number): string => {
                    return this.getSTruevalue(value);
                  }
                }
              },
              {
                week: 'Friday',
                ds_off: respsDt.DSH_FRIOFF,
                value: this.convertTimeFormat(respsDt.DSH_FRISTARTTIME),
                highValue: this.convertTimeFormat(respsDt.DSH_FRIENDTIME),
                options: {
                  floor: 4,
                  ceil: 18,

                  translate: (value: number): string => {
                    return this.getSTruevalue(value);
                  }
                }
              },
              {
                week: 'Saturday',
                ds_off: respsDt.DSH_SATOFF,
                value: this.convertTimeFormat(respsDt.DSH_SATSTARTTIME),
                highValue: this.convertTimeFormat(respsDt.DSH_SATENDTIME),
                options: {
                  floor: 6,
                  ceil: 16,

                  translate: (value: number): string => {
                    return this.getTruevalue(value);
                  }
                }
              },
              {
                week: 'Sunday',
                ds_off: respsDt.DSH_SUNOFF,
                value: this.convertTimeFormat(respsDt.DSH_SUNSTARTTIME),
                highValue: this.convertTimeFormat(respsDt.DSH_SUNENDTIME),
                options: {
                  floor: 6,
                  ceil: 16,

                  translate: (value: number): string => {
                    return this.getTruevalue(value);
                  }
                }
              }

            ]
          } else {
            console.log("No Data...!");
            this.dealersHoursTimings = [
              {
                week: 'Monday',
                ds_off: 'N',
                value: 7,
                highValue: 22,
                options: {
                  floor: 4,
                  ceil: 18,

                  translate: (value: number): string => {
                    return this.getSTruevalue(value);
                  }
                }
              },
              {
                week: 'Tuesday',
                ds_off: 'N',
                value: 7,
                highValue: 22,
                options: {
                  floor: 4,
                  ceil: 18,

                  translate: (value: number): string => {
                    return this.getSTruevalue(value);
                  }
                }
              },
              {
                week: 'Wednesday',
                ds_off: 'N',
                value: 7,
                highValue: 22,
                options: {
                  floor: 4,
                  ceil: 18,

                  translate: (value: number): string => {
                    return this.getSTruevalue(value);
                  }
                }
              },
              {
                week: 'Thursday',
                ds_off: 'N',
                value: 7,
                highValue: 22,
                options: {
                  floor: 4,
                  ceil: 18,

                  translate: (value: number): string => {
                    return this.getSTruevalue(value);
                  }
                }
              },
              {
                week: 'Friday',
                ds_off: 'N',
                value: 7,
                highValue: 22,
                options: {
                  floor: 4,
                  ceil: 18,

                  translate: (value: number): string => {
                    return this.getSTruevalue(value);
                  }
                }
              },
              {
                week: 'Saturday',
                ds_off: 'Y',
                value: 8,
                highValue: 22,
                options: {
                  floor: 6,
                  ceil: 16,

                  translate: (value: number): string => {
                    return this.getTruevalue(value);
                  }
                }
              },
              {
                week: 'Sunday',
                ds_off: 'Y',
                value: 8,
                highValue: 22,
                options: {
                  floor: 6,
                  ceil: 16,

                  translate: (value: number): string => {
                    return this.getSTruevalue(value);
                  }
                }
              }

            ]
          }
        }

        console.log("my obj ", this.dealersHoursTimings);
        this.isLoading = false;
        this.showdata = true;
        this.SpinnerService.hide();
      });

  }

  //Convert 24hrs time to 12hrs time
  getSTruevalue(val) {
    if (val < 12) {
      return val + ':30 AM';
    } else if (val >= 12) {
      var vals = ((val + 11) % 12 + 1);
      return vals + ':00 PM';
    } else {
      return val;
    }
  }

  // //Convert 12hrs time to 24hrs time 
  // convertSTimeFormat(tm){
  //   if(tm != null){      
  //   var time = tm;
  //   var hrs = Number(time.match(/^(\d+)/)[1]);
  //   var mnts = Number(time.match(/:(\d+)/)[1]);
  //   var format = time.match(/\s(.*)$/)[1];
  //   if (format == "PM" && hrs < 12) hrs = hrs + 12;
  //   if (format == "AM" && hrs == 12) hrs = hrs - 12;
  //   var hours = hrs.toString();
  //   var minutes = mnts.toString();
  //   if (hrs < 10) hours = "0" + hours;
  //   if (mnts < 10) minutes = "0" + minutes;
  //    return hours;
  //   }else{
  //     return 0;
  //   }
  // }

  gettingPartsHours(typ) {
    this.tabType = typ;
    this.insertType = 'p';
    this.isLoading = true;
    const obj = {
      "id": "0",
      "expression": "dp_dealerid='" + this.selectedDealer + "'"
    }

    this.dealersHoursTimings = [];
    this.ApiService.postmethod('dealerhours/dealerpartshours', obj).subscribe(
      data => {
        if (data['status'] == 200) {
          console.log("Dealers Parts Hours :", data);

          const respspDt = data['response'][0];

          if (data['response'][0]) {
            console.log("Has Data...!");
            this.dealersHoursTimings = [
              {
                week: 'Monday',
                ds_off: respspDt.DP_MONOFF,
                value: this.convertTimeFormat(respspDt.DP_MONSTARTTIME),
                highValue: this.convertTimeFormat(respspDt.DP_MONENDTIME),
                options: {
                  floor: 5,
                  ceil: 18,
                  disabled : (respspDt.DP_MONOFF == 'Y' ? true : false),

                  translate: (value: number): string => {
                    return this.getTruevalue(value);
                  }
                }
              },
              {
                week: 'Tuesday',
                ds_off: respspDt.DP_TUEOFF,
                value: this.convertTimeFormat(respspDt.DP_TUESTARTTIME),
                highValue: this.convertTimeFormat(respspDt.DP_TUEENDTIME),
                options: {
                  floor: 5,
                  ceil: 18,
                  disabled : (respspDt.DP_TUEOFF == 'Y' ? true : false),

                  translate: (value: number): string => {
                    return this.getTruevalue(value);
                  }
                }
              },
              {
                week: 'Wednesday',
                ds_off: respspDt.DP_WEDOFF,
                value: this.convertTimeFormat(respspDt.DP_WEDSTARTTIME),
                highValue: this.convertTimeFormat(respspDt.DP_WEDENDTIME),
                options: {
                  floor: 5,
                  ceil: 18,
                  disabled : (respspDt.DP_WEDOFF == 'Y' ? true : false),

                  translate: (value: number): string => {
                    return this.getTruevalue(value);
                  }
                }
              },
              {
                week: 'Thursday',
                ds_off: respspDt.DP_THUOFF,
                value: this.convertTimeFormat(respspDt.DP_THUSTARTTIME),
                highValue: this.convertTimeFormat(respspDt.DP_THUENDTIME),
                options: {
                  floor: 5,
                  ceil: 18,
                  disabled : (respspDt.DP_THUOFF == 'Y' ? true : false),


                  translate: (value: number): string => {
                    return this.getTruevalue(value);
                  }
                }
              },
              {
                week: 'Friday',
                ds_off: respspDt.DP_FRIOFF,
                value: this.convertTimeFormat(respspDt.DP_FRISTARTTIME),
                highValue: this.convertTimeFormat(respspDt.DP_FRIENDTIME),
                options: {
                  floor: 5,
                  ceil: 18,
                  disabled : (respspDt.DP_FRIOFF == 'Y' ? true : false),

                  translate: (value: number): string => {
                    return this.getTruevalue(value);
                  }
                }
              },
              {
                week: 'Saturday',
                ds_off: respspDt.DP_SATOFF,
                value: this.convertTimeFormat(respspDt.DP_SATSTARTTIME),
                highValue: this.convertTimeFormat(respspDt.DP_SATENDTIME),
                options: {
                  floor: 6,
                  ceil: 16,
                  disabled : (respspDt.DP_SATOFF == 'Y' ? true : false),

                  translate: (value: number): string => {
                    return this.getTruevalue(value);
                  }
                }
              },
              {
                week: 'Sunday',
                ds_off: respspDt.DP_SUNOFF,
                value: this.convertTimeFormat(respspDt.DP_SUNSTARTTIME),
                highValue: this.convertTimeFormat(respspDt.DP_SUNENDTIME),
                options: {
                  floor: 6,
                  ceil: 16,
                  disabled : (respspDt.DP_SUNOFF == 'Y' ? true : false),

                  translate: (value: number): string => {
                    return this.getTruevalue(value);
                  }
                }
              }

            ]
          } else {
            console.log("No Data...!");
            this.dealersHoursTimings = [
              {
                week: 'Monday',
                ds_off: 'N',
                value: 8,
                highValue: 22,
                options: {
                  floor: 5,
                  ceil: 18,

                  translate: (value: number): string => {
                    return this.getTruevalue(value);
                  }
                }
              },
              {
                week: 'Tuesday',
                ds_off: 'N',
                value: 8,
                highValue: 22,
                options: {
                  floor: 5,
                  ceil: 18,

                  translate: (value: number): string => {
                    return this.getTruevalue(value);
                  }
                }
              },
              {
                week: 'Wednesday',
                ds_off: 'N',
                value: 8,
                highValue: 22,
                options: {
                  floor: 5,
                  ceil: 18,

                  translate: (value: number): string => {
                    return this.getTruevalue(value);
                  }
                }
              },
              {
                week: 'Thursday',
                ds_off: 'N',
                value: 8,
                highValue: 22,
                options: {
                  floor: 5,
                  ceil: 18,

                  translate: (value: number): string => {
                    return this.getTruevalue(value);
                  }
                }
              },
              {
                week: 'Friday',
                ds_off: 'N',
                value: 8,
                highValue: 22,
                options: {
                  floor: 5,
                  ceil: 18,

                  translate: (value: number): string => {
                    return this.getTruevalue(value);
                  }
                }
              },
              {
                week: 'Saturday',
                ds_off: 'Y',
                value: 8,
                highValue: 22,
                options: {
                  floor: 6,
                  ceil: 16,

                  translate: (value: number): string => {
                    return this.getTruevalue(value);
                  }
                }
              },
              {
                week: 'Sunday',
                ds_off: 'Y',
                value: 8,
                highValue: 22,
                options: {
                  floor: 6,
                  ceil: 16,

                  translate: (value: number): string => {
                    return this.getTruevalue(value);
                  }
                }
              }

            ]
          }
        }

        console.log("my obj ", this.dealersHoursTimings);
        this.isLoading = false;
        this.showdata = true;
        this.SpinnerService.hide();
      });

  }


}
