import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const adjustScheduleToCurrentWeek = (data: any[]) => {
  // Your logic to adjust the schedule to the current week
  // This is just a placeholder implementation
  return data.map(item => ({
    ...item,
    start: new Date(item.start).setDate(new Date(item.start).getDate() + 7), // Example logic
    end: new Date(item.end).setDate(new Date(item.end).getDate() + 7), // Example logic
  }));
};
