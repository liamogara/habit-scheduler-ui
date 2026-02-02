import { Component, signal } from '@angular/core';
import { Habits } from './components/habits/habits';
import { Schedule } from './components/schedule/schedule';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import { LucideAngularModule, Sun, Moon} from 'lucide-angular';

@Component({
  selector: 'app-root',
  imports: [Habits, Schedule, CdkDropListGroup, LucideAngularModule],
  templateUrl: './app.html',
})
export class App {
  readonly Sun = Sun;
  readonly Moon = Moon;
  dark = signal<boolean>(
    localStorage['theme'] === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches),
  );

  constructor() {
    document.documentElement.classList.toggle('dark', this.dark());
  }

  protected readonly title = signal('Habit Scheduler');

  toggleTheme() {
    document.documentElement.classList.toggle('dark');
    localStorage['theme'] = this.dark() ? 'light' : 'dark';
    this.dark.set(!this.dark());
  }
}
