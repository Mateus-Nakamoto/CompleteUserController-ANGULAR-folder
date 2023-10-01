import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ControleUsuario } from '../shared/controle-usuario.model';
import { ControleUsuarioService } from '../shared/controle-usuario.service';

@Component({
  selector: 'app-controle-usuario',
  templateUrl: './controle-usuario.component.html',
  styles: [
  ]
})
export class ControleUsuarioComponent implements OnInit {

  constructor(public service: ControleUsuarioService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord: ControleUsuario) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?'))
      this.service.deleteControleUsuario(id)
        .subscribe({
          next: res => {
            this.service.list = res as ControleUsuario[]
            this.toastr.error('Usuário Deletado', 'Deletado com Sucesso!')
          },
          error: err => { console.log(err) }
        })
  }

}
