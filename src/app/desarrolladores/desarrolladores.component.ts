import { Component, OnInit } from '@angular/core';
import { NivelModel } from '../model/nivel-model';
import { Desarrollador } from '../model/desarrollador-model';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { DesarrolladoresService } from '../services/desarrolladores.services';


@Component({
  selector: 'app-desarrolladores',
  templateUrl: './desarrolladores.component.html',
  styleUrls: ['./desarrolladores.component.css']
})
export class DesarrolladoresComponent implements OnInit {
  niveles: NivelModel[];
  desarrollador: Desarrollador;

  constructor(private formBuilder: FormBuilder, private dataService: DataService,
    private desarrolladoresService: DesarrolladoresService) {
    this.desarrollador = new Desarrollador;
    this.desarrollador.nombre='';
    this.niveles = [
      {id: 1, name: 'Senior'},
      {id: 2, name: 'Middle'},
      {id: 3, name: 'Junior'}
    ];
  }

  registroForm = this.formBuilder.group({
    id: [0],
    nombre: ['', Validators.required],
    apellidoPaterno: ['', Validators.required],
    apellidoMaterno: ['', Validators.required],
    idNivel: [-1, Validators.required]
  });

  ngOnInit() {
  }

  submit(){
    if(this.registroForm.valid && this.registroForm.value.idNivel >= 0) {
      let desarrollador = new Desarrollador();
      this.desarrollador.nombre = this.registroForm.value.nombre;
      this.desarrollador.apellidoPaterno = this.registroForm.value.apellidoPaterno;
      this.desarrollador.apellidoMaterno = this.registroForm.value.apellidoMaterno;
      this.desarrollador.nivel = this.registroForm.value.nivel;

      this.dataService.setIsLoadingEvent(true);
      this.desarrolladoresService.save(desarrollador).subscribe(result =>{
        this.dataService.setIsLoadingEvent(false);
        if(result) {
          this.dataService.setGeneralNotificationMessage('Registro Exitoso');
        } else {
          this.dataService.setGeneralNotificationMessage('Entro al servicio pero hubo un error al guardar sus datos');
        }
      }, error => {
        console.error(error);
        this.dataService.setIsLoadingEvent(false);
        this.dataService.setGeneralNotificationMessage('Error al guardar los datos');
      });
      
    } else {
      this.dataService.setGeneralNotificationMessage('Error filling the form');
    } 
  }
}
