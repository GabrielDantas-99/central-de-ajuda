import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/Tecnico.model';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.scss']
})
export class TecnicoUpdateComponent implements OnInit {

  tecnico: Tecnico = {
    id:         '',
    nome:       '',
    cpf:        '',
    email:      '',
    senha:      '',
    perfis:     [],
    dataCriacao: ''
  }

  nome: FormControl  =  new FormControl(null, Validators.minLength(3));
  cpf: FormControl   =  new FormControl(null, Validators.required);
  email: FormControl =  new FormControl(null, Validators.email);
  senha: FormControl =  new FormControl(null, Validators.minLength(3));

  constructor(
    private tecnicoService: TecnicoService,
    private toast:   ToastrService,
    private router:  Router,
    private route:   ActivatedRoute,
    ) { }

  ngOnInit() {
    this.tecnico.id = this.route.snapshot.paramMap.get('id');
    console.log(this.tecnico.id);
    this.findById();
   }

  findById(): void {
    this.tecnicoService.findById(this.tecnico.id).subscribe(response => {
      console.log(response);
      response.perfis = [];
      this.tecnico = response;
    })
  }

  update(): void {
    this.tecnicoService.tecnicoUpdate(this.tecnico).subscribe(() => {
      this.toast.success('Técnico atualizado com sucesso', 'Update');
      this.router.navigate(['tecnicos'])
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
  }

  addPerfil(perfil: any): void {
    if(this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1);
    } else {
      this.tecnico.perfis.push(perfil);
    }
    
  }
  
  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid
     && this.email.valid && this.senha.valid
  }

}
