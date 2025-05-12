import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { ClockService } from '@shared/service/clock.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { error, ok, Result } from '@shared';
import { AlarmWithId } from '@entities/alarm';
import { DisplayAlarmsComponent } from '@widgets/information/UI/alarms/display-alarms/display-alarms.component';
import { AlarmService } from '@shared/service/alarm.service';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'widget-information',
    imports: [
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardContent,
        DatePipe,
        MatProgressSpinner,
        DisplayAlarmsComponent,
        MatButtonToggle,
        MatButtonToggleGroup,
        FormsModule,
    ],
    templateUrl: './information.component.html',
    styleUrl: './information.component.css',
})
export class InformationComponent implements OnInit {
    protected alarms: AlarmWithId[] = [];

    protected outputIndex: number = 0;
    protected validOutputIndexes: number[] = [];
    protected systemTimestamp?: Result<number, string>;

    public constructor(
        private readonly snackBar: MatSnackBar,
        private readonly clockService: ClockService,
        private readonly alarmService: AlarmService
    ) {}

    public async ngOnInit(): Promise<void> {
        this.validOutputIndexes = await this.alarmService.getValidOutputIndexes();
        await this.syncAlarmsByOutputIndex();

        await this.syncTime();

        setInterval(async(): Promise<void> => {
            if (this.systemTimestamp && this.systemTimestamp.tag === 'Ok') {
                this.systemTimestamp = ok(this.systemTimestamp.value + 1_000);
            }
        }, 1_000);

        /* Synchronize time on every 10 seconds */
        setInterval(async(): Promise<void> => {
            await this.syncTime();
        }, 10_000);
    }

    protected async syncTime(): Promise<void> {
        this.systemTimestamp = undefined;
        try {
            this.systemTimestamp = ok(await this.clockService.getSystemTimestamp());
        } catch (err) {
            console.error(err);
            this.systemTimestamp = error(`Can't fetch system time`);
        }
    }

    protected async syncAlarmsByOutputIndex(): Promise<void> {
        this.alarms = await this.alarmService.getAlarms(this.outputIndex);
    }

    protected async alarmDeleted(alarmWithId: AlarmWithId): Promise<void> {
        await this.alarmService.deleteAlarm(alarmWithId.id.output_index, alarmWithId.id.identifier);
        this.snackBar.open('Alarm deleted successfully.', 'Close', { duration: 3000, });
        await this.syncAlarmsByOutputIndex();
    }
}
