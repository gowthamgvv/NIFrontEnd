import { Component, Renderer2, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../../Core/_providers/api-service/api.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../../../Core/_providers/alert-service/alertify.service';
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  submitted = false;
  hide: boolean = false;
  public userArray: any = [];
  SearchDealerUsers: FormGroup;
  alphaSrch: string = '';
  alphaColumns: any = ["Du_First_Name","Du_Last_Name"];
  showgrid = true;
  rolesArray:any=[];
  addClick = false;
 // allChecked = false;
  addUserForm: FormGroup;
  dealerGroupId: any;
  dealershipId: any;
  states: any = [];
  getRoleid: any;
  showAddIcon = false;
  showSearchIcon = false;
  phoneFormat: any[] = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(private fB: FormBuilder,
    private apiSrvc: ApiService,
    private router: Router,
    private datepipe: DatePipe,
    private SpinnerService: NgxSpinnerService,
    private alertify: AlertifyService) {


    this.SearchDealerUsers = this.fB.group({
      txtSearch: ""
    });

    this.addUserForm = this.fB.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      title: ['', Validators.required],
      email: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      state: ['', Validators.required],
      role: ['', Validators.required]
    });

    this.dealerGroupId=localStorage.getItem('dealerGroupId');
    this.dealershipId=localStorage.getItem('DealerId');
    this.getRoleid=localStorage.getItem('RoleUniqId');
    this.showgrid = true;
    this.getDealerUsers();
    this.rolesList();
    this.getStates();
// masteradmin -gen manager - managers
    if(this.getRoleid == 999 || this.getRoleid == 102 || this.getRoleid == 128 )
    {
      this.showAddIcon = true;
      this.showSearchIcon =true;
    }
    else
    {
      this.showAddIcon = false;
      this.showSearchIcon = true;
    }
  }

  ngOnInit(): void {
    this.showgrid = true;
    this.getDealerUsers();
    this.rolesList();
    this.getStates();
  }

  getDealerUsers() {
    const obj = {
      "GroupID": this.dealerGroupId,
      "DealerId": this.dealershipId,
      "expression": ""
  }
    this.apiSrvc.postmethod('dealeruser/getdealerusers', obj).subscribe(res => {
      console.log(res);
      if (res.status == 200) 
      {
        this.userArray = res.response;
        console.log(this.userArray);
        this.userArray.forEach(element => {
          this.rolesArray.forEach(data => {
            if (element.Du_Role == data.Role_UniqId) {
              element.rolename=data.Role_Name          
            }
          })
        });
      }
    });
  }

rolesList(){
  const obj = {
    Role_Id: 0
  };
this.apiSrvc.postmethod('roles/get', obj).subscribe((res: any) => {
  if (res.status === 200) {
    const roles = res.response;
    if (roles) {
      this.rolesArray = res.response;
      console.log(roles);
      this.getDealerUsers();
    }
}
});
}

getStates() {
  const obj={sg_id :0}
   this.apiSrvc.postmethod('States/get',obj).subscribe((res: any) => {
    if (res.status === 200) {
     this.states=res.response;
    }
  });
}

saveUser()
{
  this.submitted = true;
  if (this.addUserForm.invalid) {
    this.alertify.error('Please enter the empty fields')
    return;
  }

  const  obj ={
    F_Name: this.addUserForm.value.firstname,
    L_Name: this.addUserForm.value.lastname, 
    Dealer_id: this.dealershipId,
    Dealer_group_id: this.dealerGroupId, 
    Gender: "",
    JoinDate: "",
    Job_title: this.addUserForm.value.title,
    Dob: "", 
    Address1: "", 
    Address2: "",
    login_id: this.addUserForm.value.email, 
    Password: this.addUserForm.value.password,
    City: "",
    State: this.addUserForm.value.state,
    Zip: "",
    Phone: this.addUserForm.value.phone,
    Role: this.addUserForm.value.role,
    Status: 'Y',
    Userenable: 'N',
    category: '',
    Usertype: ""
    }

      console.log(obj)
      const fd: any = new FormData();
      fd.append('data', JSON.stringify(obj));
      this.apiSrvc.postmethod('dealeruser', fd).subscribe((response:any)=>{
        console.log(response);
        if(response.status == 200)
        {
          this.alertify.success('User Added Succesfully!');
            console.log('response', response);
            this.addUserForm.reset();
            this.addClick = false;
            this.showgrid = true;
            this.showAddIcon = true;
            this.showSearchIcon= true;
            this.getDealerUsers();
        }
        else{
          this.alertify.error(response.error);
        }
      }
); 

}

