import { Routes } from '@angular/router';
import { CreateQuest } from './create-quest/create-quest';
import { Home } from './home/home';
import { QuestDetail } from './quest-detail/quest-detail';
import { QuestList } from './quest-list/quest-list';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'quests', component: QuestList },
  // Angular bira prvu rutu koja se poklapa, pa 'quests/new' mora pre 'quests/:id'.
  { path: 'quests/new', component: CreateQuest },
  { path: 'quests/:id', component: QuestDetail },
];
