import { Component, computed, signal } from '@angular/core';
import { QUESTS } from '../quest';

@Component({
  selector: 'app-quest-list',
  templateUrl: './quest-list.html',
})
export class QuestList {
  private readonly quests = signal(QUESTS);
  protected readonly showDone = signal(false);

  protected readonly visible = computed(() => {
    const quests = this.quests();
    return this.showDone() ? quests.filter((quest) => quest.progress >= quest.goal) : quests;
  });

  // Prva nezavršena misija, ili undefined kada su sve završene.
  protected readonly next = computed(() =>
    this.quests().find((quest) => quest.progress < quest.goal),
  );
}
