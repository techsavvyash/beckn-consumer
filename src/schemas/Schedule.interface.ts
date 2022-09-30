import DurationInterface from './Duration.interface';

export default interface ScheduleInterface {
  frequency: DurationInterface;
  holidays: ReadonlyArray<string>;
  times: ReadonlyArray<string>;
}
