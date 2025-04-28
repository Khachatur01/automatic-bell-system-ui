import { Alarm } from '@entities/alarm';

export interface AlarmWithId {
    id: {
        output_index: number;
        identifier: string;
    };
    alarm: Alarm;
}
