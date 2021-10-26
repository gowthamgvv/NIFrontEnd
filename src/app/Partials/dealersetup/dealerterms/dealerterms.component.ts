import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, } from '@angular/forms';
import { ApiService } from "../../../Core/_providers/api-service/api.service";
import { AlertifyService } from '../../../Core/_providers/alert-service/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dealerterms',
  templateUrl: './dealerterms.component.html',
  styleUrls: ['./dealerterms.component.scss']
})
export class DealertermsComponent implements OnInit {

  dealerTerms: any = [];
  termGroupForm: FormGroup;
  submitted: boolean = false;
  TermFinalArray: any[];
  termsOptions: any = [];
  dealerTermsDetails: any = [];
  showGrid: boolean = false;
  showPanel: boolean = false;
  savedBrandTerms: any = [];

  constructor(private ApiService: ApiService, private formBuilder: FormBuilder, private alertify: AlertifyService, private router: Router) {
    this.termGroupForm = this.formBuilder.group({
      yesORnoValues: new FormArray([]),
      textArray: new FormArray([]),
      optionArray: new FormArray([])
    });
  }

  ngOnInit(): void {
    this.showPanel = true;
    this.getSavedDealerBrandTerms();
  }
  get yesORnoValues(): FormArray {
    return this.termGroupForm.get('yesORnoValues') as FormArray;
  }

  get textArray(): FormArray {
    return this.termGroupForm.get('textArray') as FormArray;
  }

  get optionArray(): FormArray {
    return this.termGroupForm.get('optionArray') as FormArray;
  }

  addYESORNOValues(id, termName, value) {
    this.yesORnoValues.push(
      this.newYNQuantity(id, termName, value));
  }
  newYNQuantity(id, termName, value): FormGroup {
    return this.formBuilder.group({
      identity: '',
      TermName: termName,
      idx: new FormControl(''),
      termid: [id],
      checkedValue: [value]
    });
  }

  editYESORNOValues(id, termid, termName, value, userName, createdDate, NextDate) {
    this.yesORnoValues.push(
      this.newEditYNQuantity(id, termid, termName, value, userName, createdDate, NextDate));

  }
  newEditYNQuantity(id, termid, termName, value, userName, createdDate, NextDate): FormGroup {
    return this.formBuilder.group({
      identity: id,
      TermName: termName,
      idx: id,
      termid: [termid],
      checkedValue: value,
      UserName: userName,
      CreatedDate: createdDate,
      NextUpdatedDate: NextDate
    });
  }

  addTextValues(id, termName, value) {
    this.textArray.push(
      this.newTextQuantity(id, termName, value));
  }
  newTextQuantity(id, termName, value): FormGroup {
    return this.formBuilder.group({
      identity: '',
      TermName: termName,
      i: new FormControl(''),
      termid: [id]
    });
  }

  editTextValues(id, termid, termName, value, userName, createdDate, NextDate) {
    this.textArray.push(
      this.newEditTextQuantity(id, termid, termName, value, userName, createdDate, NextDate));
  }
  newEditTextQuantity(id, termid, termName, value, userName, createdDate, NextDate): FormGroup {
    return this.formBuilder.group({
      identity: id,
      TermName: termName,
      i: [value],
      termid: [termid],
      UserName: userName,
      CreatedDate: createdDate,
      NextUpdatedDate: NextDate
    });
  }

  BrandId = localStorage.getItem('BrandId');
  DealerId = localStorage.getItem('DealerId');
  dealeruserid = localStorage.getItem('dealeruserid');
  getSavedDealerBrandTerms() {
    this.getEditDealerBrandTerms();
    this.dealerTerms = [];
    //let dealerid=localStorage.getItem('dealeruserid');
    //let brandid=localStorage.getItem('BrandId');
    const obj = { 'dealerid': this.DealerId, 'brandid': this.BrandId, 'type': 'S' };
    this.ApiService.postmethod('dealerbrandterms/get', obj).subscribe((response: any) => {

      if (response.status == 200) {
        this.dealerTerms = response.response;
        if (this.dealerTerms.length != 0) {

          this.dealerTermsDetails = this.dealerTerms;
          //this.showGrid=true;
          this.showPanel = true;


        }
        else {
          this.getAddBrandTermsBasedonDealerAndBrands();

        }
      }

    });
  }

