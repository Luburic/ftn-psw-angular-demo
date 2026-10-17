import { httpResource } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { API } from '../api';
import { Quest } from '../quest';
import { QuestCard } from '../quest-card/quest-card';
import { Watchlist } from '../watchlist';

@Component({
  selector: 'app-quest-list',
  imports: [QuestCard],
  templateUrl: './quest-list.html',
})
export class QuestList {
  protected readonly watchlist = inject(Watchlist);

  // Resurs šalje zahtev čim Angular napravi komponentu.
  // Odgovor, učitavanje i greška su signali: value, isLoading i error.
  protected readonly quests = httpResource<Quest[]>(() => `${API}/quests`);
  protected readonly showDone = signal(false);

  // Pre odgovora value() je undefined, pa uzimamo prazan niz.
  protected readonly visible = computed(() => {
    const quests = this.quests.value() ?? [];
    return this.showDone() ? quests.filter((quest) => quest.progress >= quest.goal) : quests;
  });

  protected readonly next = computed(() =>
    (this.quests.value() ?? []).find((quest) => quest.progress < quest.goal),
  );

  protected setWatched(quest: Quest, flag: boolean): void {
    if (flag) {
      this.watchlist.add(quest);
    } else {
      this.watchlist.remove(quest.id);
    }
  }
}
