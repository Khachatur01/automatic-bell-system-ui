import { Component, input, InputSignal } from '@angular/core';
import { AlarmWithId } from '@entities/alarm';
import { JoinPipe } from '@shared';
import { MatcherLabelPipe } from '@widgets/information/UI/alarms/pipe/matcher-label.pipe';
import { MatcherSegmentsPipe } from '@widgets/information/UI/alarms/pipe/matcher-segments.pipe';

@Component({
    selector: 'widget-display-alarm',
    imports: [
        JoinPipe,
        MatcherLabelPipe,
        MatcherSegmentsPipe,
    ],
    templateUrl: './display-alarm.component.html',
    styleUrl: './display-alarm.component.css',
})
export class DisplayAlarmComponent {
    public readonly alarmWithId: InputSignal<AlarmWithId> = input.required();
}
