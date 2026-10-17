import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormField, form, min, required } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { NewQuest } from '../quest';
import { QuestCommands } from '../quest-commands';

@Component({
  selector: 'app-create-quest',
  imports: [FormField],
  templateUrl: './create-quest.html',
})
export class CreateQuest {
  private readonly commands = inject(QuestCommands);
  private readonly router = inject(Router);

  // Model: signal sa vrednostima forme. Unos u element menja model.
  private readonly model = signal<NewQuest>({ title: '', goal: 5 });

  // Šema: pravila validacije, proveravaju se pri svakoj promeni modela.
  protected readonly form = form(this.model, (path) => {
    required(path.title, { message: 'Naziv je obavezan.' });
    min(path.goal, 1, { message: 'Cilj mora da bude najmanje 1.' });
  });

  protected readonly pending = signal(false);
  protected readonly error = signal<string | null>(null);

  protected async submit(event: Event): Promise<void> {
    // Bez ovoga internet čitač učitava nov dokument.
    event.preventDefault();
    this.pending.set(true);
    this.error.set(null);
    try {
      await this.commands.create(this.model());
      // Navigacija iz klase, tek kada komanda uspe.
      await this.router.navigate(['/quests']);
    } catch (failure) {
      const message = (failure as HttpErrorResponse).error?.message;
      this.error.set(message ?? 'Server nije dostupan.');
    } finally {
      this.pending.set(false);
    }
  }
}
