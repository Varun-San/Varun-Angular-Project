import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css'],
})
export class CalcComponent implements AfterViewInit {
  @ViewChild('interactive') interactive!: ElementRef;
  displayValue: string = '';

  ngAfterViewInit() {
    if (!this.interactive) {
      console.error('Interactive element not found!');
    } else {
      console.log(
        'Interactive element initialized:',
        this.interactive.nativeElement
      );
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.interactive && this.interactive.nativeElement) {
      const { clientX: x, clientY: y } = event;
      this.interactive.nativeElement.style.transform = `translate(${
        x - 500
      }px, ${y - 500}px)`;
    }
  }

  // Calculator Functions
  appendToDisplay(value: string) {
    this.displayValue += value;
  }

  clearDisplay() {
    this.displayValue = '';
  }

  calculateResult() {
    try {
      this.displayValue = eval(this.displayValue);
    } catch {
      this.displayValue = 'Error';
    }
  }
}
