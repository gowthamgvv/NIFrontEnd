import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminServiceService } from '../../Core/_providers/admin-service/admin-service.service';
import { ApiService } from '../../Core/_providers/api-service/api.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router, ActivatedRoute } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { PswrdPopupComponent } from './../../Partials/profile/pswrd-popup/pswrd-popup.component';
import { MatDialog} from '@angular/material/dialog';
import {environment} from '../../../environments/environment';
import {AlertifyService} from '../../Core/_providers/alert-service/alertify.service';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public globalResponse: any = [];
 
  dshipForm: FormGroup;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  uploadedFileName: any;
  submitted = false;
  DuId: any;
  chkstatus: false;
  login:string;
  fname:string;
  lname:string;
  job:string;
  city:string;
  address1:string;
  address2:string;
 dealergender:string;
  phone:number;
  selecteimage=false;
  public dealerUsersArry: any = [];
  gender: Array<any> = [];
  public image: any = '';
  public proimg: any = '';
  public showimg = true;
  public showchangeimg = false;
  public selectedFile: any = null;
  public imageChangedEvent: any = '';
  rolesArray: any = [];
  jdate:any;
  now = new Date();
  dateofbirth:any;
  dateofjoining:any;
  croppedimage:any ='';
  updatedimage:any;
  fullUrl = `${environment.apiUrl}`; 
  dealershipcondition:boolean;

  imagebinding = 'resources/images/';
  roleid: any;
  dealershipNames: any;
  dealershipid: any;
  phoneFormat: any[] = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  
  constructor(private fB: FormBuilder,private adminService: AdminServiceService,private Api: ApiService, private router: Router,
    private SpinnerService: NgxSpinnerService, private route: ActivatedRoute, public dialog: MatDialog, private alertify: AlertifyService, ) {
    // this.route.queryParams.subscribe(params => {
    //   this.DuId = params.DuId;
    //   console.log(this.DuId);
    // });


    this.gender = [
 
     
      {"value":"F", "group": "Female"},
      {"value":"M", "group": "Male" },
     
    
     ]
    // this.jdate = new Date().toISOString().split('T')[0];
  }
  get f() { return this.dshipForm.controls; }
  ngOnInit() {
    this.DuId=localStorage.getItem('dealeruserid');
    this.roleid=localStorage.getItem('Roleid')
    this.bindGrid();
    this.rolesList();
   this.getstates();
   this.getAllDealerShips();
   this.getDealerNames();
   this.dshipForm = this.fB.group({
    FirstName: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]],
    LastName: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]],
    DateofJoining: [''],
    JobTitle: [''],
    Dob: [''],
    Address2: [''],
    Gender: ['', Validators.required],
    Address1: [''],
    loginId: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')]],
    Password: [''],
    City: [''],
    State: [''],
    Zip: [''],
    Phone: [''],
    fileUpload: [''],
    Role: ['', Validators.required],
    dealeruser: ['', Validators.required],
    dealershipuser:[''],

    // avatar: [null],
    // status: ['Y', Validators.required]
  });
