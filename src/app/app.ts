import { Component } from '@angular/core';
import { DailyReset } from './daily-reset/daily-reset';
import { Header } from './header/header';
import { QuestCard } from './quest-card/quest-card';

@Component({
  selector: 'app-root',
  // Komponente koje šablon sme da koristi.
  imports: [Header, DailyReset, QuestCard],
  templateUrl: './app.html',
})
export class App {}
