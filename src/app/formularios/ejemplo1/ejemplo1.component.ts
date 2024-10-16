import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 


interface Usuario{
  nombre:string;
  edad:number;
  email:string;
}

@Component({
  selector: 'app-ejemplo1',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './ejemplo1.component.html',
  styleUrl: './ejemplo1.component.css'
})
export default class Ejemplo1Component implements OnInit {

formGroup!: FormGroup;

nombre:string='el que quieran'

persona:Usuario={
  nombre:'',
  edad: 0,
  email:''
}

constructor(private readonly fb: FormBuilder){}
  ngOnInit(){
    this.formGroup=this.initForm();

  }

  initForm():FormGroup{
    return this.fb.group({
      nombre:[''],
      edad:[''],
      email:['']
    })
  }
  onSubmit():void{

    localStorage.setItem('nombre',this.nombre)
    const{nombre, edad, email}=this.formGroup.value;

    this.persona.nombre=nombre;
    this.persona.edad=edad;
    this.persona.email=email;

    let personaJSON=JSON.stringify(this.persona);
    localStorage.setItem('persona', personaJSON);

    //console.log(this.persona);


  }

  subImprime():void{
    const personaGuadada=localStorage.getItem('persona');
    if(personaGuadada){
      const persona:Usuario=JSON.parse(personaGuadada);
      this.persona=persona;
    }
  }
}
