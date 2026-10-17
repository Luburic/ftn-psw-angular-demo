import { Component } from '@angular/core';

@Component({
  selector: 'app-quest-card',
  templateUrl: './quest-card.html',
})
export class QuestCard {
  // Šablon vidi public i protected članove, a private ne vidi.
  protected readonly title = 'Popij 8 čaša vode';
  protected readonly goal = 8;
  protected progress = 0;

  protected step(): void {
    this.progress = this.progress + 1;
  }
}
