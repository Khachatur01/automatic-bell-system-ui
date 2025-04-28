import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'join',
})
export class JoinPipe implements PipeTransform {
    // eslint-disable-next-line class-methods-use-this
    public transform<T>(list: T[], separator: string): string {
        return list.join(separator);
    }
}
