import { Component, signal } from '@angular/core';
import { Habits } from './components/habits/habits';
import { Schedule } from './components/schedule/schedule';

@Component({
  selector: 'app-root',
  imports: [Habits, Schedule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('habit-scheduler-ui');
}