onInactiveClick(index, Du_Id,Du_Dealer_Id,Du_Dealer_Group_Id,Du_First_Name, Du_Last_Name, Du_Gender, 
  Du_Date_Of_Joining, Du_Job_Title, Du_date_Of_Birth, Du_address1,Du_address2, 
  Du_Login_Id,Du_password,Du_City,
  Du_State,Du_Zip,Du_Phone,Du_Role,Du_Image,User_Enable,DU_User_Type)
{
    const fd: any = new FormData(); 
 
    const obj = {
      "Id":Du_Id,
      "F_Name": Du_First_Name,
   "L_Name": Du_Last_Name, 
   "Dealer_id": Du_Dealer_Id, 
   "Dealer_group_id": Du_Dealer_Group_Id,
   "Gender": Du_Gender,
   "JoinDate": this.datepipe.transform(Du_Date_Of_Joining,'MM/dd/yyyy'),    
   "Job_title": Du_Job_Title,
   "Dob": this.datepipe.transform(Du_date_Of_Birth,'MM/dd/yyyy'),     
   "Address1": Du_address1,                                                                                                                                                          
   "Address2": Du_address2,
   "login_id": Du_Login_Id, 
  "Password": "",
          "City":Du_City,
          "State":Du_State,
           "Zip": Du_Zip,
           "Phone": Du_Phone,
           "Role": Du_Role,
  "Image":Du_Image,
   "Status": "N",
  "Userenable":User_Enable,
  "Usertype":DU_User_Type,
  "category": "",
  }

    fd.append('data', JSON.stringify(obj));
    console.log('Final Obj', obj);
    console.log('fdddddd', fd);
    this.apiSrvc.putmethod('dealeruser', fd).subscribe((response: any) => {
      console.log(response);
      if (response.status == 200) {
        this.alertify.success('User Status Updated Succesfully!');
        console.log(response);
        this.getDealerUsers();
        this.showgrid = true;
      }
      else{
        this.alertify.error(response.error);
      }
    });  

}

onActiveClick(index, Du_Id,Du_Dealer_Id,Du_Dealer_Group_Id,Du_First_Name, Du_Last_Name, Du_Gender, 
  Du_Date_Of_Joining, Du_Job_Title, Du_date_Of_Birth, Du_address1,Du_address2, 
  Du_Login_Id,Du_password,Du_City,
  Du_State,Du_Zip,Du_Phone,Du_Role,Du_Image,User_Enable,DU_User_Type)
{
    const fd: any = new FormData(); 
 
    const obj = {
      "Id":Du_Id,
      "F_Name": Du_First_Name,
   "L_Name": Du_Last_Name, 
   "Dealer_id": Du_Dealer_Id, 
   "Dealer_group_id": Du_Dealer_Group_Id,
   "Gender": Du_Gender,
   "JoinDate": this.datepipe.transform(Du_Date_Of_Joining,'MM/dd/yyyy'),    
   "Job_title": Du_Job_Title,
   "Dob": this.datepipe.transform(Du_date_Of_Birth,'MM/dd/yyyy'),     
   "Address1": Du_address1,                                                                                                                                                          
   "Address2": Du_address2,
   "login_id": Du_Login_Id, 
  "Password": "",
          "City":Du_City,
          "State":Du_State,
           "Zip": Du_Zip,
           "Phone": Du_Phone,
           "Role": Du_Role,
  "Image":Du_Image,
   "Status": "Y",
  "Userenable":User_Enable,
  "Usertype":DU_User_Type,
  "category": "",
  }

    fd.append('data', JSON.stringify(obj));
    console.log('Final Obj', obj);
    console.log('fdddddd', fd);
    this.apiSrvc.putmethod('dealeruser', fd).subscribe((response: any) => {
      console.log(response);
      if (response.status == 200) {
        this.alertify.success('User Status Updated Succesfully!');
        console.log(response);
        this.getDealerUsers();
        this.showgrid = true;
      }
      else{
        this.alertify.error(response.error);
      }
    });  

}

showAddpanel()
{
this.showgrid = false;
this.addClick = true;
this.rolesList();
this.getStates();
this.showAddIcon= false;
this.showSearchIcon = false;
}

showGridpanel()
{
  this.addClick=false;
  this.showgrid = true;
  this.addUserForm.reset();
  this.submitted = false;
  this.showAddIcon= true;
  this.showSearchIcon = true;
}

_keyPress(event: any) {
  const pattern = /[0-9+( )-]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (!pattern.test(inputChar)) {
    event.preventDefault();
  }
}

  // all(value: boolean) {
  //   this.allChecked = value;
  //   this.data = this.data.map(m => ({ ...m, checked: value }));
  // }


  onSearch() {
    this.alphaSrch = this.SearchDealerUsers.controls['txtSearch'].value;
    this.hide =true;
  }

}
