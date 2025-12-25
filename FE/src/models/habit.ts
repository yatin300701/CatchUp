import type { WeekDay } from "./common";

export interface Habit {
  id: string;
  name: string;
  description: string;
  createdAt: number;
  updatedAt: number;
  workingDays: WeekDay[];
  workingTimePeriod: {
    start: number;
    end: number;
  };
}
