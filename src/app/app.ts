import { Component } from '@angular/core';
import { DailyReset } from './daily-reset/daily-reset';
import { Header } from './header/header';
import { QuestList } from './quest-list/quest-list';

@Component({
  selector: 'app-root',
  imports: [Header, DailyReset, QuestList],
  templateUrl: './app.html',
})
export class App {}
