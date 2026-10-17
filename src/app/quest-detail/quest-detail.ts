import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QUESTS } from '../quest';

@Component({
  selector: 'app-quest-detail',
  imports: [RouterLink],
  templateUrl: './quest-detail.html',
})
export class QuestDetail {
  // Parametar :id iz putanje 'quests/:id'. Na /quests/2 ima vrednost '2'.
  readonly id = input.required<string>();

  protected readonly detail = computed(() => QUESTS.find((quest) => quest.id === this.id()));
}
