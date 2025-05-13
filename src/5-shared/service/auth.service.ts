import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { API } from '@shared/constants';

const ACCESS_TOKEN_KEY_HEADER: string = 'Access-Token';

export function authHeader(): HttpHeaders {
    const token: string = localStorage.getItem(ACCESS_TOKEN_KEY_HEADER) || '';

    return new HttpHeaders({
        [ACCESS_TOKEN_KEY_HEADER]: token,
    });
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    public constructor(private readonly http: HttpClient) {}

    public async login(password: string): Promise<string> {
        const token: string = await firstValueFrom(this.http.post(`${ API }/login`, { password, }, { responseType: 'text', }));

        localStorage.setItem(ACCESS_TOKEN_KEY_HEADER, token);

        return token;
    }

    public async isAccessTokenValid(): Promise<boolean> {
        try {
            await firstValueFrom(this.http.post(`${ API }/access-token-validity`, {}, { headers: authHeader(), responseType: 'text', }));
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    // eslint-disable-next-line class-methods-use-this
    public async logout(): Promise<void> {
        localStorage.removeItem(ACCESS_TOKEN_KEY_HEADER);
    }

    public async changeUserPassword(password: string): Promise<string> {
        return firstValueFrom(this.http.patch(`${ API }/user/password`, { password, }, { headers: authHeader(), responseType: 'text', }));
    }

    public async changeAccessPointPassword(password: string): Promise<string> {
        return firstValueFrom(this.http.patch(`${ API }/access-point/password`, { password, }, { headers: authHeader(), responseType: 'text', }));
    }
}
