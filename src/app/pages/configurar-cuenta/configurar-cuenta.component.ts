import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResetPassComponent } from 'src/app/_components/dialogs/reset-pass/reset-pass.component';
import { AuthenticationService } from "../../_services/authentication.service";
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-configurar-cuenta',
  templateUrl: './configurar-cuenta.component.html',
  styleUrls: ['./configurar-cuenta.component.scss']
})

export class ConfigurarCuentaComponent implements OnInit {

  datosForm:FormGroup;
  billingForm:FormGroup;
  planForm: FormGroup;
  fileBanner:FormGroup;
  profile:any;
  submittedData = false;
  submittedBilling = false;
  submittedPlan = false;
  loadingData = false;
  loadingBilling = false;
  loadingPlan = false;
  error: any;
  title = 'Cargando';
  isLoading: Observable<boolean>;
  imageFile: {link: string, file: any, name: string};
  isChecked: boolean;
  checkValue:any;

  
  constructor(
      public dialog: MatDialog,
      private router: Router,
      private formBuilder: FormBuilder,
      private authenticationService: AuthenticationService,
      private http: HttpClient,

  ) {}
  

  ngOnInit(): void {
    this.datosForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', Validators.required]
    })


    this.billingForm = this.formBuilder.group({
        billing_id:['', Validators.required],
        billing_name:['', Validators.required]
      })
    // })

    this.planForm = this.formBuilder.group({
        plan_key:['', Validators.required],
        plan_basic:['', []],
        plan_pro:['', []]
      })

    this.http.get(environment.apiUrl + 'profile')
        .subscribe((response: any) => {
          console.log(response);
          this.profile = response;
          this.setProfile();
        })
  }

  setProfile() {
    this.authenticationService.setUser(this.profile);

    this.f['name'].setValue(this.profile.name);
    this.f['email'].setValue(this.profile.email);
    this.t['billing_name'].setValue(this.profile.company.payment_board.billing_name);
    this.t['billing_id'].setValue(this.profile.company.payment_board.billing_id);
    this.onCheckboxChange({ checked: true }, this.profile.company.payment_board.plan_key);
  }

  get f() { return this.datosForm.controls; }
  get t() { return this.billingForm.controls; }
  get p() { return this.planForm.controls; }

  //Submit de Datos 

  onDataSubmit() {
    if (this.loadingData) { return; }
    this.submittedData = true;

    // stop here if form is invalid
    if (this.datosForm.invalid) {
      console.log('Form invalid');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.f['name'].value);
    formData.append('email', this.f['email'].value);
    
    console.log((formData));

    if (this.imageFile) { formData.append('company_logo', this.imageFile.file); }

    this.loadingData = true;
    this.http.put(environment.apiUrl + 'profile', formData)
        .subscribe((response: any) => {
          console.log(response);
          this.profile = response;
          this.setProfile();

          this.loadingData = false;
        }, (error) => {
          this.loadingData = false;
        });

  }
  //Submit de Facturación 

  onBillingSubmit(){
    
    if (this.loadingBilling) { return; }
    this.submittedBilling = true;

    if (this.billingForm.invalid) {
      console.log('Form invalid');
      return;
    }

    const formBilling = new FormData();
    formBilling.append("company_billing_name", this.t["billing_name"].value);
    formBilling.append("company_billing_id", this.t["billing_id"].value);

    console.log((formBilling));

    this.loadingBilling = true;
    this.http.put(environment.apiUrl + 'profile', formBilling)
        .subscribe((response: any) => {
          console.log(response);
          this.profile = response;
          this.setProfile();

          this.loadingBilling = false;
        }, (error) => {
          this.loadingBilling = false;
        });

  }

  onPlanSubmit(){
    if (this.loadingPlan) { return; }
    this.submittedPlan = true;

    if (this.planForm.invalid) {
      console.log('Form invalid');
      return;
    }

    const formPlan = new FormData();

    this.loadingPlan = true;

    this.http.put(environment.apiUrl + 'profile', formPlan)
        .subscribe((response: any) => {
          console.log(response);
          this.profile = response;
          this.setProfile();

          this.loadingPlan = false;
        }, (error) => {
          this.loadingPlan = false;
        });
  }


  onCheckboxChange(e: any, inputKey: string){
    switch(inputKey) {
      case 'basic':
        if (e.checked) {
          this.p['plan_key'].setValue(inputKey);
        } else {
          this.p['plan_key'].setValue('pro');
        }
        break;
      case 'pro':
        if (e.checked) {
          this.p['plan_key'].setValue(inputKey);
        } else {
          this.p['plan_key'].setValue('basic');
        }
        break;
    }

    switch(this.p['plan_key'].value) {
      case ('basic'):
        this.p['plan_basic'].setValue(true);
        this.p['plan_pro'].setValue(false);
        break;
      case ('pro'):
        this.p['plan_basic'].setValue(false);
        this.p['plan_pro'].setValue(true);
        break;
    }
    console.log(this.p['plan_key'].value);
  
  }
  

  imagesPreview(event:any) {
    if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();

        reader.onload = (_event: any) => {
            this.imageFile = {
                link: _event.target.result,
                file: event.srcElement.files[0],
                name: event.srcElement.files[0].name
            };
        };
        reader.readAsDataURL(event.target.files[0]);
    }
}
  save(): void {
    const formData = new FormData();
    formData.append('myImageToSend', this.imageFile.file);
    formData.append('title', 'Set your title name here');
    formData.append('description', 'Set your title description here');
    
  }

  openDialog() {
    const dialogRef = this.dialog.open(ResetPassComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigateByUrl('login');
  }
}
