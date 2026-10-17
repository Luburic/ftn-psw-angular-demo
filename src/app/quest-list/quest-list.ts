import { HttpErrorResponse, httpResource } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { API } from '../api';
import { Quest } from '../quest';
import { QuestCard } from '../quest-card/quest-card';
import { QuestCommands } from '../quest-commands';
import { Watchlist } from '../watchlist';

@Component({
  selector: 'app-quest-list',
  imports: [QuestCard],
  templateUrl: './quest-list.html',
})
export class QuestList {
  protected readonly watchlist = inject(Watchlist);
  private readonly commands = inject(QuestCommands);

  protected readonly quests = httpResource<Quest[]>(() => `${API}/quests`);
  protected readonly showDone = signal(false);

  protected readonly visible = computed(() => {
    const quests = this.quests.value() ?? [];
    return this.showDone() ? quests.filter((quest) => quest.progress >= quest.goal) : quests;
  });

  protected readonly next = computed(() =>
    (this.quests.value() ?? []).find((quest) => quest.progress < quest.goal),
  );

  protected setWatched(quest: Quest, flag: boolean): void {
    if (flag) {
      this.watchlist.add(quest);
    } else {
      this.watchlist.remove(quest.id);
    }
  }

  // Stanje komande: da li traje i poruka o grešci.
  protected readonly pending = signal(false);
  protected readonly error = signal<string | null>(null);

  protected async step(id: string): Promise<void> {
    this.pending.set(true);
    this.error.set(null);
    try {
      const quest = await this.commands.step(id);
      // Podaci na serveru su se promenili, pa ih ponovo čitamo.
      this.quests.reload();
      // Servis čuva svoju kopiju misije, pa i nju zamenjujemo odgovorom servera.
      this.watchlist.refresh(quest);
    } catch (failure) {
      // Server u telu odgovora šalje { message }.
      const message = (failure as HttpErrorResponse).error?.message;
      this.error.set(message ?? 'Server nije dostupan.');
    } finally {
      this.pending.set(false);
    }
  }
}
