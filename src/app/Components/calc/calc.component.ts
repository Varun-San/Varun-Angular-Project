import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css'],
})
export class CalcComponent {
  displayValue: string = '';

  // Append numbers/operators to the display
  appendToDisplay(value: string) {
    this.displayValue += value;
  }

  // Clear the display
  clearDisplay() {
    this.displayValue = '';
  }

  // Calculate the result
  calculateResult() {
    try {
      this.displayValue = eval(this.displayValue);
    } catch {
      this.displayValue = 'Error';
    }
  }

  // Handle keyboard input
  @HostListener('window:keydown', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    const key = event.key;

    if (!isNaN(Number(key)) || ['+', '-', '*', '/'].includes(key)) {
      this.appendToDisplay(key);
    } else if (key === 'Enter') {
      this.calculateResult();
    } else if (key === 'Backspace') {
      this.displayValue = this.displayValue.slice(0, -1);
    }
  }
}
