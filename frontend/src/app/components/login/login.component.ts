import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Credenciais } from 'src/app/models/Credenciais.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
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
    this.toast.success('Login efetuado com sucesso!');
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
