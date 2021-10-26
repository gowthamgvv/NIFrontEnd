import { Component, OnInit, Renderer2, ViewChild, ElementRef, HostListener } from '@angular/core';
import { NavigationEnd, Router, RouterEvent, } from '@angular/router';
import { AdminServiceService } from '../../Core/_providers/admin-service/admin-service.service';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent implements OnInit {


  panel: boolean = false;

  public response: any = []
  public Paneldata: any = []
  public filterData: any = [];


  constructor(private router: Router, private renderer: Renderer2, private service: AdminServiceService) {
  }

  ngAfterViewInit(): void {
    document.onclick = (args: any): void => {
      if (args.target.tagName === 'A' || args.target.tagName == 'BUTTON') {
        document.getElementById("mySidebar").style.width = "210";
        document.getElementById("main").style.marginLeft = "0";
      }
      else {
        document.getElementById("mySidebar").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
      }
    }
  }

  ngOnInit() {
    this.get();
  }

  openNav() {
    if (this.panel == false) {
      document.getElementById("mySidebar").style.width = "210px";
      document.getElementById("main").style.marginLeft = "0px";
      this.panel = true
    }
    else {
      document.getElementById("mySidebar").style.width = "0";
      document.getElementById("main").style.marginLeft = "0";
      this.panel = false
    }
  }



  get() {
   
    console.log('hii')
    const obj = {
      "Type": "F"
    }
    this.service.postmethod('adminmodules/getmoduleinfo', obj).subscribe(res => {
      console.log(res)
      this.response = res
      if (this.response.status == 200) {
        this.Paneldata = this.response.response.ModuleData.Module;
        if(localStorage.getItem('DealerId')=="0")
        {
           this.Paneldata = this.Paneldata.filter(item=>item.modname!= 'Dealer Terms');
        }
        console.log(this.Paneldata);
        //   this.filterData = this.Paneldata.filter(item => item.mod_front == 'Y');
        //  console.log(this.filterData)        
      }
    })

   
  }
}