//   this.today ='12/02/2001';
console.log(this.dealerUsersArry);
}
 
  imageLoaded(image: HTMLImageElement) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  imageCropped(event: ImageCroppedEvent) {
    this.proimg = event.base64;
    this.previewUrl = event.base64;
    const fileToUpload: File = new File([this.dataURItoBlob(this.previewUrl)], 'filename.png');
    this.selectedFile = fileToUpload;
    this.uploadedFileName = fileToUpload;
    console.log(this.uploadedFileName)
    this.showimg = false;
    this.showchangeimg = true;
  }
  dataURItoBlob(dataURI): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.selecteimage=true;
    this.image='';
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
  showAddPanel() {

    //this.getstates();
  //  this.getDealerNames();
  }
  Cancel() {

    this.dshipForm.reset();
    this.dshipForm.markAsUntouched();
    this.dshipForm.markAsPristine();
    this.router.navigate(['dashboard'])
  }

  getstates() {
    const obj={sg_id :0}
     this.adminService.postmethod('States/get',obj).subscribe((res: any) => {
   // this.Api.showRolesData(obj).subscribe((res: any) => {
      if (res.status === 200) {
       this.getstates=res.response;
       console.log(this.getstates)
      }
      else {
        //this.alertify.error(res.message);
      }
    });
  }
  
 
  bindGrid() {
    this.SpinnerService.show();
    let obj = {
      "id": this.DuId,
      "DealerId": "",
      "expression": ""
    }
    
    this.Api.postmethod('dealeruser/get', obj).subscribe(res => {
      if (res.status == 200) {
        this.globalResponse = res.response;
        this.dealerUsersArry = this.globalResponse[0];
   console.log(this.dealerUsersArry)
  this.login=this.dealerUsersArry.Du_Login_Id.replace(/\s/g,'');
  this.fname=this.dealerUsersArry.Du_First_Name.replace(/\s/g,'');
  this.lname=this.dealerUsersArry.Du_Last_Name.replace(/\s/g,'');
  this.city=this.dealerUsersArry.Du_City.replace(/\s/g,'');
  this.address1=this.dealerUsersArry.Du_address1;
  this.address2=this.dealerUsersArry.Du_address2;
  this.dealergender=this.dealerUsersArry.Du_Gender.replace(/\s/g,'');
 // this.phone=this.dealerUsersArry.Du_Phone.replace(/\s/g,'');
  this.job=this.dealerUsersArry.Du_Job_Title.replace(/\s/g,'');
  //this.today=this.dealerUsersArry.Du_date_Of_Birth.slice(11,1);
  this.dateofbirth=this.dealerUsersArry.Du_date_Of_Birth.slice(0,10);
  this.dateofjoining=this.dealerUsersArry.Du_Date_Of_Joining.slice(0,10);
  this.croppedimage=this.dealerUsersArry.Du_Image;
  this.image = this.fullUrl + this.imagebinding + this.croppedimage;
     
  this.dealershipid=this.dealerUsersArry.Du_Dealer_Id;
  this.SpinnerService.hide();
console.log(this.dealershipid)
if(this.dealershipid==0){
this.dealershipcondition=false
}
else{
this.dealershipcondition=true
}


      }
    });
  }

  rolesList() {
    const obj = {
      Role_Id: 0
    };
    this.Api.showRolesData(obj).subscribe((res: any) => {
      if (res.status === 200) {
        const roles = res.response;
        if (roles) {
          let array: any[] = res.response;
          const res1 = array.filter((f) => f.Role_Front === 'Y');
          this.rolesArray = res1;
        }
      }
      else {
        //this.alertify.error(res.message);
      }
    });
  }
  
  dealerNames: any = [];
  getDealerNames() {
    const dealergroupObj = {
      "dealergroupid": 0,
      "expression": "dg_status = 'Y'"
    };

    this.Api.GetDealershipGroupsData(dealergroupObj).subscribe((resp: any) => {
      console.log('Get groups Resp', resp);
      if (resp.status == 200) {
        this.dealerNames = JSON.parse(resp.response[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']);
        // console.log('DealerGroups', this.dealerNames);
      }
    });
  }
  getAllDealerShips(){
    const obj ={
      "DealerShipId": 0,
      "expression": ""
    }
    this.Api.postmethod('dealerships/alldealerships',obj).subscribe(res=>{
      console.log(res);
     if(res.status==200){
      this.dealershipNames=res.response;
      console.log(this.dealershipNames);
          }
  });
      this.SpinnerService.hide();
  }
  
  removeimg() {
    console.log( this.uploadedFileName);
    this.previewUrl = '';
    this.selecteimage=false;
    this.proimg='';
  }
//   onSubmit() {
//     console.log('hello');
//     this.submitted = true;
//     if (this.dshipForm.invalid) {
//       console.log('hello203');
//       console.log(this.dshipForm.value)
//       return;
     
//     }
    
//     const obj = {
//       Id: this.DuId,
//       F_Name: this.dshipForm.value.FirstName,
//       L_Name: this.dshipForm.value.LastName,
//       Dealer_id: this.dshipForm.value.dealeruser,
//       Gender: this.dshipForm.value.Gender,
//       JoinDate: this.dshipForm.value.DateofJoining,
//       Job_title: this.dshipForm.value.JobTitle,
//       Dob: this.dshipForm.value.Dob,
//       Address1: this.dshipForm.value.Address1,
//       Address2: this.dshipForm.value.Address2,
//       login_id: this.dshipForm.value.loginId,
//       Password: this.dshipForm.value.Password,
//       City: this.dshipForm.value.City,
//       State: this.dshipForm.value.State,
//       Zip: this.dshipForm.value.Zip,
//       Phone: this.dshipForm.value.Phone,
//       Role: this.dshipForm.value.Role,
//       Status: 'Y'

//     }
//     const fd: any = new FormData();

//       // if (this.croppedimage== null || this.croppedimage == '') {
//       // console.log('this.uploadedFileName',this.croppedimage);
//       // fd.append('file', this.uploadedFileName);
//       // console.log(this.uploadedFileName);
//       // } else {
//       // console.log(this.croppedimage)
//       // fd.append('file', this.croppedimage);
//       // }
//       if(this.uploadedFileName!=null){
//         console.log(this.uploadedFileName)
//       fd.append('file', this.uploadedFileName);
//       }
//       else{
//         fd.append('file', this.croppedimage);
//       console.log(this.croppedimage);
//       }
//     fd.append('data', JSON.stringify(obj));
    
//     console.log(this.croppedimage)
//  //   fd.append('file', this.dealerUsersArry.Du_Image);
//  //   fd.append('file', '');
//     console.log('Final Obj', obj);
//     const options = { content: fd };
//     this.adminService.Putmethod('dealeruser', fd).subscribe((response: any) => {
//       console.log(response);
//       if (response.status == 200) {
//         alert("Record updated successfully");
//         console.log(response);
//         this.dshipForm.reset();
//         this.dshipForm.markAsUntouched();
//         this.dshipForm.markAsPristine();
// this.image='';
// this.router.navigate(['dashboard']);
//         // this.router.navigate(['DealershipList']); 
//       }
//     },
//       (error) => {
//         console.log('error', error);
//       });


//      }
onSubmit() {
  console.log('hello');
  this.submitted = true;
  if (this.dshipForm.invalid) {
    console.log('hello203');
    console.log(this.dshipForm.value)
    return;
   
  }
  

  const fd: any = new FormData();

    if(this.uploadedFileName!=null){
      console.log(this.uploadedFileName)
      this.updatedimage=null   
      fd.append('file', this.uploadedFileName);
    }
    else{
      this.updatedimage=this.croppedimage;
      console.log(this.updatedimage)
      fd.append('file', null);
    console.log(this.croppedimage);
   
    }
    const obj = {
      Id: this.DuId,
      F_Name: this.dshipForm.value.FirstName,
      L_Name: this.dshipForm.value.LastName,
      Dealer_id:this.dealerUsersArry.Du_Dealer_Id,
      Dealer_group_id: this.dealerUsersArry.Du_Dealer_Group_Id,

      Gender: this.dshipForm.value.Gender,
      JoinDate: this.dshipForm.value.DateofJoining,
      Job_title: this.dshipForm.value.JobTitle,
      Dob: this.dshipForm.value.Dob,
      Address1: this.dshipForm.value.Address1,
      Address2: this.dshipForm.value.Address2,
      login_id: this.dshipForm.value.loginId,
      Password: this.dealerUsersArry.Du_password,
      City: this.dshipForm.value.City,
      State: this.dshipForm.value.State,
      Zip: this.dshipForm.value.Zip,
      Phone: this.dshipForm.value.Phone,
      Role: this.dshipForm.value.Role,
      Image:this.updatedimage,
      Status: 'Y',
      Userenable: 'N'


    }
    console.log(obj)
  fd.append('data', JSON.stringify(obj));
  
  console.log(this.croppedimage)

  console.log('Final Obj', obj);
  const options = { content: fd };
  this.adminService.Putmethod('dealeruser', fd).subscribe((response: any) => {
    console.log(response);
    if (response.status == 200) {
      this.alertify.success('Dealeruser Updated Successfully');
      console.log(response);
      this.dshipForm.reset();
      this.dshipForm.markAsUntouched();
      this.dshipForm.markAsPristine();
this.image='';
this.router.navigate(['dashboard']);
    }
  },
    (error) => {
      console.log('error', error);
      this.alertify.error(error);

    });


   }

     openDialog(): void {
      const dialogRef = this.dialog.open(PswrdPopupComponent, {
        width: '300px',
        data: {}
      });

    }
  }


