import { Component, computed, signal } from '@angular/core';
import { Quest, QUESTS } from '../quest';
import { QuestCard } from '../quest-card/quest-card';

@Component({
  selector: 'app-quest-list',
  imports: [QuestCard],
  templateUrl: './quest-list.html',
})
export class QuestList {
  private readonly quests = signal(QUESTS);
  protected readonly showDone = signal(false);

  protected readonly visible = computed(() => {
    const quests = this.quests();
    return this.showDone() ? quests.filter((quest) => quest.progress >= quest.goal) : quests;
  });

  protected readonly next = computed(() =>
    this.quests().find((quest) => quest.progress < quest.goal),
  );

  protected readonly watched = signal<Quest[]>([]);
  protected readonly watchedTitles = computed(() =>
    this.watched()
      .map((quest) => quest.title)
      .join(', '),
  );

  // Metoda čita signal, pa se šablon koji je poziva osvežava kada se spisak promeni.
  protected isWatched(id: string): boolean {
    return this.watched().some((q) => q.id === id);
  }

  protected setWatched(quest: Quest, flag: boolean): void {
    // Signal primećuje samo nov niz, pa pravimo nov niz sa ... ili sa filter.
    if (flag) {
      this.watched.update((quests) => [...quests, quest]);
    } else {
      this.watched.update((quests) => quests.filter((q) => q.id !== quest.id));
    }

    // Probaj umesto prve grane: this.watched().push(quest);
    // Niz se menja, ali signal ne zna za to, pa watchedTitles ostaje isti.
    // Dugme se ipak menja u Otprati: klik osvežava šablon, a isWatched ponovo pretražuje niz.
  }
}
