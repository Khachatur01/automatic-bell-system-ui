import { AlarmMatcher, Month, WeekDay } from '@entities/alarm';

export enum SegmentType {
    YEAR = 'YEAR',
    MONTH = 'MONTH',
    MONTH_DAY = 'MONTH_DAY',
    WEEK_DAY = 'WEEK_DAY',
    HOUR = 'HOUR',
    MINUTE = 'MINUTE',
    SECOND = 'SECOND'
}

export interface Segment {
    type: SegmentType;
    alarmMatcher: AlarmMatcher<number | string | Month | WeekDay>;
    validValues: (number | string | Month | WeekDay)[];
}
