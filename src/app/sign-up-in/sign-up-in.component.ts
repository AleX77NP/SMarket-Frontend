import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {UsersService} from '../services/users.service'
import { User } from '../models/user';
import { Customer } from '../models/customer';
import { Router } from '@angular/router';
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
//import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-sign-up-in',
  templateUrl: './sign-up-in.component.html',
  styleUrls: ['./sign-up-in.component.css']
})
export class SignUpInComponent implements OnInit {

  eye = faEye;
  rHidden = true;
  eyeS = faEyeSlash
  hideR = true;
  hideL = true;
  fHide = true;
  signupForm : FormGroup;
  loginForm : FormGroup;
  resetForm: FormGroup;
  submitted = false;
  loginTry = false;
  loading = false;
  loginLoad = false;
  newUser: User = null;
  oldCustomer: Customer = null;

  constructor(private fb: FormBuilder, private us: UsersService, protected router:Router) { }

  ngOnInit(): void {
    this.createSignupForm();
    this.createLoginForm();
    this.createResetForm();
  }

  get scs() {
    return this.signupForm.controls;
  }

  get logInfo() {
    return this.loginForm.controls;
  }
  get rs() {
    return this.resetForm.controls;
  }

  createSignupForm() {
     this.signupForm = this.fb.group({
       name: ['', Validators.required],
       surname: ['', Validators.required],
       email: ['', Validators.required],
       password: ['', Validators.required],
       address: ['', Validators.required],
       phoneNum: ['', Validators.required]
     })
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      emailU: ['', Validators.required],
      passwordU: ['', Validators.required]
    })
  }

  createResetForm() {
    this.resetForm = this.fb.group({
      emailR: ['',Validators.required],
      newPass: ['', Validators.required],
      codeR: ['', Validators.required]
    })
  }

  onSubmit() {
     this.submitted=true;
     if(this.signupForm.invalid) {
       return;
     }
     this.loading=true;
     this.newUser = new User(this.scs.email.value,this.scs.password.value,this.scs.name.value,this.scs.surname.value,
     this.scs.address.value ,this.scs.phoneNum.value,0);
     this.us.register(this.newUser)
     .subscribe((user: User) => {console.log(JSON.stringify(user))
      let auth = {
        email: user.email,
        admin: user.admin
      };
    //  let token = CryptoJS.AES.encrypt(auth.email,'2608981412').toString();
     // let codeA = auth.admin;
      
      //  console.log(token);
       // let authToken = CryptoJS.AES.decrypt(token,'2608981412').toString(CryptoJS.enc.Utf8);
        //console.log(authToken);
      sessionStorage.setItem('user',auth.email);
      sessionStorage.setItem('codeA',JSON.stringify(auth.admin));
      this.router.navigate(['/']);
    },err => console.log(JSON.stringify(err)))
     this.loading=false;
  }

  onLogin() {
    this.loginTry=true;
    if(this.loginForm.invalid) {
      return;
    }
    this.loginLoad=true;
    this.oldCustomer = new Customer(this.logInfo.emailU.value,this.logInfo.passwordU.value);
    this.us.login(this.oldCustomer).subscribe((data:any) =>  {console.log(JSON.stringify(data))
      //  let token = CryptoJS.AES.encrypt(data.email,'2608981412').toString();
      //  let codeA = data.admin;
      //  console.log(token);
       // let authToken = CryptoJS.AES.decrypt(token,'2608981412').toString(CryptoJS.enc.Utf8);
        //console.log(authToken);
        sessionStorage.setItem('user',data.email);
        sessionStorage.setItem('codeA',JSON.stringify(data.admin));
      //  sessionStorage.setItem('admin',JSON.stringify(data.admin))
        this.router.navigate(['/']);
    },
    err => console.log(JSON.stringify(err)));
    this.loginLoad = false;
  }

  toggleR() {
    this.hideR = !this.hideR;
  }

  toggleL() {
    this.hideL = !this.hideL;
  }

  toggleF() {
    this.fHide = !this.fHide;
  }

  resetRequest() {
    if(this.logInfo.emailU.value == "") {
      alert("Molimo Vas da unesete e-mail adresu");
    }
    else {
    this.rHidden = false;
    this.resetForm.patchValue({
      emailR: this.logInfo.emailU.value
    })
    let email = this.rs.emailR.value;
    this.us.tryReset(email).subscribe(res => {
      console.log(res);
      alert("Proverite mejl, poslali smo Vam kod za resetovanje lozinke.");
    }), err => {
      console.log(err);
      alert("Proverite unetu e-mail adresu.")
    }
   }
  }

  changePass() {
    if(this.resetForm.invalid) {
      alert("Forma nije validna");
      return;
    }
    let data = {
      email: this.rs.emailR.value,
      password: this.rs.newPass.value,
      resetCode: this.rs.codeR.value
    };
    this.us.changePassword(data).subscribe(res => {
      console.log(res);
      alert("Promenili ste lozinku!");
    }),
    err => {
      console.log(err);
      alert("Proverite unete podatke")
    }
  }
}
