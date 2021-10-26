import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../Core/_providers/api-service/api.service';
import { usersPwdModel } from '../../../Core/_models/user';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from '../../../Core/_providers/alert-service/alertify.service';



import {
  ReactiveFormsModule,
  FormBuilder,
  AbstractControl,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ValidatorService } from '../../../Core/_providers/validator-service/validator.service';


@Component({
  selector: 'app-pswrd-popup',
  templateUrl: './pswrd-popup.component.html',
  styleUrls: ['./pswrd-popup.component.scss']
})
export class PswrdPopupComponent implements OnInit {

  updatePasswordForm: FormGroup;
  Old_pswrd: FormControl;
  New_pswrd: FormControl;
  cnewPassword: FormControl;
  Dealer_Id: any;
  submitted = false;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<PswrdPopupComponent>,
    private validatorService: ValidatorService,
    private userSrvc: ApiService,
    private alertify: AlertifyService
  ) {
    // this.route.queryParams.subscribe(params => {
    //   this.Dealer_Id = params.DuId;
    //   console.log(this.Dealer_Id);
    // });

  }

  ngOnInit(): void {
    this.Dealer_Id=localStorage.getItem('dealeruserid');

    this.Old_pswrd = new FormControl('', [Validators.required]);
    this.New_pswrd = new FormControl('', [
      Validators.required,
      Validators.maxLength(15),
      Validators.minLength(4),
      // this.validatorService.MustMatch(this.cnewPassword),
    ]);
    this.cnewPassword = new FormControl('', [
      Validators.required,
      this.validatorService.MustMatch(this.New_pswrd),
    ]);

    this.updatePasswordForm = this.fb.group({
      Old_pswrd: this.Old_pswrd,
      New_pswrd: this.New_pswrd,
      cnewPassword: this.cnewPassword,
    });
  }



  onSubmit(): any {
    console.log("hi")
    {
      this.submitted = true;
      if (this.updatePasswordForm.invalid) {
        return;
      }
    }

    const PwdUpdate = new usersPwdModel(
      this.Dealer_Id,
      this.updatePasswordForm.controls.Old_pswrd.value,
      this.updatePasswordForm.controls.New_pswrd.value,

    );
console.log(PwdUpdate)
    this.userSrvc.updateDealerUserPwd(PwdUpdate).subscribe((res: any) => {
      console.log('res', res);
      if (res.status === 200) {
        this.alertify.success('Password Change Successfully');
        this.dialogRef.close();


      }
      else {
        this.alertify.error('Please check the details');
      }
    });
  }


  closeDialog(): void {
    this.dialogRef.close();
  }
}
