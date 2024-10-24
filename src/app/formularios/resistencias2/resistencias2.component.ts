import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Resultado {
    banda1: string;
    banda2: string;
    banda3: string;
    tolerancia: string;
}

@Component({
    selector: 'app-resistencias2',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './resistencias2.component.html',
    styleUrls: ['./resistencias2.component.css']
})
export default class Resistencias2Component implements OnInit {
    formulario: FormGroup;
    resultados: Resultado[] = [];
    mostrarTabla: boolean = false; // Controla la visualización de la tabla
    colors: string[] = ['Negro', 'Café', 'Rojo', 'Naranja', 'Amarillo', 'Verde', 'Azul', 'Morado', 'Gris', 'Blanco'];
    colorCodes: { [key: string]: string } = {
        'Negro': 'black',
        'Café': '#8B4513',
        'Rojo': 'red',
        'Naranja': 'orange',
        'Amarillo': 'yellow',
        'Verde': 'green',
        'Azul': 'blue',
        'Morado': 'violet',
        'Gris': 'gray',
        'Blanco': 'white'
    };

    constructor() {
        this.formulario = new FormGroup({
            banda1: new FormControl('', Validators.required),
            banda2: new FormControl('', Validators.required),
            banda3: new FormControl('', Validators.required),
            tolerancia: new FormControl('', Validators.required),
        });
    }

    ngOnInit(): void {
        this.cargarResultadosLocalStorage();
    }

    calcular() {
        if (this.formulario.valid) {
            const { banda1, banda2, banda3, tolerancia } = this.formulario.value;

            //
            this.resultados.push({
                banda1,
                banda2,
                banda3,
                tolerancia
            });

            this.guardarResultadosLocalStorage();
        }
    }

    imprimirResultados() {
        this.mostrarTabla = true; // Muestra la tabla
        this.resultados = JSON.parse(localStorage.getItem('resultados') || '[]'); // 
    }

    calcularValor(banda1: string, banda2: string, banda3: string, tolerancia: string) {
        const valorColor1 = this.colors.indexOf(banda1);
        const valorColor2 = this.colors.indexOf(banda2);
        const multiplicador = Math.pow(10, this.colors.indexOf(banda3));

        const valor = (valorColor1 * 10 + valorColor2) * multiplicador;
        const toleranceFactor = tolerancia === 'oro' ? 0.05 : 0.10;
        const valorMaximo = parseFloat((valor * (1 + toleranceFactor)).toFixed(2));
        const valorMinimo = parseFloat((valor * (1 - toleranceFactor)).toFixed(2));

        return { valor, valorMaximo, valorMinimo };
    }

    getColorCode(color: string): string {
        return this.colorCodes[color] || 'transparent';
    }

    getToleranceColor(tolerancia: string): string {
        return tolerancia === 'oro' ? 'gold' : 'silver';
    }

    guardarResultadosLocalStorage() {
        localStorage.setItem('resultados', JSON.stringify(this.resultados)); //
    }

    cargarResultadosLocalStorage() {
        const data = localStorage.getItem('resultados'); 
        if (data) {
            this.resultados = JSON.parse(data);
        }
    }
}
