import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { API, authHeader } from '@shared';

@Injectable({
    providedIn: 'root',
})
export class ClockService {
    public constructor(private readonly http: HttpClient) {}

    public async getSystemTimestamp(): Promise<number> {
        const date: { timestamp_millis: number } = await firstValueFrom(this.http.get<{ timestamp_millis: number }>(`${ API }/clock`));

        return new Date(date.timestamp_millis + new Date().getTimezoneOffset() * 60000).getTime();
    }

    public async setClock(date: Date): Promise<string> {
        /* Timezone of backend is UTC / GMT. Adjusting time before sending it to backend. */
        const timestampMillis: number = new Date(date.valueOf() - date.getTimezoneOffset() * 60000).getTime();

        return firstValueFrom(this.http.put(`${ API }/clock`, { timestamp_millis: timestampMillis, }, { headers: authHeader(), responseType: 'text', }));
    }
}

