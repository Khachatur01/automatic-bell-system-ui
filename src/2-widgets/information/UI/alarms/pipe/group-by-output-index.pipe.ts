import { Pipe, PipeTransform } from '@angular/core';
import { AlarmWithId } from '@entities/alarm';

@Pipe({
    name: 'groupByOutputIndex',
})
export class GroupByOutputIndexPipe implements PipeTransform {
    // eslint-disable-next-line class-methods-use-this
    public transform(alarms: AlarmWithId[]): Record<number, AlarmWithId[]> {
        // @ts-expect-error groupBy function of Object type is not yet stable feature
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-return
        return Object.groupBy(alarms, (alarmWithId: AlarmWithId): number => alarmWithId.id.output_index);
    }
}
