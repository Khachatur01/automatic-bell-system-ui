import { Pipe, PipeTransform } from '@angular/core';
import { AlarmMatcher } from '@entities/alarm';
import { AlarmMatcherType } from '@entities/alarm/model/alarm-matcher';

@Pipe({
    name: 'matcherSegments',
})
export class MatcherSegmentsPipe implements PipeTransform {
    // eslint-disable-next-line class-methods-use-this
    public transform<T = void>(matcher: AlarmMatcher<T>): T[] {
        if (matcher.tag === AlarmMatcherType.MATCH || matcher.tag === AlarmMatcherType.DO_NOT_MATCH) {
            return matcher.segments;
        }
        return [];
    }
}
