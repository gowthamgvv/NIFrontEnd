import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../Core/_providers/api-service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {


  selectedUser = true;
  tabType = '';
  dealersDetails: any = [];
  divActive: any = 0;
  dlrgrpS: any = [];
  dlrshipS: any = [];
  // alldlrshipS: any = [];
  dlrid: any;
  visibleIndex = -1;
  alphaSrch: string = '';
  usrSrch: string = '';
  alphaColumns: any = ["dealer_name"];
  usrColumns: any = ["dd_name"];
  dealersForm: FormGroup
  usersForm: FormGroup
  constructor(private ApiService: ApiService, private formBuilder: FormBuilder, private router: Router) { }



  ngOnInit(): void {
    this.getGroups();
    this.dlrid = localStorage.getItem('dealerGroupId');
    // this.getDealerships();

    this.dealersForm = this.formBuilder.group({
      txtSearch: ''
    })
    this.usersForm = this.formBuilder.group({
      usrSearch: ''
    })
    this.showSubItem('', 0, 4, '');
  }

  onSearch() {
    this.alphaSrch = this.dealersForm.controls['txtSearch'].value;
  }

  userSearch() {
    this.usrSrch = this.usersForm.controls['usrSearch'].value;

  }


  getGroups() {
    const obj = {
      "dealergroupid": "0",
      "expression": ""
    }
    this.ApiService.postmethod('dealershipgroups/get', obj).subscribe(res => {
      console.log(res);
      if (res.status == 200) {
        this.dlrgrpS = JSON.parse(res.response[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']);
        console.log('mm', this.dlrgrpS);
      }
    });
  }

  // getDealerships() {
  //   const obj = {
  //     "DealerShipId": "0",
  //     "expression": ""
  //   }
  //   this.ApiService.postmethod('dealerships/alldealerships', obj).subscribe(res => {
  //     console.log(res);
  //     if (res.status == 200) {
  //       this.alldlrshipS = res.response;
  //       console.log('ppp', this.alldlrshipS);
  //     }
  //   });
  // }


  showSubItem(eva, val, val1, val2) {
    console.log('mmk', eva, val, val1, val2);
    this.dealersDetails = [];
    this.selectedUser = val;


    const obj = {
      "dealerid": "0",
      "expression": "dealer_dg_id =" + val1
    }
    this.ApiService.postmethod('dealerships/get', obj).subscribe(res => {
      console.log(res);
      if (res.status == 200) {
        this.dlrshipS = JSON.parse(res.response[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']);

        console.log('kkk', this.dlrshipS);
        if (this.dlrshipS.length > 0) {
          Object.entries(this.dlrshipS).forEach(
            ([key, value]) => {
              value['dealer_checked'] = true;
              if (value['DealerDetails'] != undefined || value['DealerDetails'] != null)
                Object.entries(value['DealerDetails']).forEach(
                  ([key, value]) => {
                    if (value['dd_name'] != "")
                      this.dealersDetails.push(value);
                  }
                );

            }
          );
        }

        console.log('kkk-2', this.dlrshipS);

        console.log('kkk-3', this.dealersDetails);

        this.divActive = val;


        if (this.visibleIndex === val) {
          this.visibleIndex = -1;
        } else {
          this.visibleIndex = val;
        }
      }

    });

  }

  eventCheck(val, ind) {
    console.log('krish', val.checked);
    this.dlrshipS[ind]['dealer_checked'] = val.checked;
    this.dealersDetails = [];
    Object.entries(this.dlrshipS).forEach(
      ([key, value]) => {
        console.log("is checked ..", value['dealer_checked']);
        if (value['dealer_checked'] == true) {
          Object.entries(value['DealerDetails']).forEach(
            ([key, value]) => {
              if (value['dd_name'] != "")
                this.dealersDetails.push(value);
            }
          );
        }
      }
    );
  }


}