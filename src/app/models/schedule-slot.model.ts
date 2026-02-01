export interface ScheduleSlot {
    id: number;
    date: string;
    startTime: string;
    durationMinutes: number;
    status: number;

    habitId: number;
    habitName: string;
}