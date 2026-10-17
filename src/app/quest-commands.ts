import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { API } from './api';
import { Quest } from './quest';

// Komande menjaju podatke na serveru. Servis nema stanje:
// šalje zahtev, a odgovor obrađuje stranica.
@Injectable({ providedIn: 'root' })
export class QuestCommands {
  private readonly http = inject(HttpClient);

  // Server odgovara misijom posle izmene.
  async step(id: string): Promise<Quest> {
    // post vraća Observable, a firstValueFrom ga pretvara u obećanje koje čekamo.
    // Statusni kod greške postaje izuzetak.
    return firstValueFrom(this.http.post<Quest>(`${API}/quests/${id}/step`, {}));
  }
}
