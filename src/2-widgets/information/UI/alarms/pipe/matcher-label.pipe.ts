import { Pipe, PipeTransform } from '@angular/core';
import { AlarmMatcher } from '@entities/alarm';

@Pipe({
    name: 'matcherLabel',
})
export class MatcherLabelPipe implements PipeTransform {
    // eslint-disable-next-line class-methods-use-this
    public transform<T = void>(matcher: AlarmMatcher<T>): string {
        switch (matcher.tag) {
            case 'Ignore':
                return 'Ignore';
            case 'Match':
                return 'Match';
            case 'DoNotMatch':
                return 'Do not match';
            default:
                return '';
        }
    }
}
