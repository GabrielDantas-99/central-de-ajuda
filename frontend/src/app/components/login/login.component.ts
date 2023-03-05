import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Credenciais } from 'src/app/models/Credenciais.model';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastrService
  ) { }

  spans: string[] = [];
  
  credenciais: Credenciais = {
    email: '',
    senha: ''
  }
  
  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));
  
  ngOnInit(): void {
    this.bgCreate();
  }

  login() {
    this.authService.authenticate(this.credenciais).subscribe(response => {
      this.authService.successfulLogin(response.headers.get('Authorization').substring(7));
      this.router.navigate(['']);
    }, () => {
      this.toast.error('Usuário e/ou senha inválidos!');
    });
  }

  validationFields(): boolean {
    return this.email.valid && this.senha.valid;
  }

  bgCreate(): void {
    for (let i = 0; i < 220; i++) {
      this.spans.push('span');
    }
  }

}
