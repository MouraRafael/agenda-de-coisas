import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginFormGroup!:FormGroup

  @ViewChild('loginFormGroupDirective') loginFormGroupDirective!:FormGroupDirective


  constructor(
    private router:Router
  ) { }

  ngOnInit() {
    this.loginFormGroup = new FormGroup({
      'email': new FormControl('',[Validators.required]),
      'senha': new FormControl('',[Validators.required])
    })
  }

  login(){}



  cadastre(){
    this.router.navigateByUrl('registro')
  }
}
