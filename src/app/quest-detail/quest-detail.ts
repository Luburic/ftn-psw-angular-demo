import { httpResource } from '@angular/common/http';
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { API } from '../api';
import { Quest } from '../quest';
import { Watchlist } from '../watchlist';

@Component({
  selector: 'app-quest-detail',
  imports: [RouterLink],
  templateUrl: './quest-detail.html',
})
export class QuestDetail {
  protected readonly watchlist = inject(Watchlist);

  readonly id = input.required<string>();

  // Adresa je funkcija koja čita id(). Kada se id promeni,
  // resurs ponovo izvršava funkciju i šalje nov zahtev.
  protected readonly detail = httpResource<Quest>(() => `${API}/quests/${this.id()}`);
}
