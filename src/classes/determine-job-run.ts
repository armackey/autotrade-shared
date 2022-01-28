import { isMonday, isTuesday, isWednesday, isThursday, isFriday } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

export class DetermineJobRun {
  date = Date.now();

  isTradingHours(): boolean {
    return this.isCorrectDay() && this.isCorrectTime();
  }

  private isCorrectDay(): boolean {
    return isMonday(this.date) || isTuesday(this.date) || isWednesday(this.date) || isThursday(this.date) || isFriday(this.date);
  }

  private isCorrectTime(): boolean {
    const hour = parseInt(formatInTimeZone(this.date, 'America/New_York', 'H'));
    const minute = parseInt(formatInTimeZone(this.date, 'America/New_York', 'm'));
    return (hour === 9 && minute >= 20) || (hour > 9 && hour < 16);
  }
}