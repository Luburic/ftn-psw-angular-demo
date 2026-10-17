import { Component, computed, input, output } from '@angular/core';
import { Quest } from '../quest';

@Component({
  selector: 'app-quest-card',
  templateUrl: './quest-card.html',
})
export class QuestCard {
  // Ulaz popunjava roditelj, a dete ga samo čita. Izlaz javlja roditelju šta se desilo.
  readonly quest = input.required<Quest>();
  // Ulaz sa podrazumevanom vrednošću: roditelj ne mora da ga prosledi.
  readonly watched = input(false);
  // Kartica javlja samo šta korisnik želi. Koja je to misija, roditelj već zna.
  readonly watchedChange = output<boolean>();

  // Ulaz je signal, pa iz njega može da se izvede vrednost.
  protected readonly percent = computed(() =>
    Math.round((this.quest().progress / this.quest().goal) * 100),
  );
}
