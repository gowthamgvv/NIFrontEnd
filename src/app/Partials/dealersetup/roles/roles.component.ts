import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ApiService } from '../../../Core/_providers/api-service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from '../../../Core/_providers/alert-service/alertify.service'
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ContentObserver } from '@angular/cdk/observers';
import { Console } from 'console';
declare var $: any;


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  showAddRolePopup = false;
  submitted = false;
  addRolePopup:FormGroup;
  srchst: any = 'p';
  RoleName: string;
  Roles: any = [];
  UsersData: any = [];
  UsersListData: any = []
  roleId :any;
  //   cmsModules= [ 
  //     {
  //     "mod_id": "1",
  //     "smod_id": 0,
  //     "smod_mod_id": 0,
  //     "smod_seq": 0,
  //     "mod_name": "main one",
  //     "smod_filename": "#",
  //     "mod_status": "Y",
  //     "mod_admin": "N",
  //     "mod_front": "Y",
  //     "mod_privilege": '1',
  //     "smod_privilege": "#",
  //     "status": "Y",
  //     "checking":'A'
  // },
  // {
  //   "mod_id": "2",
  //   "smod_id": 0,
  //   "smod_mod_id": 0,
  //   "smod_seq": 0,
  //   "mod_name": "main two",
  //   "smod_filename": "#",
  //   "mod_status": "Y",
  //   "mod_admin": "N",
  //   "mod_front": "Y",
  //   "mod_privilege": null,
  //   "smod_privilege": "#",
  //   "status": "Y",
  //   "checking":'A'

  // },
  // {
  //   "mod_id": "0",
  //   "smod_id": 1,
  //   "smod_mod_id": 2,
  //   "smod_seq": 0,
  //   "mod_name": "sub one",
  //   "smod_filename": "#",
  //   "mod_status": "Y",
  //   "mod_admin": "N",
  //   "mod_front": "Y",
  //   "mod_privilege": '1',
  //   "smod_privilege": "#",
  //   "status": "Y",
  //   "checking":'S'

  // },
  // {
  //   "mod_id": "0",
  //   "smod_id": 2,
  //   "smod_mod_id": 2,
  //   "smod_seq": 0,
  //   "mod_name": "sub two",
  //   "smod_filename": "#",
  //   "mod_status": "Y",
  //   "mod_admin": "N",
  //   "mod_front": "Y",
  //   "mod_privilege": '1',
  //   "smod_privilege": "#",
  //   "status": "Y",
  //   "checking":'S'

  // },
  // {
  //   "mod_id": "0",
  //   "smod_id": 3,
  //   "smod_mod_id": 2,
  //   "smod_seq": 0,
  //   "mod_name": "sub three",
  //   "smod_filename": "#",
  //   "mod_status": "Y",
  //   "mod_admin": "N",
  //   "mod_front": "Y",
  //   "mod_privilege": '1',
  //   "smod_privilege": "#",
  //   "status": "Y",
  //   "checking":'S'

  // },
  // {
  //   "mod_id": "1",
  //   "smod_id": 0,
  //   "smod_mod_id": 0,
  //   "smod_seq": 0,
  //   "mod_name": "view",
  //   "smod_filename": "#",
  //   "mod_status": "Y",
  //   "mod_admin": "N",
  //   "mod_front": "Y",
  //   "mod_privilege": '1',
  //   "smod_privilege": "#",
  //   "status": "Y",
  //   "checking":'AS'

  // },
  // {
  //   "mod_id": "1",
  //   "smod_id": 0,
  //   "smod_mod_id": 0,
  //   "smod_seq": 0,
  //   "mod_name": "edit",
  //   "smod_filename": "#",
  //   "mod_status": "Y",
  //   "mod_admin": "N",
  //   "mod_front": "Y",
  //   "mod_privilege": '2',
  //   "smod_privilege": "#",
  //   "status": "Y",
  //   "checking":'AS'

  // },
  // {
  //   "mod_id": "0",
  //   "smod_id": 1,
  //   "smod_mod_id": 2,
  //   "smod_seq": 0,
  //   "mod_name": "view",
  //   "smod_filename": "#",
  //   "mod_status": "Y",
  //   "mod_admin": "N",
  //   "mod_front": "Y",
  //   "mod_privilege": '#',
  //   "smod_privilege": "1",
  //   "status": "Y",
  //   "checking":'SS'

  // },
  // {
  //   "mod_id": "0",
  //   "smod_id": 3,
  //   "smod_mod_id": 2,
  //   "smod_seq": 0,
  //   "mod_name": "view",
  //   "smod_filename": "#",
  //   "mod_status": "Y",
  //   "mod_admin": "N",
  //   "mod_front": "Y",
  //   "mod_privilege": '#',
  //   "smod_privilege": "1",
  //   "status": "Y",
  //   "checking":'SS'

  // },
  // {
  //   "mod_id": "0",
  //   "smod_id": 2,
  //   "smod_mod_id": 2,
  //   "smod_seq": 0,
  //   "mod_name": "edit",
  //   "smod_filename": "#",
  //   "mod_status": "Y",
  //   "mod_admin": "N",
  //   "mod_front": "Y",
  //   "mod_privilege": '#',
  //   "smod_privilege": "2",
  //   "status": "Y",
  //   "checking":'SS'

  // },
  // {
  //   "mod_id": "0",
  //   "smod_id": 2,
  //   "smod_mod_id": 2,
  //   "smod_seq": 0,
  //   "mod_name": "view",
  //   "smod_filename": "#",
  //   "mod_status": "Y",
  //   "mod_admin": "N",
  //   "mod_front": "Y",
  //   "mod_privilege": '#',
  //   "smod_privilege": "1",
  //   "status": "Y",
  //   "checking":'SS'

  // },
  // {
  //   "mod_id": "0",
  //   "smod_id": 2,
  //   "smod_mod_id": 2,
  //   "smod_seq": 0,
  //   "mod_name": "assigned only",
  //   "smod_filename": "#",
  //   "mod_status": "Y",
  //   "mod_admin": "N",
  //   "mod_front": "Y",
  //   "mod_privilege": '#',
  //   "smod_privilege": "3",
  //   "status": "Y",
  //   "checking":'SS'

  // },
  // ];
  cmsModules: any = [];
  visibleIndex = -1;
  aid: any[];
  sid: any[];
  asid: any[];
  ssid: any[];
  alphaSrch: string = '';
  alphaColumns: any = ["mod_name"];
  rolesForm: FormGroup;
  selectedUser = false;
  rolesModules: any = [];
  addingusers: any;
  addedurs1: any = [];
  selectedusers: any = [];
  permissions: boolean;
  users: boolean;
  user: any;
  cmsAdminlist:any=[]
  constructor(private ApiService: ApiService, private formBuilder: FormBuilder, private alertify: AlertifyService, private ngbmodal: NgbModal, private ngbmodalActive: NgbActiveModal) { }

  ngOnInit(): void {
    this.getRoles();
    // this.RoleName = this.Roles[0].Role_Name

    this.users = false;
    this.rolesForm = this.formBuilder.group({
      txtSearch: ''
    })
    this.addRolePopup = this.formBuilder.group({
      rolename: ['', Validators.required]
    })
    console.log(this.cmsModules)
    this.aid = []; this.sid = []; this.asid = []; this.ssid = []
    // this.cmsModules.forEach(el => {
    //   if(el.status =="Y" && el.mod_id!="0"){
    //     this.aid.push(el.mod_id.toString());
    //   }
    //   if (el.status == "Y" && el.mod_id=="0") {
    //     this.sid.push(el.smod_id.toString());
    //   }          
    // })
    //8855
    // this.aid=[];this.sid=[];this.asid=[];this.ssid=[]
    // this.cmsModules.forEach(el => {
    //   if(el.status =="Y" && el.mod_id!="0" && el.checking=='A'){
    //     this.aid.push(el.mod_id.toString());
    //   }
    //   if (el.status == "Y" && el.mod_id=="0" && el.checking=="S") {
    //     this.sid.push(el.smod_id.toString());
    //   }     
    //   if(el.status =="Y" && el.mod_id!="0" && el.checking=='AS'){
    //     this.asid.push(el.mod_privilege.toString());
    //   }
    //   if (el.status == "Y" && el.mod_id=="0" && el.checking=="SS") {
    //     this.ssid.push(el.smod_privilege.toString());
    //   }         
    // })
    setTimeout(()=> this.ViewPermissions('p'),2000)

  //  this.ViewPermissions('p')
  }
  ViewPermissions(typ) {
    this.srchst = typ;
    this.permissions = true;
    this.users = false;
    this.RoleName = this.Roles[0].Role_Name

//this.getRoles()
  }

  ViewUsers(typ) {
    this.srchst = typ;
    this.permissions = false;
    this.users = true;
    this.GetUsersBasedOnRoles()
    this.RoleName = this.Roles[0].Role_Name
    console.log(this.RoleName)
  }
  onSearch() {
    this.alphaSrch = this.rolesForm.controls['txtSearch'].value;
  }

  getRoles() {

    const obj = { "Role_Id": '0', "expression": "Role_Front='Y'" }
    this.ApiService.postmethod('roles/get', obj).subscribe((roleEditData: any) => {
      if (roleEditData.status == 200) {
        this.Roles = roleEditData.response;
        this.roleId = this.Roles[0].Role_UniqId
        this.RoleName = this.Roles[0].Role_Name
        console.log(this.RoleName)
        console.log('roles', this.Roles);
        this.showSubItem('', 0, this.roleId, '');
        this.GetUsersBasedOnRoles();
      }
    }, err => {

    })
  }
  GetUsersBasedOnRoles() {
    const obj = {
      "GroupID": localStorage.getItem('dealerGroupId'),
      "DealerId": "0",
      "expression": "Du_Role=" + this.roleId
    }
    console.log(obj)
    this.ApiService.postmethod('dealeruser/getdealerusers', obj).subscribe(res => {
      console.log(res)
      this.UsersData = res.response
    })
  }
  DeleteUser(val) {
    const obj = {
      "Du_Id": val.Du_Id,
      "Role_ID": val.Du_Role
    }
    console.log(obj)
    this.ApiService.putmethod('permissionsbasedonroles/basedonrole', obj).subscribe(res => {
      if (res.status == 200) {
        this.alertify.success('Success')
        this.GetUsersBasedOnRoles()
      }
    })

  }

  AddUser(tmp) {
    this.ngbmodalActive = this.ngbmodal.open(tmp, { size: 'sm', backdrop: 'static' });
    const obj = {
      "GroupID": localStorage.getItem('dealerGroupId'),
      "DealerId": "0",
      "expression": "Du_Role=0"
    }
    console.log(obj)
    this.ApiService.postmethod('dealeruser/getdealerusers', obj).subscribe(res => {
      console.log(res)
      this.UsersListData = res.response
    })
  }
  checkuser(usr, evt) {
    let target = evt.target
    console.log(target)
    console.log(usr)
    this.addedurs1 = this.UsersListData.filter(ele => {
      if (ele.Check) {
        return ele;
      }
    });
  }
  onclosemsg() {​​​​​​​​   
    this.selectedusers=[]
    this.addedurs1=[]
    this.ngbmodalActive.close();
      }​​​​​​​​
  onSubmit() {
    this.UsersListData.forEach(ele => {
      if (ele.Check) {

        this.selectedusers.push(ele.Du_Id);
      }
    });
    console.log(this.selectedusers)
    const obj={
      "Du_Id": this.selectedusers.toString(),
      "Role_ID": this.roleId
    }
    this.ApiService.putmethod('permissionsbasedonroles/basedonroles', obj).subscribe(res => {
      console.log(res)
      if(res.status==200){
        this.alertify.success(res.response)
        this.addedurs1=[]
        this.selectedusers=[]
      }
    })

  }
  showSubItem(eva, ind, id, name) {
    this.roleId = id
    console.log('roles', eva, ind, id, name);
    this.RoleName = name
    this.selectedUser = ind;
    const modulesCms = {
      "RoleID": id,
      "expression": "mod_front='Y'"
    }
    console.log(modulesCms)
    this.ApiService.postmethod('permissionsbasedonroles/get', modulesCms).subscribe(resCmsModule => {
      console.log(resCmsModule)
      this.cmsModules = resCmsModule.response;
    //  this.cmsModules = this.cmsModules.filter(item=>item.mod_front== 'Dealer Terms');
      console.log(this.cmsModules)
      if (this.cmsModules.length > 0) {
        this.cmsModules.forEach(ele => {
          if(ele.checking== 'S' || ele.checking=='SS'){
            this.cmsModules.forEach(val =>{
              if(ele.smod_mod_id==val.mod_id){
                ele.mod_front='Y'
              }
            })
           
          }
        });
          this.cmsAdminlist = this.cmsModules.filter(item=>item.mod_front== 'Y' && item.checking=='A');
          // this.cmsAdminlist = this.cmsModules.filter(item=>item.smid_id== 'Y' && item.checking=='S');
          // this.cmsAdminlist = this.cmsModules.filter(item=>item.mod_front== 'Y' && item.checking=='A');
          // this.cmsAdminlist = this.cmsModules.filter(item=>item.mod_front== 'Y' && item.checking=='A');
console.log(this.cmsModules)
        this.aid = []; this.sid = []; this.asid = []; this.ssid = []
        this.cmsModules.forEach(el => {
          if (el.status == "Y" && el.mod_id != "0" && el.checking == 'A') {
            this.aid.push(el.mod_id.toString());
          }
          if (el.status == "Y" && el.mod_id == "0" && el.checking == "S") {
            this.sid.push(el.smod_id.toString());
          }
          if (el.status == "Y" && el.mod_id != "0" && el.checking == 'AS') {
            this.asid.push(el.mod_privilege.toString());
          }
          if (el.status == "Y" && el.mod_id == "0" && el.checking == "SS") {
            this.ssid.push(el.smod_privilege.toString());
          }
        })
       // this.permissions = true;

      }
      console.log(this.aid)
      console.log(this.sid)
      console.log(this.asid)
      console.log(this.ssid)

      console.log('mba', this.rolesModules);
      if (this.visibleIndex === ind) {
        this.visibleIndex = -1;
      } else {
        this.visibleIndex = ind;
      }
    })
    this.GetUsersBasedOnRoles()
  }


  checkAS(val, main, evt) {
    let arry1 = []

    let target = evt.target;
    if (target.checked) {

      for (let i = 0; i < this.cmsModules.length; i++) {
        if (val.mod_id == this.cmsModules[i].mod_id && this.cmsModules[i].checking == 'AS' && val.mod_privilege == this.cmsModules[i].mod_privilege) {
          this.cmsModules[i].status = "Y";
          console.log(this.cmsModules[i])
          main.status = 'Y';
        }

      }

    }
    else {
      for (let i = 0; i < this.cmsModules.length; i++) {


        if (main.mod_id == this.cmsModules[i].mod_id && this.cmsModules[i].checking == 'AS') {
          console.log(this.cmsModules[i])
          arry1.push(this.cmsModules[i]);

          val.status = 'N'
        }

      }
      const allEqual = arr => arr.every(value => value.status === "N");
      const result = allEqual(arry1) // output: false
      result == true ? main.status = "N" : main.status = "Y"

    }


  }
  checkSS(val, main, evt,admin) {
    let arry1 = []
    let arr2=[]
    let target = evt.target;
    if (target.checked) {

      for (let i = 0; i < this.cmsModules.length; i++) {
        if (val.smod_id == this.cmsModules[i].smod_id && this.cmsModules[i].checking == 'SS' && val.smod_privilege == this.cmsModules[i].smod_privilege) {
          this.cmsModules[i].status = "Y";
          console.log(this.cmsModules[i]);
          val.status = "Y";

        }
        if (val.smod_id == this.cmsModules[i].smod_id && this.cmsModules[i].checking == 'SS') {
          main.status = "Y";
admin.status='Y'
        }


      }

    }
    else {
      for (let i = 0; i < this.cmsModules.length; i++) {

        if (val.smod_id == this.cmsModules[i].smod_id && this.cmsModules[i].checking == 'SS') {

          console.log(this.cmsModules[i])
          arry1.push(this.cmsModules[i]);

          val.status = 'N'
        }
        if (val.smod_mod_id == this.cmsModules[i].smod_mod_id && this.cmsModules[i].checking == 'S') {

          console.log(this.cmsModules[i])
          arr2.push(this.cmsModules[i]);

          val.status = 'N'
        }
        if (val.smod_id == this.cmsModules[i].smod_id && this.cmsModules[i].checking == 'SS' && val.smod_privilege == this.cmsModules[i].smod_privilege) {
          this.cmsModules[i].status = "N";


        }
      
      }
      const allEqual = arr => arr.every(value => value.status === "N");
      const result = allEqual(arry1) // output: false
      console.log(arry1)
      result == true ? main.status = "N" : main.status = "Y"
      const allEqualadm = arr => arr.every(value => value.status === "N");
      const resultadm = allEqual(arr2) // output: false
      console.log(arr2)
      resultadm == true ? admin.status = "N" : admin.status = "Y"

    }

  }
  checkS(val, main, evt) {
    let arry1: any = [];

    let target = evt.target;
    if (target.checked) {

      for (let i = 0; i < this.cmsModules.length; i++) {
        if (val.smod_mod_id == this.cmsModules[i].mod_id) {
          this.cmsModules[i].status = "Y";
          val.status = 'Y'

        }
        if (val.smod_id == this.cmsModules[i].smod_id) {
          this.cmsModules[i].status = "Y";

          console.log(this.cmsModules[i])
        }

      }
    }

    else {
      for (let i = 0; i < this.cmsModules.length; i++) {

        if (val.smod_id == this.cmsModules[i].smod_id && this.cmsModules[i].checking == 'SS' && val.mod_name == this.cmsModules[i].mod_name) {
          this.cmsModules[i].status = "N";

          console.log(this.cmsModules[i])
        }
        if (val.smod_id == this.cmsModules[i].smod_id && this.cmsModules[i].checking == 'SS') {
          this.cmsModules[i].status = "N";

          console.log(this.cmsModules[i])
        }
        if (main.mod_id == this.cmsModules[i].smod_mod_id && this.cmsModules[i].checking == 'S') {
          console.log(this.cmsModules[i])
          arry1.push(this.cmsModules[i]);

          val.status = 'N'
        }
      }
      const allEqual = arr => arr.every(value => value.status === "N");
      const result = allEqual(arry1) // output: false
      result == true ? main.status = "N" : main.status = "Y"

    }

  }
  checkA(val, evt) {
    let target = evt.target;
    if (target.checked) {
      this.aid = []; this.sid = []; this.asid = []; this.ssid = []

      for (let i = 0; i < this.cmsModules.length; i++) {
        if (val.mod_id == this.cmsModules[i].mod_id && this.cmsModules[i].checking == 'AS') {
          this.cmsModules[i].status = "Y";
          console.log(this.cmsModules[i])
        }
        if (val.mod_id == this.cmsModules[i].smod_mod_id && this.cmsModules[i].checking == 'S') {
          this.cmsModules[i].status = "Y";
          console.log(this.cmsModules[i])
        }
        if (val.mod_id == this.cmsModules[i].smod_mod_id && this.cmsModules[i].checking == 'SS') {
          this.cmsModules[i].status = "Y";
          console.log(this.cmsModules[i])
        }
        if (val.mod_id == this.cmsModules[i].mod_id && this.cmsModules[i].checking == 'A') {
          this.cmsModules[i].status = "Y";
          console.log(this.cmsModules[i])
        }
      }

    }
    else {
      for (let i = 0; i < this.cmsModules.length; i++) {
        if (val.mod_id == this.cmsModules[i].mod_id && this.cmsModules[i].checking == 'AS') {
          this.cmsModules[i].status = "N";
        }
        if (val.mod_id == this.cmsModules[i].smod_mod_id && this.cmsModules[i].checking == 'S') {
          this.cmsModules[i].status = "N";
          console.log(this.cmsModules[i])
        }
        if (val.mod_id == this.cmsModules[i].smod_mod_id && this.cmsModules[i].checking == 'SS') {
          this.cmsModules[i].status = "N";
          console.log(this.cmsModules[i])
        }
        if (val.mod_id == this.cmsModules[i].mod_id && this.cmsModules[i].checking == 'A') {
          this.cmsModules[i].status = "N";
          console.log(this.cmsModules[i])
        }
      }

    }


  }

  saveModulePermissons(cms) {
    console.log(cms)

    cms = cms.filter(item => item.status == 'Y');
    console.log(cms)
    this.aid = []; this.sid = []; this.asid = []; this.ssid = []
    cms.forEach(el => {
      if (el.checking == 'A') {
        this.aid.push(el.mod_id.toString());
      }
      if (el.checking == "S") {
        this.sid.push(el.smod_id.toString());
      }
      if (el.checking == 'AS') {
        this.asid.push(el.mod_privilege + '_' + el.mod_id);
      }
      if (el.checking == "SS") {
        this.ssid.push(el.smod_privilege + '_' + el.smod_id);
      }
    })
    console.log(this.aid)

    console.log(this.sid)
    console.log(this.ssid)
    console.log(this.asid)


    if (this.aid.length > 0 || this.sid.length > 0 || this.asid.length > 0 || this.ssid.length > 0) {
      //console.log(this.roleId,this.uid.join(","),this.TypeId);
      const obj = {
        "NI_ROLE_ID": this.roleId,
        "NI_SMOD_ID": this.sid.join(","),
        "NI_TYPE": 'F',
        "NI_MOD_ID": this.aid.join(","),
        "NI_MOD_PRIVILEGE": this.asid.join(','),
        "NI_SMOD_PRIVILEGE": this.ssid.join(',')
      }
      console.log(obj)
      this.ApiService.putmethod('permissionsbasedonroles', obj).subscribe((data: any) => {
        console.log(data)
        if (data.status == 200) {

          this.alertify.success(data.response)

        }
      }, err => {
        this.alertify.error("Modules don't not added!!");
      })

    } else {
      this.alertify.error("Please select modules");
    }

  };

  showRolePopup()
  {
    this.addRolePopup.reset();
    this.showAddRolePopup = true;
    this.submitted = false;
  }

  addRole()
  {
    this.submitted = true;
    if (this.addRolePopup.invalid) {
      return;
    }
    const roleObj = {
      "Role_Name": this.addRolePopup.value.rolename,
      "Role_UniqId": "",
      "Role_Front": "Y",
      "Role_Admin": "N",
      "Role_Portal": "N",
      "Role_Status": "Y"
    }
    console.log(roleObj);
    this.ApiService.postmethod('roles', roleObj ).subscribe((response:any)=>{
        console.log(response);
        if (response.status === 200){
          this.alertify.success('Role added successfully');              
          $('.modal-backdrop').remove();
          this.showAddRolePopup = false;
          this.getRoles();
          this.addRolePopup.reset();
          this.submitted= false;
        }
        else 
        {
          this.alertify.error(response.error);
          $('.modal-backdrop').remove();
          this.showAddRolePopup = false;
          this.addRolePopup.reset();
          this.submitted= false;
          this.getRoles();
        }
   });
  }

  closeModel() {
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
    this.showAddRolePopup = false;
    this.addRolePopup.reset();
  }
}
