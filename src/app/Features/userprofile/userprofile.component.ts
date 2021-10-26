import { Component, Renderer2, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../Core/_providers/api-service/api.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../../Core/_providers/alert-service/alertify.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { environment } from '../../../environments/environment';
import { Item } from 'angular2-multiselect-dropdown';
import { MatDialog} from '@angular/material/dialog';
import { PswrdPopupComponent } from './../../Partials/profile/pswrd-popup/pswrd-popup.component';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

  userProfileForm: FormGroup;
  submitted = false;
  phoneFormat: any[] = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  states: any = [];
  getLoggedInUserID: any;
  dealerUsersArry: any = [];
  EditableLogo: any;
  previewUrl: any = null;
  fileData: File = null;
  uploadedFileName: any;
  getRole: any;
  getFname: any;
  getLname: any;
  rolesArray: any = [];
  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper: any = false;
  showMailText: boolean = true;
  addMailBox: boolean = false;
  showPhoneText: boolean = true;
  addPhone: boolean= false;
  emails: any = [];
  phoneNumbers: any = [];
  newEmailsString: any;
  newPhoneNumbersString: any;
  getEmailsString:any;
  getEmailsArray: any = [];
  getPhoneString: any;
  getPhoneArray: any = [];
  dealershipArray: any = [];
  getDealershipNames: any = [];
  ifNoStores: any ;
  allChecked: boolean = true;
  getDids: any =[];

  constructor(private fB: FormBuilder,
    private apiSrvc: ApiService,
    private router: Router,
    private datepipe: DatePipe,
    private alertify: AlertifyService,
    public dialog: MatDialog) { 

      this.userProfileForm = this.fB.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        title: ['', Validators.required],
        email: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')]],
        password: ['', Validators.required],
        phone: ['', Validators.required],
      //  state: ['', Validators.required],
        role: ['', Validators.required],
        email2: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')]],
        phone2: ['', Validators.required],
      });

      this.getStates();
      this.bindProfileData();
      this.getAllDealerShips();
    }

  ngOnInit(): void 
  {
    this.getLoggedInUserID = localStorage.getItem('dealeruserid');
    this.getStates();
    this.bindProfileData();
    this.getAllDealerShips();
  }

  // (change)="checkStores($event)"
  // checkStores(event)
  // {
  //   var index = this.getDids.indexOf(event.target.value);
  //   console.log(event.target.value);
  //   if(event.target.checked)
  //   {
  //     this.getDids.push(event.target.value);
  //   }
  //   else{
  //     this.getDids.splice(index, 1)
  //   }
  // }

  getDimensionsByFind(id) {
    return this.dealershipArray.find((x) => x.dealer_id == id);
  }


  bindProfileData() 
  {
    let obj = {
      "id": localStorage.getItem('dealeruserid'),
      "DealerId": "",
      "expression": ""
    }
    
    this.apiSrvc.postmethod('dealeruser/get', obj).subscribe(res => {
      if (res.status == 200) 
      {
        this.dealerUsersArry = res.response[0];
        console.log(this.dealerUsersArry);
        this.getDids =res.response[0].DU_Dealerships.split(',');
        this.getRole = res.response[0].Role_Name;
        this.getFname = res.response[0].Du_First_Name;
        this.getLname = res.response[0].Du_Last_Name;
        this.EditableLogo = res.response[0].Du_Image;
        this.previewUrl = `${environment.apiUrl}`+'/resources/images/' + res.response[0].Du_Image;
        this.getEmailsString = res.response[0].Du_Login_Id,
        this.getEmailsArray = this.getEmailsString.split(',');
        this.getPhoneString = res.response[0].Du_Phone,
        this.getPhoneArray = this.getPhoneString.split(',');
        if(this.getPhoneArray.length > 1)
        {
          this.addPhone = true;
        }
        if(this.getEmailsArray.length > 1)
        {
          this.addMailBox = true;
        }
        if(res.response[0].DU_Dealerships !=null)
        {
          this.getDealershipNames = [];
          let result= res.response[0].DU_Dealerships.split(',');
          console.log('result', result);
          for(let y in result){
            let dshipItem = this.getDimensionsByFind(result[y]);
            console.log('item', dshipItem)
            this.getDealershipNames.push({
              dealershipName: dshipItem.dealer_name,
              dealerid: dshipItem.dealer_id
            });
            console.log('dealershipnames', this.getDealershipNames)
          }  
        }
        if(res.response[0].DU_Dealerships ==null)
        {
          this.ifNoStores = 'Not Available';
        }
        this.userProfileForm=this.fB.group({​​​​​​​​
          firstname: [res.response[0].Du_First_Name,[Validators.required, Validators.maxLength(50)]],
          lastname :[ res.response[0].Du_Last_Name,[Validators.required, Validators.maxLength(10)]],
          title :[res.response[0].Du_Job_Title,[Validators.required, Validators.maxLength(10)]],
          //email :[res.response[0].Du_Login_Id,[Validators.required, Validators.maxLength(10)]],
          email :this.getEmailsArray[0],
          email2:this.getEmailsArray[1],
          password :[res.response[0].Du_password,[Validators.required, Validators.maxLength(10)]],
          phone :this.getPhoneArray[0],
          phone2:this.getPhoneArray[1],
         // state :[res.response[0].Du_State,[Validators.required, Validators.maxLength(10)]],
          avatar: [null],
          fileUpload: ['',Validators.required],
                }​​​​​​​​);

      }
    });
  }


  public processFile(fileInput: any): void {
    //this.imageChangedEvent = fileInput;
   // this.showCropper = true;
    this.fileData = <File>fileInput.target.files[0];
    this.uploadedFileName = <File>fileInput.target.files[0].name;
    console.log('file upload', this.uploadedFileName);
    const file = (fileInput.target as HTMLInputElement).files[0];
    this.userProfileForm.patchValue({
      avatar: file
    });

    this.userProfileForm.get('avatar').updateValueAndValidity();
    this.preview();
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.previewUrl = this.croppedImage;
}
imageLoaded() {
    // show cropper
}
cropperReady() {
    // cropper ready
}
loadImageFailed() {
    // show message
}
removeimg() {
  console.log( this.uploadedFileName);
  this.previewUrl = '';
  this.showCropper=false;
}

  public preview(): void {
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

  getAllDealerShips(){
    const obj ={
      "DealerShipId": 0,
      "expression": ""
    }
    this.apiSrvc.postmethod('dealerships/alldealerships',obj).subscribe(res=>{
     if(res.status==200)
     {
      this.dealershipArray=res.response;
     }
  });
  }

  addEmail()
  {
    this.addMailBox = true;
    this.showMailText = false; 
    this.userProfileForm.controls['email2'].enable();
  }
  addPhoneNum()
  {
    this.showPhoneText = false;
    this.addPhone = true;
    this.userProfileForm.controls['phone2'].enable();
  }
  cancelEmail()
  {
    this.addMailBox = false;
    this.showMailText = true; 
    this.userProfileForm.controls['email2'].disable();
    this.emails.splice(1);
  }
  cancelPhone()
  {
    this.showPhoneText = true;
    this.addPhone = false; 
    this.userProfileForm.controls['phone2'].enable();
    this.phoneNumbers.splice(1);
  }

  updateProfile()
  {
    this.emails = [];
    this.phoneNumbers = [];
    if(this.addMailBox == true)
    {
      this.userProfileForm.controls['email2'].enable();
      if(this.userProfileForm.value.email2 != "")
      {
        this.emails.push(this.userProfileForm.value.email2);
      }
      else
      {      
        this.userProfileForm.controls['email2'].disable();
      }
    }
    if(this.addPhone == true)
    {
      this.userProfileForm.controls['phone2'].enable();
      if(this.userProfileForm.value.phone2 != "")
      {
        this.phoneNumbers.push(this.userProfileForm.value.phone2);
      }
      else
      {      
        this.userProfileForm.controls['phone2'].disable();
      }
    }

    if(this.userProfileForm.value.email != "")
    {
      this.emails.push(this.userProfileForm.value.email);
    }

    this.newEmailsString = this.emails.toString();

    if(this.userProfileForm.value.phone != "")
    {
      this.phoneNumbers.push(this.userProfileForm.value.phone);
    }
    this.newPhoneNumbersString = this.phoneNumbers.toString();
    // this.submitted = true;
    // if (this.userProfileForm.invalid) {
    //   this.alertify.error('Please fill in the required fields')
    //   return;
    // }
    const fd: any = new FormData();
    const profUpdate = {
      "Id":localStorage.getItem('dealeruserid'),
      "F_Name": this.userProfileForm.value.firstname,
      "L_Name": this.userProfileForm.value.lastname, 
      "Dealer_id": this.dealerUsersArry.Du_Dealer_Id, 
      "Dealer_group_id": this.dealerUsersArry.Du_Dealer_Group_Id,
      "Gender": this.dealerUsersArry.Du_Gender,
      "JoinDate": this.datepipe.transform(this.dealerUsersArry.Du_Date_Of_Joining,'MM/dd/yyyy'),    
      "Job_title": this.userProfileForm.value.title,
      "Dob": this.datepipe.transform(this.dealerUsersArry.Du_date_Of_Birth,'MM/dd/yyyy'),     
      "Address1": this.dealerUsersArry.Du_address1,                                                                                                                                                          
      "Address2": this.dealerUsersArry.Du_address2,
      "login_id": this.newEmailsString, 
      "Password": "",
      "City":this.dealerUsersArry.Du_City,
      "State":this.dealerUsersArry.Du_State,
      "Zip": this.dealerUsersArry.Du_Zip,
      "Phone": this.newPhoneNumbersString,
      "Role": this.dealerUsersArry.Du_Role,
      "Image":this.EditableLogo,
      "Status": this.dealerUsersArry.Du_Status,
      "Userenable":this.dealerUsersArry.User_Enable,
      "Usertype":this.dealerUsersArry.DU_User_Type,
      "category": "",
     // UniqueId: ""
    };
    fd.append('data', JSON.stringify(profUpdate));
    if (this.uploadedFileName != '' && this.uploadedFileName != undefined)
      {
        fd.append('file', this.fileData);
      }
    else
    {
      fd.append('file', this.EditableLogo);
    }     
    console.log('finalobj', profUpdate);
    this.apiSrvc.putmethod('dealeruser', fd).subscribe((resp: any) => {
      if (resp.status == 200) {
        this.alertify.success('Profile updated successfully');
        this.router.navigate(['/dashboard']);
      }
      else {
        this.alertify.error('Please check the details');
      }
    },
      (error) => {
        console.log(error);
      });

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PswrdPopupComponent, {
      width: '300px',
      data: {}
    });
  }

  LogOut() {
    localStorage.removeItem('NetImpFrtEND_Token');
    // this.router.navigate(['Login']);
    this.router.navigateByUrl('login');
    this.alertify.success('Logged Out Successfully');
  }

  OnCancel(){
    this.router.navigate(['/dashboard']);
  }

  getStates() {
    const obj={sg_id :0}
     this.apiSrvc.postmethod('States/get',obj).subscribe((res: any) => {
      if (res.status === 200) {
       this.states=res.response;
      }
    });
  }

  _keyPress(event: any) {
    const pattern = /[0-9+( )-]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


}
