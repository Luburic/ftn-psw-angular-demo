import { Injectable, signal } from '@angular/core';
import { Quest } from './quest';

// providedIn: 'root': jedan objekat za celu aplikaciju.
@Injectable({ providedIn: 'root' })
export class Watchlist {
  // private: stanje menjaju samo metode servisa.
  private readonly state = signal<Quest[]>([]);
  // Komponente čitaju ovaj signal, ali nad njim ne mogu da pozovu set ni update.
  readonly quests = this.state.asReadonly();

  add(quest: Quest): void {
    this.state.update((quests) =>
      quests.some((q) => q.id === quest.id) ? quests : [...quests, quest],
    );
  }

  remove(id: string): void {
    this.state.update((quests) => quests.filter((q) => q.id !== id));
  }

  // Zamenjuje zastarelu kopiju. Misiju koja se ne prati ne dodaje.
  refresh(quest: Quest): void {
    this.state.update((quests) => quests.map((q) => (q.id === quest.id ? quest : q)));
  }

  // Metoda čita signal, pa se šablon koji je poziva osvežava kada se spisak promeni.
  has(id: string): boolean {
    return this.state().some((q) => q.id === id);
  }
}
