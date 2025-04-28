export enum AlarmMatcherType {
    IGNORE = 'Ignore',
    MATCH = 'Match',
    DO_NOT_MATCH = 'DoNotMatch'
}

export interface Ignore {
    tag: AlarmMatcherType.IGNORE;
}

export interface Match<T = void> {
    tag: AlarmMatcherType.MATCH;
    segments: T[];
}

export interface DoNotMatch<T = void> {
    tag: AlarmMatcherType.DO_NOT_MATCH;
    segments: T[];
}

export function ignore(): Ignore {
    return {
        tag: AlarmMatcherType.IGNORE,
    };
}

export function match<T = void>(segments: T[]): Match<T> {
    return {
        tag: AlarmMatcherType.MATCH,
        segments,
    };
}

export function doNotMatch<T = void>(segments: T[]): DoNotMatch<T> {
    return {
        tag: AlarmMatcherType.DO_NOT_MATCH,
        segments,
    };
}

export type AlarmMatcher<T = void> = Ignore | Match<T> | DoNotMatch<T>;
