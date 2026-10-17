import { Component } from '@angular/core';

@Component({
  selector: 'app-daily-reset',
  templateUrl: './daily-reset.html',
})
export class DailyReset {
  protected secondsLeft = 90;

  constructor() {
    // Polje menja tajmer, a ne događaj iz šablona.
    // Konzola odbrojava, a prikaz stoji na 90.
    setInterval(() => {
      if (this.secondsLeft > 0) {
        this.secondsLeft = this.secondsLeft - 1;
      }
      console.log('secondsLeft:', this.secondsLeft);
    }, 1000);
  }
}
