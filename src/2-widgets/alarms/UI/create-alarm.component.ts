import { Component, OnInit } from '@angular/core';
import { Alarm, AlarmMatcher, Month, Segment, SegmentType, WeekDay } from '@entities/alarm';
import { AlarmMatcherType, doNotMatch, ignore, match } from '@entities/alarm/model/alarm-matcher';
import { SegmentInputComponent } from '@widgets/alarms/UI/segment-input/segment-input.component';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { SegmentTitlePipe } from '@widgets/alarms/pipe/segment-title.pipe';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AlarmService } from '@shared/service/alarm.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
    selector: 'widget-alarms',
    imports: [
        SegmentInputComponent,
        MatCard,
        MatCardTitle,
        MatCardHeader,
        MatCardContent,
        MatButtonToggleGroup,
        MatButtonToggle,
        FormsModule,
        SegmentTitlePipe,
        MatFormField,
        MatLabel,
        MatInput,
        MatIcon,
        MatFabButton,
    ],
    templateUrl: './create-alarm.component.html',
    styleUrl: './create-alarm.component.css',
})
export class CreateAlarmComponent implements OnInit {
    protected readonly AlarmMatcherType: typeof AlarmMatcherType = AlarmMatcherType;

    protected readonly validMatcherTypes: string[] = Object.values(AlarmMatcherType);
    protected validOutputIndexes: number[] = [];

    protected outputIndex: number = 0;
    protected impulseLength: number = 5000;

    protected segments: Segment[] = CreateAlarmComponent.getInitialSegments();

    public constructor(
        private readonly alarmService: AlarmService,
        private readonly snackBar: MatSnackBar
    ) {}

    public async ngOnInit(): Promise<void> {
        this.validOutputIndexes = await this.alarmService.getValidOutputIndexes();
    }

    protected changeSegmentMatcher(segmentType: SegmentType, matcherType: AlarmMatcherType): void {
        const foundSegment: Segment | undefined = this.segments.find((segment: Segment): boolean => segment.type === segmentType);

        if (!foundSegment) {
            return;
        }

        switch (matcherType) {
            case AlarmMatcherType.IGNORE: {
                foundSegment.alarmMatcher = ignore();
                break;
            }
            case AlarmMatcherType.MATCH: {
                foundSegment.alarmMatcher = match([]);
                break;
            }
            case AlarmMatcherType.DO_NOT_MATCH: {
                foundSegment.alarmMatcher = doNotMatch([]);
                break;
            }
        }
    }

    // eslint-disable-next-line class-methods-use-this
    protected onImpulseLengthInput(event: Event): void {
        const inputElement: HTMLInputElement = event.target as HTMLInputElement;
        const value: string = inputElement.value.replace(/\D/gu, '');

        this.impulseLength = parseInt(value, 10) || 0;

        inputElement.value = `${ this.impulseLength }`;
    }

    protected async createAlarm(): Promise<void> {
        // @ts-expect-error groupBy function of Object type is not yet stable feature
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
        const groupedSegment: Record<SegmentType, Segment[]> = Object.groupBy(this.segments, (segment: Segment): SegmentType => segment.type);

        const alarm: Alarm = {
            year: groupedSegment[SegmentType.YEAR][0].alarmMatcher as AlarmMatcher<number>,
            month: groupedSegment[SegmentType.MONTH][0].alarmMatcher as AlarmMatcher<Month>,
            month_day: groupedSegment[SegmentType.MONTH_DAY][0].alarmMatcher as AlarmMatcher<number>,
            week_day: groupedSegment[SegmentType.WEEK_DAY][0].alarmMatcher as AlarmMatcher<WeekDay>,
            hour: groupedSegment[SegmentType.HOUR][0].alarmMatcher as AlarmMatcher<number>,
            minute: groupedSegment[SegmentType.MINUTE][0].alarmMatcher as AlarmMatcher<number>,
            second: groupedSegment[SegmentType.SECOND][0].alarmMatcher as AlarmMatcher<number>,
            impulse_length_millis: this.impulseLength,
        };

        try {
            await this.alarmService.createAlarm(this.outputIndex, alarm);
            this.segments = CreateAlarmComponent.getInitialSegments();
            this.snackBar.open('New alarm created.', 'Close', { duration: 3000, });
        } catch (err) {
            this.snackBar.open('Failed to create new alarm.', 'Close', { duration: 3000, });
            console.error(err);
        }
    }

    private static getInitialSegments(): Segment[] {
        const currentYear: number = new Date().getFullYear();
        return [
            {
                type: SegmentType.YEAR,
                alarmMatcher: ignore(),
                validValues: Array(100)
                    .fill(0)
                    .map((_: number, index: number): number => index + currentYear),
            },
            {
                type: SegmentType.MONTH,
                alarmMatcher: ignore(),
                validValues: Object.values(Month),
            },
            {
                type: SegmentType.MONTH_DAY,
                alarmMatcher: ignore(),
                validValues: Array(31)
                    .fill(0)
                    .map((_: number, index: number): number => index + 1),
            },
            {
                type: SegmentType.WEEK_DAY,
                alarmMatcher: ignore(),
                validValues: Object.values(WeekDay),
            },
            {
                type: SegmentType.HOUR,
                alarmMatcher: ignore(),
                validValues: Array(24)
                    .fill(0)
                    .map((_: number, index: number): number => index),
            },
            {
                type: SegmentType.MINUTE,
                alarmMatcher: ignore(),
                validValues: Array(60)
                    .fill(0)
                    .map((_: number, index: number): number => index),
            },
            {
                type: SegmentType.SECOND,
                alarmMatcher: ignore(),
                validValues: Array(60)
                    .fill(0)
                    .map((_: number, index: number): number => index),
            },
        ];
    }
}
