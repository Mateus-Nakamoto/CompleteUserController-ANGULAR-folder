import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { ControleUsuario } from './controle-usuario.model';
import { NgForm } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ControleUsuarioService {

  url: string = environment.apiBaseUrl + '/ControleUsuario'
  list: ControleUsuario[] = [];
  formData: ControleUsuario = new ControleUsuario()
  formSubmitted: boolean = false;
  constructor(private http: HttpClient) { }

  refreshList() {
    this.http.get(this.url)
      .subscribe({
        next: res => {
          this.list = res as ControleUsuario[]
        },
        error: err => { console.log(err) }
      })
  }

  postControleUsuario() { 
    return this.http.post(this.url, this.formData)
  }

  putControleUsuario() {
    return this.http.put(this.url + '/' + this.formData.pessoaID, this.formData)
  }


  deleteControleUsuario(id: number) {
    return this.http.delete(this.url + '/' + id)
  }


  resetForm(form: NgForm) {
    form.form.reset()
    this.formData = new ControleUsuario()
    this.formSubmitted = false
  }
}
