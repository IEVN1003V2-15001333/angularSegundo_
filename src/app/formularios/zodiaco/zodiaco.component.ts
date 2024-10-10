import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './zodiaco.component.html',
  styleUrls: ['./zodiaco.component.css']
})
export class ZodiacoComponent {
  formulario: FormGroup;
  mostrarInformacion: boolean = false;
  signoZodiacal: string = '';
  signoChino: string = '';
  edad: number = 0;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apaterno: ['', Validators.required],
      amaterno: ['', Validators.required],
      dia: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
      mes: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      anio: ['', [Validators.required, Validators.min(1900)]],
      sexo: ['', Validators.required]
    });
  }

  calcularSigno() {
    const dia = this.formulario.value.dia;
    const mes = this.formulario.value.mes;
    const anio = this.formulario.value.anio;

    this.edad = this.calcularEdad(anio, mes, dia);
    this.signoZodiacal = this.obtenerSignoZodiacal(dia, mes);
    this.signoChino = this.obtenerSignoChino(anio);

    this.mostrarInformacion = true;
  }

  calcularEdad(anio: number, mes: number, dia: number): number {
    const fechaActual = new Date();
    let edad = fechaActual.getFullYear() - anio;
    const mesActual = fechaActual.getMonth() + 1;
    const diaActual = fechaActual.getDate();

    if (mes > mesActual || (mes === mesActual && dia > diaActual)) {
      edad--;
    }

    return edad;
  }

  obtenerSignoZodiacal(dia: number, mes: number): string {
    if ((mes == 3 && dia >= 21) || (mes == 4 && dia <= 20)) return 'Aries';
    if ((mes == 4 && dia >= 21) || (mes == 5 && dia <= 20)) return 'Tauro';
    if ((mes == 5 && dia >= 21) || (mes == 6 && dia <= 20)) return 'Géminis';
    if ((mes == 6 && dia >= 21) || (mes == 7 && dia <= 22)) return 'Cáncer';
    if ((mes == 7 && dia >= 23) || (mes == 8 && dia <= 22)) return 'Leo';
    if ((mes == 8 && dia >= 23) || (mes == 9 && dia <= 22)) return 'Virgo';
    if ((mes == 9 && dia >= 23) || (mes == 10 && dia <= 22)) return 'Libra';
    if ((mes == 10 && dia >= 23) || (mes == 11 && dia <= 21)) return 'Escorpio';
    if ((mes == 11 && dia >= 22) || (mes == 12 && dia <= 21)) return 'Sagitario';
    if ((mes == 12 && dia >= 22) || (mes == 1 && dia <= 19)) return 'Capricornio';
    if ((mes == 1 && dia >= 20) || (mes == 2 && dia <= 18)) return 'Acuario';
    if ((mes == 2 && dia >= 19) || (mes == 3 && dia <= 20)) return 'Piscis';

    return 'Otro signo';
  }

  obtenerSignoChino(anio: number): string {
    const animales = ['Mono', 'Gallo', 'Perro', 'Cerdo', 'Rata', 'Buey', 'Tigre', 'Conejo', 'Dragón', 'Serpiente', 'Caballo', 'Cabra'];
    const indice = (anio - 1800) % 12;
    return animales[indice];
  }

  obtenerImagenSignoChino(signoChino: string): string {
    const imagenesChinas = {
      'Mono': 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Mono.jpg',
      'Gallo': 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Gallo.jpg',
      'Perro': 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Perro.jpg',
      'Cerdo': 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Cerdo.jpg',
      'Rata': 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Rata.jpg',
      'Buey': 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Buey.jpg',
      'Tigre': 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Tigre.jpg',
      'Conejo': 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Conejo.jpg',
      'Dragón': 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Dragon.jpg',
      'Serpiente': 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Serpiente.jpg',
      'Caballo': 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Caballo.jpg',
      'Cabra': 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Cabra.jpg'
    };

    return imagenesChinas[signoChino as keyof typeof imagenesChinas] || ''; 
}
}
