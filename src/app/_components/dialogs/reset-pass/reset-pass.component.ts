import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ComparePassword, CustomValidators } from 'src/app/custom-validators';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent implements OnInit {

  
  currentUser;
  password:any;
  profile: any;
  invalidPass:any;
  resetPassForm:FormGroup;
  submitted = false;
  loading: boolean;

  success = '';
  

  constructor(

    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder
    
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
   }

  ngOnInit(): void {
    this.resetPassForm = this.formBuilder.group({
      password: ['', [Validators.required,Validators.minLength(8), Validators.maxLength(20)]],  
      confirmPassword: ['', [Validators.required,Validators.minLength(8), Validators.maxLength(20)]]
    }, { validators: [CustomValidators.mustMatch('password', 'confirmPassword')] })
  }

  get f() { return this.resetPassForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.resetPassForm.invalid){
      return;
    }

    const params = {
      password: this.f['password'].value
    };

    this.http.put(environment.apiUrl + 'profile', params)
        .subscribe((response: any) => {
          console.log(response);
          this.profile = response;

          this.loading = false;
        }, (error) => {
          this.loading = false;
        });
  }
  
}
