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

  days = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
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

  reschedule(slotId: number) {
    this.api.reschedule(slotId).subscribe(() => this.load());
  }

  complete(slotId: number) {
    this.api.markCompleted(slotId).subscribe(() => this.load());
  }

  delete(slotId: number) {
    this.api.deleteSlot(slotId).subscribe(() => this.load());
  }

  clearSchedule() {
    this.api.clearSchedule().subscribe(() => this.load());
  }

  getStatusColor(status: number): string {
    if (status === 1) return "#22C55E";
    if (status === 2) return "#ef4444";
    return "#3B82F6";
  }

  formatTime(time: string): string {
    const dateTimeString = `1970-01-01T${time}`;
    const dateObject = new Date(dateTimeString);

    return dateObject.toLocaleTimeString(navigator.language, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true});
  }
}
