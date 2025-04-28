import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { authHeader } from '@shared';

@Injectable({
    providedIn: 'root',
})
export class ClockService {
    public constructor(private readonly http: HttpClient) {}

    public async getSystemTimestamp(): Promise<number> {
        const data: { timestamp_millis: number } = await firstValueFrom(this.http.get<{ timestamp_millis: number }>('/api/v1/clock'));
        return data.timestamp_millis;
    }

    public async setClock(date: Date): Promise<void> {
        const timestampMillis: number = date.getTime();
        return firstValueFrom(this.http.put<undefined>(
            '/api/v1/clock',
            { timestamp_millis: timestampMillis, },
            { headers: authHeader(), }
        ));
    }
}

