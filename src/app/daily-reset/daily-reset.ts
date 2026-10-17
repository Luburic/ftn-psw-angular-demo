import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-daily-reset',
  templateUrl: './daily-reset.html',
})
export class DailyReset {
  protected readonly secondsLeft = signal(90);

  // 90 -> "1:30"
  protected readonly label = computed(() => {
    const seconds = this.secondsLeft();
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
  });

  constructor() {
    setInterval(() => {
      if (this.secondsLeft() > 0) {
        this.secondsLeft.update((value) => value - 1);
      }
    }, 1000);
  }
}
