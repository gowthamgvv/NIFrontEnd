import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ApiService } from '../../../Core/_providers/api-service/api.service'
import { MatDialog } from '@angular/material/dialog';
import { SoldUnitsDataComponent } from '../../sold-units-data/sold-units-data.component';
import {InventoryComponent} from '../../dashboard/inventory/inventory.component'
@Component({
  selector: 'app-incentive-stats',
  templateUrl: './incentive-stats.component.html',
  styleUrls: ['./incentive-stats.component.scss']
})
export class IncentiveStatsComponent implements OnInit {
  soldunitsdata: any;
  loadInvntryByStock: any = [{ "Year": "", "MakeId": "", "ModelId": "" }];

  constructor(private apiSrvc: ApiService, public dialog: MatDialog) { }


  @Output() xRecmndClick: EventEmitter<any> = new EventEmitter<any>();

  @Input('incentiveInfo') incentiveInfo: any = [];
  @Input('totalInfo') totalInfo: any = [];

  dealerid: any;
  incentiveid: any;
  sampledata: any = [{ "Year": "0", "MakeId": "0", "ModelId": "0" }];

  ngOnInit() {
    this.dealerid = localStorage.getItem('dealerid')
    this.incentiveid = localStorage.getItem('incentiveid')
    console.log(this.incentiveid)
    console.log(this.dealerid)

  }
  showInvntry: boolean = false;
  viewInventory(inventorydata) {
    // this.loadInvntryByStock["Year"] = 0;
    // this.loadInvntryByStock["MakeId"] = 0;
    // this.loadInvntryByStock["ModelId"] = 0;
    this.showInvntry = true;
    // this.loadInvntryByStock = [];
    const dataRes = [{
      "Dealershipid": this.dealerid,
      "incentiveid": this.incentiveid,
      "lineitemid": inventorydata.DID_LINE_ID[0]
    }
    ]
    const dialogRef = this.dialog.open(InventoryComponent, {
      width: '100%',
      data: dataRes
    });

  }

  hideInventory() {
    console.log(this.showInvntry)
    this.showInvntry = false;

  }
  loadIntryByStk(year, makeid, modelid) {
    console.log(this.loadInvntryByStock)
    if (this.loadInvntryByStock.length === 0) {
      this.loadInvntryByStock = [{ "Year": "", "MakeId": "", "ModelId": "" }];
    }
    this.loadInvntryByStock["Year"] = year;
    this.loadInvntryByStock["MakeId"] = makeid;
    this.loadInvntryByStock["ModelId"] = modelid;
    this.showInvntry = true;
    console.log(this.loadInvntryByStock)

  }


  openDialog(soldunitdata): void {
    console.log(soldunitdata)
    const dataRes = [{
      "Dealershipid": this.dealerid,
      "incentiveid": this.incentiveid,
      "lineitemid": soldunitdata.DID_LINE_ID[0]
    }
    ]

    const dialogRef = this.dialog.open(SoldUnitsDataComponent, {
      width: '100%',
      data: dataRes
    });

  }

}
