import { Routes } from '@angular/router';
import { Home } from './home/home';
import { QuestDetail } from './quest-detail/quest-detail';
import { QuestList } from './quest-list/quest-list';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'quests', component: QuestList },
  { path: 'quests/:id', component: QuestDetail },
];
