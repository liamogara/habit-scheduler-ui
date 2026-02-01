import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Habit } from '../models/habit.model';
import { ScheduleSlot } from '../models/schedule-slot.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getHabits(): Observable<Habit[]> {
    return this.http.get<Habit[]>(`${this.baseUrl}/habit`);
  }

  createHabit(habit: Partial<Habit>): Observable<Habit> {
    return this.http.post<Habit>(`${this.baseUrl}/habit`, habit);
  }

  deleteHabit(habitId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/habit/${habitId}`);
  }

  clearHabits(): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/habit/habits`);
  }

  createSchedule(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/schedule/create`, {});
  }

  getSchedule(): Observable<ScheduleSlot[]> {
    return this.http.get<ScheduleSlot[]>(`${this.baseUrl}/schedule/week`);
  }

  markMissed(slotId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/schedule/${slotId}/miss`, {});
  }

  markCompleted(slotId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/schedule/${slotId}/complete`, {});
  }

  deleteSlot(slotId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/schedule/${slotId}`);
  }

  clearSchedule(): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/schedule/week`);
  }
}
