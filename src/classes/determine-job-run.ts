import { isMonday, isTuesday, isWednesday, isThursday, isFriday, format } from 'date-fns';

export class DetermineJobRun {
  date = Date.now();

  isTradingHours(): boolean {
    return this.isCorrectDay() && this.isCorrectTime();
  }

  private isCorrectDay(): boolean {
    return isMonday(this.date) || isTuesday(this.date) || isWednesday(this.date) || isThursday(this.date) || isFriday(this.date);
  }

  private isCorrectTime(): boolean {
    const hour = parseInt(format(this.date, 'H'));
    const minute = parseInt(format(this.date, 'm'));
    return (hour === 6 && minute >= 20) || (hour > 6 && hour < 13);
  }
}