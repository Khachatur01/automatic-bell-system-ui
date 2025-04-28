export interface Error<E = unknown> {
    tag: 'Error';
    error: E;
}

export interface Ok<T = void> {
    tag: 'Ok';
    value: T;
}

export type Result<T = void, E = unknown> = Error<E> | Ok<T>;

export function ok<T = void>(value: T): Ok<T> {
    return {
        tag: 'Ok',
        value,
    };
}

export function error<E = unknown>(error: E): Error<E> {
    return {
        tag: 'Error',
        error,
    };
}
