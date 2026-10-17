import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Quest } from '../quest';
import { Watchlist } from '../watchlist';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
})
export class Header {
  // Objekat pravi kontejner zavisnosti, a ne komponenta pozivom new.
  protected readonly watchlist = inject(Watchlist);

  protected percent(quest: Quest): number {
    return Math.round((quest.progress / quest.goal) * 100);
  }
}
