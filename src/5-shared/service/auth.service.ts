import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

const ACCESS_TOKEN_KEY_HEADER: string = 'Access-Token';

export function authHeader(): HttpHeaders {
    const token: string = localStorage.getItem(ACCESS_TOKEN_KEY_HEADER) || '';
    return new HttpHeaders({ ACCESS_TOKEN_KEY_HEADER: token, });
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    public constructor(private readonly http: HttpClient) {}

    public async login(password: string): Promise<string> {
        const token: string = await firstValueFrom(this.http.post('/api/v1/login', { password, }, { responseType: 'text', }));

        localStorage.setItem(ACCESS_TOKEN_KEY_HEADER, token);

        return token;
    }

    // eslint-disable-next-line class-methods-use-this
    public async logout(): Promise<void> {
        localStorage.removeItem(ACCESS_TOKEN_KEY_HEADER);
    }

    public async changeUserPassword(password: string): Promise<void> {
        return firstValueFrom(this.http.patch<undefined>('/api/v1/user/password', { password, }, { headers: authHeader(), }));
    }

    public async changeAccessPointPassword(password: string): Promise<void> {
        return firstValueFrom(this.http.patch<undefined>('/api/v1/access-point/password', { password, }, { headers: authHeader(), }));
    }
}
