import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alarm, AlarmWithId } from '@entities/alarm';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { authHeader } from '@shared';

@Injectable({
    providedIn: 'root',
})
export class AlarmService {
    public constructor(private readonly http: HttpClient) {}

    public async getValidOutputIndexes(): Promise<number[]> {
        return firstValueFrom(this.http.get<number[]>('/api/v1/alarm/output_indices', { headers: authHeader(), }));
    }

    public async getAlarms(outputIndex: number): Promise<AlarmWithId[]> {
        return firstValueFrom(this.http.get<AlarmWithId[]>('/api/v1/alarms', { params: { output_index: outputIndex, }, headers: authHeader(), }));
        // return [
        //     {
        //         id: {
        //             output_index: outputIndex,
        //             identifier: `gfhsb58s`,
        //         },
        //         alarm: {
        //             year: ignore(),
        //             month: doNotMatch([ Month.JUNE, Month.JULY, Month.AUGUST, ]),
        //             month_day: ignore(),
        //             week_day: doNotMatch([ WeekDay.SATURDAY, WeekDay.SUNDAY, ]),
        //             hour: match([ 9, ]),
        //             minute: match([ 30, ]),
        //             second: match([ 0, ]),
        //             impulse_length_millis: 5_000,
        //         },
        //     },
        //     {
        //         id: {
        //             output_index: outputIndex,
        //             identifier: `gf45b58s`,
        //         },
        //         alarm: {
        //             year: ignore(),
        //             month: doNotMatch([ Month.JUNE, Month.JULY, Month.AUGUST, ]),
        //             month_day: ignore(),
        //             week_day: doNotMatch([ WeekDay.SATURDAY, WeekDay.SUNDAY, ]),
        //             hour: match([ 10, ]),
        //             minute: match([ 50, ]),
        //             second: match([ 0, ]),
        //             impulse_length_millis: 5_000,
        //         },
        //     },
        //     {
        //         id: {
        //             output_index: outputIndex,
        //             identifier: `uy984wef`,
        //         },
        //         alarm: {
        //             year: ignore(),
        //             month: doNotMatch([ Month.JUNE, Month.JULY, Month.AUGUST, ]),
        //             month_day: ignore(),
        //             week_day: doNotMatch([ WeekDay.SATURDAY, WeekDay.SUNDAY, ]),
        //             hour: match([ 11, ]),
        //             minute: match([ 0, ]),
        //             second: match([ 0, ]),
        //             impulse_length_millis: 5_000,
        //         },
        //     },
        //     {
        //         id: {
        //             output_index: outputIndex,
        //             identifier: `iwquegf7`,
        //         },
        //         alarm: {
        //             year: ignore(),
        //             month: doNotMatch([ Month.JUNE, Month.JULY, Month.AUGUST, ]),
        //             month_day: ignore(),
        //             week_day: doNotMatch([ WeekDay.SATURDAY, WeekDay.SUNDAY, ]),
        //             hour: match([ 12, ]),
        //             minute: match([ 20, ]),
        //             second: match([ 0, ]),
        //             impulse_length_millis: 5_000,
        //         },
        //     },
        //     {
        //         id: {
        //             output_index: outputIndex,
        //             identifier: `54asc7dd`,
        //         },
        //         alarm: {
        //             year: ignore(),
        //             month: doNotMatch([ Month.JUNE, Month.JULY, Month.AUGUST, ]),
        //             month_day: ignore(),
        //             week_day: doNotMatch([ WeekDay.SATURDAY, WeekDay.SUNDAY, ]),
        //             hour: match([ 12, ]),
        //             minute: match([ 50, ]),
        //             second: match([ 0, ]),
        //             impulse_length_millis: 5_000,
        //         },
        //     },
        //     {
        //         id: {
        //             output_index: outputIndex,
        //             identifier: `5ass41dd`,
        //         },
        //         alarm: {
        //             year: ignore(),
        //             month: doNotMatch([ Month.JUNE, Month.JULY, Month.AUGUST, ]),
        //             month_day: ignore(),
        //             week_day: doNotMatch([ WeekDay.SATURDAY, WeekDay.SUNDAY, ]),
        //             hour: match([ 14, ]),
        //             minute: match([ 10, ]),
        //             second: match([ 0, ]),
        //             impulse_length_millis: 5_000,
        //         },
        //     },
        //     {
        //         id: {
        //             output_index: outputIndex,
        //             identifier: `aaa14c7d`,
        //         },
        //         alarm: {
        //             year: ignore(),
        //             month: doNotMatch([ Month.JUNE, Month.JULY, Month.AUGUST, ]),
        //             month_day: ignore(),
        //             week_day: doNotMatch([ WeekDay.SATURDAY, WeekDay.SUNDAY, ]),
        //             hour: match([ 14, ]),
        //             minute: match([ 20, ]),
        //             second: match([ 0, ]),
        //             impulse_length_millis: 5_000,
        //         },
        //     },
        //     {
        //         id: {
        //             output_index: outputIndex,
        //             identifier: `acfr48ed`,
        //         },
        //         alarm: {
        //             year: ignore(),
        //             month: doNotMatch([ Month.JUNE, Month.JULY, Month.AUGUST, ]),
        //             month_day: ignore(),
        //             week_day: doNotMatch([ WeekDay.SATURDAY, WeekDay.SUNDAY, ]),
        //             hour: match([ 15, ]),
        //             minute: match([ 40, ]),
        //             second: match([ 0, ]),
        //             impulse_length_millis: 5_000,
        //         },
        //     },
        // ];
    }

    public async createAlarm(outputIndex: number, alarm: Alarm): Promise<void> {
        await lastValueFrom(this.http.post(
            '/api/v1/alarm',
            alarm,
            {
                params: { output_index: outputIndex, },
                headers: authHeader(), responseType: 'text',
            }
        ));
    }

    public async deleteAlarm(outputIndex: number, identifier: string): Promise<void> {
        await lastValueFrom(this.http.delete(
            '/api/v1/alarm',
            {
                params: { output_index: outputIndex, identifier, },
                headers: authHeader(), responseType: 'text',
            }
        ));
    }

    public async deleteAlarms(outputIndex: number): Promise<void> {
        await lastValueFrom(this.http.delete(
            '/api/v1/alarms',
            {
                params: { output_index: outputIndex, },
                headers: authHeader(),
            }
        ));
    }
}
