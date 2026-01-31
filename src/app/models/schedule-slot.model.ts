export interface ScheduleSlot {
    id: number;
    date: string;
    startTime: string;
    durationMinutes: number;
    status: string;

    habitId: number;
    habitName: string;
}