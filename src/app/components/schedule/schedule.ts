import { Component, OnInit, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ScheduleSlot } from '../../models/schedule-slot.model';

@Component({
  selector: 'app-schedule',
  imports: [],
  templateUrl: './schedule.html',
  styleUrl: './schedule.css',
})
export class Schedule implements OnInit {
  slots = signal<ScheduleSlot[]>([]);

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.load();
  }

  createSchedule() {
    this.api.createSchedule().subscribe(() => this.load());
  }

  load() {
    this.api.getSchedule().subscribe((data) => {
      this.slots.set(data);
    });
  }

  miss(slotId: number) {
    this.api.markMissed(slotId).subscribe(() => this.load());
  }
}
