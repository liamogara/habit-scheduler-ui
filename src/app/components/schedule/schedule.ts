import { Component, OnInit, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ScheduleSlot } from '../../models/schedule-slot.model';

@Component({
  selector: 'app-schedule',
  imports: [],
  templateUrl: './schedule.html',
})
export class Schedule implements OnInit {
  loading = signal<boolean>(true);
  slots = signal<ScheduleSlot[]>([]);

  days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  grouped = signal<Record<string, any[]>>({});

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.load();
  }

  createSchedule() {
    this.api.createSchedule().subscribe(() => this.load());
  }

  load() {
    this.loading.set(true);
    this.api.getSchedule().subscribe((data) => {
      this.slots.set(data);
      this.groupSlots();
      this.loading.set(false);
    });
  }

  groupSlots() {
    this.grouped.set({});
    for (const day of this.days) {
      this.grouped()[day] = [];
    }

    for (const slot of this.slots()) {
      const day = new Date(slot.date).toLocaleDateString('en-US', { weekday: 'short' });
      this.grouped()[day].push(slot);
    }
  }

  miss(slotId: number) {
    this.api.markMissed(slotId).subscribe(() => this.load());
  }
}