  getAddBrandTermsBasedonDealerAndBrands() {
    this.dealerTerms = [];
    const obj = { 'dealerid': this.DealerId, 'brandid': this.BrandId, 'type': 'D' };
    this.ApiService.postmethod('dealerbrandterms/get', obj).subscribe((response: any) => {
      if (response.status == 200) {
        this.dealerTerms = response.response;
        if (this.dealerTerms.length != 0) {
          this.showPanel = true;
          for (var i = 0; i < this.dealerTerms.length; i++) {
            if (this.dealerTerms[i].TermType == 1) {
              this.addYESORNOValues(this.dealerTerms[i].BTN_TermId, this.dealerTerms[i].BTN_DisplayName, 'N');
            }
            else if (this.dealerTerms[i].TermType == 2) {
              this.addTextValues(this.dealerTerms[i].BTN_TermId, this.dealerTerms[i].BTN_DisplayName, '');
            }
            else if (this.dealerTerms[i].TermType == 3) {
              this.addselectValues(this.dealerTerms[i].BTN_TermId, this.dealerTerms[i].BTN_DisplayName, '');
              this.getTermOptionValues(this.dealerTerms[i].BTN_TermId, this.dealerTerms[i].BTN_BrandId);
            }
          }
        }
      }
    });
  }

  getEditDealerBrandTerms() {
    this.savedBrandTerms = [];
    const obj = { 'dealerid': this.DealerId, 'brandid': this.BrandId, 'type': 'S' };
    this.ApiService.postmethod('dealerbrandterms/get', obj).subscribe((response: any) => {

      if (response.status == 200) {
        this.savedBrandTerms = response.response;
        
        if (this.savedBrandTerms.length != 0) {
          for (var i = 0; i < this.savedBrandTerms.length; i++) {
            if (this.savedBrandTerms[i].TermType == 1) {
              this.editYESORNOValues(this.savedBrandTerms[i].DT_ID, this.savedBrandTerms[i].DT_BT_ID, this.savedBrandTerms[i].TermName, this.savedBrandTerms[i].value, this.savedBrandTerms[i].UserName, this.savedBrandTerms[i].CreatedDate, this.savedBrandTerms[i].DT_NEXTUPDATE_DATE);
            }
            else if (this.savedBrandTerms[i].TermType == 2) {
              this.editTextValues(this.savedBrandTerms[i].DT_ID, this.savedBrandTerms[i].DT_BT_ID, this.savedBrandTerms[i].TermName, this.savedBrandTerms[i].value, this.savedBrandTerms[i].UserName, this.savedBrandTerms[i].CreatedDate, this.savedBrandTerms[i].DT_NEXTUPDATE_DATE);
            }
            else if (this.savedBrandTerms[i].TermType == 3) {
              this.editselectValues(this.savedBrandTerms[i].DT_ID, this.savedBrandTerms[i].DT_BT_ID, this.savedBrandTerms[i].TermName, this.savedBrandTerms[i].DT_VALUE, this.savedBrandTerms[i].UserName, this.savedBrandTerms[i].CreatedDate, this.savedBrandTerms[i].DT_NEXTUPDATE_DATE);
              this.getTermOptionValues(this.savedBrandTerms[i].DT_BT_ID, this.savedBrandTerms[i].brandid);
            }
            // }
          }
        }
      }
    });
  }

  addselectValues(id, termname, value) {
    this.optionArray.push(
      this.newSelectQuantity(id, termname, value)
    );
  }
  newSelectQuantity(termid, termname, value): FormGroup {
    return this.formBuilder.group({
      identity: '',
      TermName: termname,
      opt: new FormControl(''),
      termid: [termid],
      Value: [value]
    });
  }

  editselectValues(id, termid, termname, value, userName, createdDate, NextDate) {
    this.optionArray.push(
      this.newEditSelectQuantity(id, termid, termname, value, userName, createdDate, NextDate)
    );
  }
  newEditSelectQuantity(id, termid, termname, value, userName, createdDate, NextDate): FormGroup {
    return this.formBuilder.group({
      identity: id,
      TermName: termname,
      opt: value,
      termid: [termid],
      UserName: userName,
      CreatedDate: createdDate,
      NextUpdatedDate: NextDate
    });
  }

  cnt: any = 0;
  getTermOptionValues(termId, brandid) {
    const obj = { "TermID": termId, "BrandId": brandid }
    this.ApiService.postmethod('termsandconditions/incentivetermoptions', obj).subscribe((res: any) => {
      console.log(res);
      if (res.status == 200) {
        if (res.response[0].MIT_ID == termId) {
          this.termsOptions[this.cnt] = res.response;

          this.cnt++;
        }
      }

    })
  }

  getValue(event, index) {
    if (event.target.checked == true)
      this.termGroupForm.get('yesORnoValues').value[index].checkedValue = 'Y';
    else
      this.termGroupForm.get('yesORnoValues').value[index].checkedValue = 'N';
  }


