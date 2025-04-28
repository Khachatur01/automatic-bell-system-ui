import { Pipe, PipeTransform } from '@angular/core';
import { SegmentType } from '@entities/alarm';

@Pipe({
    name: 'segmentTitle',
})
export class SegmentTitlePipe implements PipeTransform {
    // eslint-disable-next-line class-methods-use-this
    public transform(segmentType: SegmentType): string {
        switch (segmentType) {
            case SegmentType.YEAR:
                return 'Year';
            case SegmentType.MONTH:
                return 'Month';
            case SegmentType.MONTH_DAY:
                return 'Month Day';
            case SegmentType.WEEK_DAY:
                return 'Week Day';
            case SegmentType.HOUR:
                return 'Hour';
            case SegmentType.MINUTE:
                return 'Minute';
            case SegmentType.SECOND:
                return 'Second';
        }
    }
}
