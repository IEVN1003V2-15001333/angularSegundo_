import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Usuario {
  matricula: string;
  nombre: string;
  edad: number;
  correo: string;
  horasTrabajadas: number;
  pago: number;
  horasExtras: number;
  subtotal: number;
}
//
@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export default class EmpleadosComponent implements OnInit {

  formGroup!: FormGroup;
  empleados: Usuario[] = [];
  mostrarTabla: boolean = false;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this.initForm();
    this.cargarEmpleados(); // 
  }

  private initForm(): FormGroup {
    return this.fb.group({
      matricula: [''],
      nombre: [''],
      edad: [''],
      correo: [''],
      horasTrabajadas: ['']
    });
  }

  onSubmit() {
    const { matricula, nombre, edad, correo, horasTrabajadas } = this.formGroup.value;

    const pago = 70;
    const horasExtras = horasTrabajadas > 40 ? horasTrabajadas - 40 : 0; //
    const horasNormales = horasTrabajadas > 40 ? 40 : horasTrabajadas; // 

    const subtotalNormal = horasNormales * pago; // 
    const subtotalExtras = horasExtras * 140; // 

    const subtotal = subtotalNormal + subtotalExtras; // 
    const horasPorPagar = horasTrabajadas; // 

    const empleado: Usuario = {
      matricula,
      nombre,
      edad,
      correo,
      horasTrabajadas: horasPorPagar, // 
      pago: subtotalNormal, // 
      horasExtras: subtotalExtras, //
      subtotal //
    };

    const index = this.empleados.findIndex(emp => emp.matricula === matricula);
    if (index > -1) {
      this.empleados[index] = empleado; //
    } else {
      this.empleados.push(empleado); //
    }

    this.guardarEmpleados(); // 
    this.formGroup.reset(); //
}


  cargarEmpleados() {
    const empleadosGuardados = localStorage.getItem('empleados');
    if (empleadosGuardados) {
      this.empleados = JSON.parse(empleadosGuardados);
    }
  }

  subImprime() {
    this.mostrarTabla = true;
  }

  calcularTotal(): number {
    return this.empleados.reduce((total, empleado) => total + empleado.subtotal, 0);
  }

  modificarEmpleado() {
    const matricula = prompt("Ingrese la matrícula del empleado a modificar:");
    if (matricula) {
      const empleado = this.empleados.find(emp => emp.matricula === matricula);
      if (empleado) {
        this.formGroup.patchValue(empleado); //
      } else {
        alert("Empleado no encontrado.");
      }
    }
  }

  eliminarEmpleadoPrompt() {
    const matricula = prompt("Ingrese la matrícula del empleado a eliminar:");
    if (matricula) {
      this.eliminarEmpleado(matricula);
    }
  }

  eliminarEmpleado(matricula: string) {
    this.empleados = this.empleados.filter(emp => emp.matricula !== matricula); //r
    this.guardarEmpleados();
  }

  guardarEmpleados() {
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
  }
}
