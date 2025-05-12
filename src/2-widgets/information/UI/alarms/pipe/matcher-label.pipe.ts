import { Pipe, PipeTransform } from '@angular/core';
import { AlarmMatcher } from '@entities/alarm';
import { AlarmMatcherType } from '@entities/alarm/model/alarm-matcher';

@Pipe({
    name: 'matcherLabel',
})
export class MatcherLabelPipe implements PipeTransform {
    // eslint-disable-next-line class-methods-use-this
    public transform<T = void>(matcher: AlarmMatcher<T>): string {
        switch (matcher.tag) {
            case AlarmMatcherType.IGNORE:
                return 'Ignore';
            case AlarmMatcherType.MATCH:
                return 'Match';
            case AlarmMatcherType.DO_NOT_MATCH:
                return 'Do not match';
        }
    }
}
