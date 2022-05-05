import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RestApiService } from "../shared/rest-api.service";
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService : AuthenticationService,
    private toastr: ToastrService,
    public restApi: RestApiService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    var curUser = sessionStorage.getItem('currentUser');
    if(curUser){
      this.router.navigate(['/home'])
    }
  }


    // for accessing to form fields
    get fval() { return this.loginForm.controls; }

  onFormSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
     this.restApi.login(this.fval.email.value, this.fval.password.value)
        .subscribe(
            data => {
              var mail = data["email"];
              var uid = data["id"];
              console.log("email is +"+mail+ " and id is "+uid);
    
              if((this.fval.email.value == mail) && mail != ('undefined' && ''))
              {
              sessionStorage.setItem('currentUser', mail);
              this.router.navigate(['/home'])
              } else {
                this.router.navigate(['/login'])
                window.location.reload()
              }
            },
            error => {
              this.toastr.error(error.error.message, 'User name or password is ');
                this.loading = false;
            });
  }
}
