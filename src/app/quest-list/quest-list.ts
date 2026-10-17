import { Component, computed, inject, signal } from '@angular/core';
import { Quest, QUESTS } from '../quest';
import { QuestCard } from '../quest-card/quest-card';
import { Watchlist } from '../watchlist';

@Component({
  selector: 'app-quest-list',
  imports: [QuestCard],
  templateUrl: './quest-list.html',
})
export class QuestList {
  protected readonly watchlist = inject(Watchlist);

  private readonly quests = signal(QUESTS);
  protected readonly showDone = signal(false);

  protected readonly visible = computed(() => {
    const quests = this.quests();
    return this.showDone() ? quests.filter((quest) => quest.progress >= quest.goal) : quests;
  });

  protected readonly next = computed(() =>
    this.quests().find((quest) => quest.progress < quest.goal),
  );

  protected setWatched(quest: Quest, flag: boolean): void {
    if (flag) {
      this.watchlist.add(quest);
    } else {
      this.watchlist.remove(quest.id);
    }
  }
}
