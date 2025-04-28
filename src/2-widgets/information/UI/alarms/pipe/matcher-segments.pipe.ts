import { Pipe, PipeTransform } from '@angular/core';
import { AlarmMatcher } from '@entities/alarm';

@Pipe({
    name: 'matcherSegments',
})
export class MatcherSegmentsPipe implements PipeTransform {
    // eslint-disable-next-line class-methods-use-this
    public transform<T = void>(matcher: AlarmMatcher<T>): T[] {
        if (matcher.tag === 'Match' || matcher.tag === 'DoNotMatch') {
            return matcher.segments;
        }
        return [];
    }
}
