import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signUpForm!: FormGroup;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ) { 
    this.signUpForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl("", [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
    this.loginService.login(this.signUpForm.value.email, this.signUpForm.value.password).subscribe({
      next: () => this.toastService.success("Login efetuado!"),
      error: () => this.toastService.error("Ocorreu um erro ao efetuar o login")
    })
  }
  navigate() {
    this.router.navigate(["/login"]);
  }
}
