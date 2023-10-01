import { Component } from '@angular/core';
import { ControleUsuarioService } from 'src/app/shared/controle-usuario.service';
import { NgForm } from "@angular/forms";
import { ControleUsuario } from 'src/app/shared/controle-usuario.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-controle-usuario-form',
  templateUrl: './controle-usuario-form.component.html',
  styles: [
  ]
})
export class ControleUsuarioFormComponent {

  constructor(public service: ControleUsuarioService, private toastr: ToastrService) {
  }

  onSubmit(form: NgForm) {
    this.service.formSubmitted = true
    if (form.valid) {
      if (this.service.formData.pessoaID == 0)
        this.insertRecord(form)
      else
        this.updateRecord(form)
    }

  }

  insertRecord(form: NgForm) {
    this.service.postControleUsuario()
      .subscribe({
        next: res => {
          this.service.list = res as ControleUsuario[]
          this.service.resetForm(form)
          this.toastr.success('Usuário Cadastrado!', 'Cadastrado com sucesso')
        },
        error: err => { console.log(err) }
      })
  }
  updateRecord(form: NgForm) {
    this.service.putControleUsuario()
      .subscribe({
        next: res => {
          this.service.list = res as ControleUsuario[]
          this.service.resetForm(form)
          this.toastr.info('Usuário Atualizado', 'Atualizado com sucesso!')
        },
        error: err => { console.log(err) }
      })
   }

}
