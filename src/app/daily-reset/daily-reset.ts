import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-daily-reset',
  templateUrl: './daily-reset.html',
})
export class DailyReset {
  protected readonly secondsLeft = signal(90);

  constructor() {
    // Signal obaveštava čitaoce, bez obzira odakle promena dolazi.
    setInterval(() => {
      if (this.secondsLeft() > 0) {
        this.secondsLeft.update((value) => value - 1);
      }
    }, 1000);
  }
}
