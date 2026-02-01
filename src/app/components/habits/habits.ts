import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Habit } from '../../models/habit.model';

@Component({
  selector: 'app-habits',
  imports: [FormsModule],
  templateUrl: './habits.html',
})
export class Habits implements OnInit {
  loading = signal<boolean>(true);
  habits = signal<Habit[]>([]);

  newHabit = {
    name: '',
    frequencyPerWeek: 0,
    minDurationMinutes: 0,
    startHour: 0,
    endHour: 0,
  };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.api.getHabits().subscribe((data) => {
      this.habits.set(data);
      this.loading.set(false);
    });
  }

  createHabit() {
    this.api.createHabit(this.newHabit).subscribe((data) => {
      this.habits.update((currentHabits) => [...currentHabits, data]);
    });
  }

  delete(habitId: number) {
    this.api.deleteHabit(habitId).subscribe(() => this.load());
  }

  clearHabits() {
    this.api.clearHabits().subscribe(() => this.load());
  }
}
