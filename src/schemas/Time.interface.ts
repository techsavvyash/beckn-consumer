import DurationInterface from './Duration.interface';
import ScheduleInterface from './Schedule.interface';

export default interface TimeInterface {
  label: string;
  timestamp: number;
  duration: DurationInterface;
  range: {
    start: string;
    end: string;
  };
  days: string;
  schedule: ScheduleInterface;
}
