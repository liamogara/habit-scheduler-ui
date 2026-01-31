export interface Habit {
  id: number;
  name: string;
  frequencyPerWeek: number;
  minDurationMinutes: number;
  startHour: number;
  endHour: number;
  isActive: boolean;
}
