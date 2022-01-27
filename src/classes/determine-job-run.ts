import { isMonday, isTuesday, isWednesday, isThursday, isFriday, format } from 'date-fns';

export class DetermineJobRun {
  date = Date.now();
  isCorrectDay(): boolean {
    return isMonday(this.date) || isTuesday(this.date) || isWednesday(this.date) || isThursday(this.date) || isFriday(this.date);
  }

  isCorrectTime(): boolean {
    const hour = parseInt(format(this.date, 'H'));
    const minute = parseInt(format(this.date, 'm'));
    return (hour === 6 && minute >= 20) || (hour > 6 && hour < 13);
  }
}