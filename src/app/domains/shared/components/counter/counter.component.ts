import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
})
export class CounterComponent {
  @Input({ required: true }) duration = 0;
  @Input({ required: true }) message: string = '';

  counter = signal(0);
  counterRef: number | undefined;

  constructor() {
    //NO PUEDE SER ASYNC
    //ESTO SE EJECUTA ANTES DE QUE EL COMPONENTE SE RENDERIZA
    //SOLO SE EJECUTA UNA VEZ
    console.log('constructor');
    console.log('-'.repeat(10));
  }

  ngOnChanges(changes: SimpleChanges) {
    //SE EJECUTA TAMBIEN ANTES DEL RENDER Y DURANTE SE ESTA RENDEREIZANDO
    console.log('ngOnChanges');
    console.log('-'.repeat(10));
    console.log(changes);

    const duration = changes['duration'];
    if (duration && duration.currentValue !== duration.previousValue) {
      this.doSomething();
    }
  }

  ngOnInit() {
    // AQUI YA SER RENDERIZO EL COMPONENTE
    //SOLO SE EJECUTA UNA VEZ
    // AQUI SI ES PERFECTO PARA COSAS ASYNC/PETICIONES/FECTH

    console.log('ngOnInit');
    console.log('-'.repeat(10));
    console.log('duration =>', this.duration);
    console.log('message =>', this.message);
    this.counterRef = window.setInterval(() => {
      console.log('run interval');
      this.counter.update((statePrev) => statePrev + 1);
    }, 1000);
  }

  ngAfterViewInit() {
    // DESPUES DE QUE SE RENDERIZA
    //PARA SABER SI LOS HIJOS DEL COMPONENTE YA FUERON RENDERIZADOS
    console.log('ngAfterViewInit');
    console.log('-'.repeat(10));
  }

  ngOnDestroy() {
    console.log('ngDestroy');
    console.log('-'.repeat(10));
    window.clearInterval(this.counterRef);
  }

  doSomething() {
    console.log('change duration');
  }
}
