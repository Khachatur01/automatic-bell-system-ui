import { Month } from '@entities/alarm/model/month';
import { WeekDay } from '@entities/alarm/model/week-day';
import { AlarmMatcher } from '@entities/alarm/model/alarm-matcher';

export interface Alarm {
    year: AlarmMatcher<number>;
    month: AlarmMatcher<Month>;
    month_day: AlarmMatcher<number>;
    week_day: AlarmMatcher<WeekDay>;
    hour: AlarmMatcher<number>;
    minute: AlarmMatcher<number>;
    second: AlarmMatcher<number>;
    impulse_length_millis: number;
}
