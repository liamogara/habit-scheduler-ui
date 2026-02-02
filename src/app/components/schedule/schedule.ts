import { Component, OnInit, signal } from '@angular/core';
import { CdkDropList, CdkDrag, CdkDragDrop } from '@angular/cdk/drag-drop';
import { ApiService } from '../../services/api.service';
import { Habit } from '../../models/habit.model';
import { ScheduleSlot } from '../../models/schedule-slot.model';
import { LucideAngularModule, Trash, CalendarPlus, CalendarSync} from 'lucide-angular';

@Component({
  selector: 'app-schedule',
  imports: [CdkDropList, CdkDrag, LucideAngularModule],
  templateUrl: './schedule.html',
})
export class Schedule implements OnInit {
  readonly Trash = Trash;
  readonly CalendarPlus = CalendarPlus;
  readonly CalendarSync = CalendarSync;
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

  move(slotId: number, day: string) {
    this.api.moveSlot(slotId, day).subscribe(() => this.load());
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

  onDrop(event: CdkDragDrop<ScheduleSlot[]>, day: string) {
    if (event.previousContainer === event.container) {
      return;
    }

    const data = event.item.data;

    if ('frequencyPerWeek' in data) {
      const habit = data as Habit;
      this.api.addHabit(habit.id, day).subscribe(() => this.load());
    } else {
      const slot = data as ScheduleSlot;
      this.api.moveSlot(slot.id, day).subscribe(() => this.load());
    }
  }

  getStatusColor(status: number): string {
    if (status === 1) return '#22C55E';
    if (status === 2) return '#ef4444';
    return '#3B82F6';
  }

  formatTime(time: string): string {
    const dateTimeString = `1970-01-01T${time}`;
    const dateObject = new Date(dateTimeString);

    return dateObject.toLocaleTimeString(navigator.language, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }
}
