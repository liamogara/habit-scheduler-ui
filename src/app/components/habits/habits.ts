import { Component, OnInit, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Habit } from '../../models/habit.model';

@Component({
  selector: 'app-habits',
  imports: [],
  templateUrl: './habits.html',
  styleUrl: './habits.css',
})
export class Habits implements OnInit {
  habits = signal<Habit[]>([]);

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getHabits().subscribe(data => {
      this.habits.set(data);
    });
  }
}
