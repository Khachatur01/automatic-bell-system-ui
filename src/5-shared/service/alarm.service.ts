import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alarm, AlarmWithId, WeekDay } from '@entities/alarm';
import { lastValueFrom } from 'rxjs';
import { authHeader } from '@shared';
import { doNotMatch, ignore, match } from '@entities/alarm/model/alarm-matcher';

@Injectable({
    providedIn: 'root',
})
export class AlarmService {
    public constructor(private readonly httpClient: HttpClient) {}

    public async getValidOutputIndexes(): Promise<number[]> {
        return [ 0, 1, 2, 3, ];
    }

    public async getAlarms(outputIndex: number): Promise<AlarmWithId[]> {
        return [
            {
                id: {
                    output_index: outputIndex,
                    identifier: `iwaefrgbef ${ outputIndex }`,
                },
                alarm: {
                    year: match([ 2025, 2024, 2023, ]),
                    month: ignore(),
                    month_day: ignore(),
                    week_day: doNotMatch([ WeekDay.FRIDAY, WeekDay.FRIDAY, WeekDay.FRIDAY, WeekDay.FRIDAY, WeekDay.FRIDAY, WeekDay.FRIDAY, WeekDay.FRIDAY, WeekDay.FRIDAY, ]),
                    hour: ignore(),
                    minute: ignore(),
                    second: ignore(),
                    impulse_length_millis: 5_000,
                },
            },
            {
                id: {
                    output_index: outputIndex,
                    identifier: `W4ONWOIN ${ outputIndex }`,
                },
                alarm: {
                    year: match([ 2025, 2024, 2023, ]),
                    month: ignore(),
                    month_day: ignore(),
                    week_day: doNotMatch([ WeekDay.FRIDAY, WeekDay.FRIDAY, WeekDay.FRIDAY, WeekDay.FRIDAY, WeekDay.FRIDAY, WeekDay.FRIDAY, WeekDay.FRIDAY, WeekDay.FRIDAY, ]),
                    hour: ignore(),
                    minute: ignore(),
                    second: ignore(),
                    impulse_length_millis: 5_000,
                },
            },
        ];
    }

    // public async getAlarms(outputIndex: number): Promise<AlarmWithId[]> {
    //     return lastValueFrom(this.httpClient.get<AlarmWithId[]>(
    //         '/api/v1/alarms',
    //         {
    //             params: { output_index: outputIndex, },
    //             headers: authHeader(),
    //         }
    //     ));
    // }

    public async createAlarm(outputIndex: number, alarm: Alarm): Promise<void> {
        await lastValueFrom(this.httpClient.post(
            '/api/v1/alarm',
            { output_index: outputIndex, alarm, },
            { headers: authHeader(), }
        ));
    }

    public async deleteAlarm(outputIndex: number, identifier: string): Promise<void> {
        await lastValueFrom(this.httpClient.delete(
            '/api/v1/alarm',
            {
                params: { output_index: outputIndex, identifier, },
                headers: authHeader(),
            }
        ));
    }

    public async deleteAlarms(outputIndex: number): Promise<void> {
        await lastValueFrom(this.httpClient.delete(
            '/api/v1/alarms',
            {
                params: { output_index: outputIndex, },
                headers: authHeader(),
            }
        ));
    }
}
