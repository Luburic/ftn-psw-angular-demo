import { Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Quest } from '../quest';

@Component({
  selector: 'app-quest-card',
  imports: [RouterLink],
  templateUrl: './quest-card.html',
})
export class QuestCard {
  readonly quest = input.required<Quest>();
  readonly watched = input(false);
  readonly watchedChange = output<boolean>();

  protected readonly percent = computed(() =>
    Math.round((this.quest().progress / this.quest().goal) * 100),
  );
}
