import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-quest-card',
  templateUrl: './quest-card.html',
})
export class QuestCard {
  // Ne menja se, pa ne mora da bude signal.
  protected readonly title = 'Popij 8 čaša vode';
  protected readonly goal = 8;

  // Polje je readonly jer se menja vrednost u signalu, a ne sam signal.
  protected readonly progress = signal(0);

  protected step(): void {
    // update: nova vrednost se računa iz stare.
    this.progress.update((value) => value + 1);
  }

  protected reset(): void {
    // set: nova vrednost se zadaje direktno.
    this.progress.set(0);
  }
}