  OnSubmit() {
    console.log('');
    console.log(this.termGroupForm.value);
    this.TermFinalArray = [];
    this.submitted = true;
    if (this.termGroupForm.invalid) {
      return;
    }
    if (this.termGroupForm.value.yesORnoValues.length > 0) {

      for (var i = 0; i < this.termGroupForm.value.yesORnoValues.length; i++) {

        if (this.termGroupForm.value.yesORnoValues[i].identity == '')
          this.TermFinalArray.push({ 'brandtermid': this.termGroupForm.value.yesORnoValues[i].termid, 'dealerid': this.DealerId, 'dtvalue': this.termGroupForm.value.yesORnoValues[i].checkedValue, 'status': 'Y', 'updateduserId': this.dealeruserid });
        else
          this.TermFinalArray.push({ 'dtid': this.termGroupForm.value.yesORnoValues[i].identity, 'brandtermid': this.termGroupForm.value.yesORnoValues[i].termid, 'dealerid': this.DealerId, 'dtvalue': this.termGroupForm.value.yesORnoValues[i].checkedValue, 'status': 'Y', 'updateduserId': this.dealeruserid, 'action': 'U' });
      }
    }
    if (this.termGroupForm.value.textArray.length > 0) {

      for (var j = 0; j < this.termGroupForm.value.textArray.length; j++) {
        if (this.termGroupForm.value.textArray[j].identity == '')
          this.TermFinalArray.push({ 'brandtermid': this.termGroupForm.value.textArray[j].termid, 'dealerid': this.DealerId, 'dtvalue': this.termGroupForm.value.textArray[j].i, 'status': 'Y', 'updateduserId': this.dealeruserid });
        else
          this.TermFinalArray.push({ 'dtid': this.termGroupForm.value.textArray[j].identity, 'brandtermid': this.termGroupForm.value.textArray[j].termid, 'dealerid': this.DealerId, 'dtvalue': this.termGroupForm.value.textArray[j].i, 'status': 'Y', 'updateduserId': this.dealeruserid, 'action': 'U' });
      }
    }

    if (this.termGroupForm.value.optionArray.length > 0) {

      for (var k = 0; k < this.termGroupForm.value.optionArray.length; k++) {
        if (this.termGroupForm.value.optionArray[k].identity == '')
          this.TermFinalArray.push({ 'brandtermid': this.termGroupForm.value.optionArray[k].termid, 'dealerid': this.DealerId, 'dtvalue': this.termGroupForm.value.optionArray[k].opt, 'status': 'Y', 'updateduserId': this.dealeruserid });
        else
          this.TermFinalArray.push({ 'dtid': this.termGroupForm.value.optionArray[k].identity, 'brandtermid': this.termGroupForm.value.optionArray[k].termid, 'dealerid': this.DealerId, 'dtvalue': this.termGroupForm.value.optionArray[k].opt, 'status': 'Y', 'updateduserId': this.dealeruserid, 'action': 'U' });

      }
    }

    const obj = { 'dealerbrandterms': this.TermFinalArray };
    console.log(obj);
    if (this.termGroupForm.value.yesORnoValues[0].identity == '') {
      this.ApiService.postmethod('dealerbrandterms', obj).subscribe((response: any) => {
        if (response.status == 200) {
          this.alertify.success('Dealer Terms Added Successfully');
          // this.showPanel = false;
          // this.showGrid = true;
          // const obj = { 'dealerid': this.DealerId, 'brandid': this.BrandId, 'type': 'S' };
          // this.ApiService.postmethod('dealerbrandterms/get', obj).subscribe((res: any) => {
          //   if (res.status == 200) {
          //     this.dealerTermsDetails = res.response;
          //     if (this.dealerTermsDetails.length != 0) {
          //       this.showGrid = true;
          //       //this.showPanel = true;
          //     }
          //   }
          // });
          this.resetForm();
          this.getSavedDealerBrandTerms();
        }
      })
    }
    else {
      this.ApiService.putmethod('dealerbrandterms', obj).subscribe((response: any) => {
        if (response.status == 200) {
          this.alertify.success('Dealer Terms Updated Successfully');
          // this.showPanel = false;
          // this.showGrid = true;
          // const obj = { 'dealerid': this.DealerId, 'brandid': this.BrandId, 'type': 'S' };
          // this.ApiService.postmethod('dealerbrandterms/get', obj).subscribe((res: any) => {
          //   if (res.status == 200) {
          //     this.dealerTermsDetails = res.response;
          //     if (this.dealerTermsDetails.length != 0) {
          //       this.showGrid = true;
          //       //this.showPanel = true;
          //     }
          //   }
          // });
          this.resetForm();
          this.getSavedDealerBrandTerms();
        }
      })
    }
  }
  OnCancel() {
    this.router.navigate(['/dashboard']);
  }

  TermscheckVal(val) {
    if (val == 'Y')
      return true;
    else
      return false;
  }
  resetForm() {
    // this.termGroupForm.resetForm({resetType:this.yesORnoValues});
    this.yesORnoValues.clear();
    this.textArray.clear();
    this.optionArray.clear();
  }

}
