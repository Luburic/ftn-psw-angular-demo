import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QUESTS } from '../quest';
import { Watchlist } from '../watchlist';

@Component({
  selector: 'app-quest-detail',
  imports: [RouterLink],
  templateUrl: './quest-detail.html',
})
export class QuestDetail {
  protected readonly watchlist = inject(Watchlist);

  readonly id = input.required<string>();

  protected readonly detail = computed(() => QUESTS.find((quest) => quest.id === this.id()));
}
