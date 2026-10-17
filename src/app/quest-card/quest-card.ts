import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-quest-card',
  templateUrl: './quest-card.html',
})
export class QuestCard {
  protected readonly title = 'Popij 8 čaša vode';
  protected readonly goal = 8;
  protected readonly progress = signal(0);

  // Izvedeni signal: računa se iz signala koje pročita (ovde progress)
  // i ponovo se računa tek kada se neki od njih promeni.
  protected readonly done = computed(() => this.progress() >= this.goal);
  protected readonly percent = computed(() => Math.round((this.progress() / this.goal) * 100));

  protected step(): void {
    this.progress.update((value) => value + 1);
    // this.done.set(true); // Greška: izvedeni signal nema set ni update.
  }

  protected reset(): void {
    this.progress.set(0);
  }
}
