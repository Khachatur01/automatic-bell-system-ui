import { AfterViewInit, Component, OnInit, Signal, viewChild } from '@angular/core';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '@shared';

@Component({
  selector: 'page-main',
    imports: [
        MatSidenav,
        MatSidenavContainer,
        MatNavList,
        MatListItem,
        MatIcon,
        MatSidenavContent,
        MatToolbar,
        MatIconButton,
        RouterOutlet,
        RouterLink,
    ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit, AfterViewInit {
    protected sidenav: Signal<MatSidenav> = viewChild.required(MatSidenav);
    protected isMobile: boolean = true;

    public constructor(
        private readonly authService: AuthService,
        private readonly observer: BreakpointObserver,
        private readonly router: Router
    ) {}

    public ngOnInit(): void {
        this.observer.observe([ '(max-width: 800px)', ]).subscribe((screenSize: BreakpointState): void => {
            this.isMobile = screenSize.matches;
        });
    }

    public async ngAfterViewInit(): Promise<void> {
        if (!this.isMobile) {
            await this.sidenav().open();
        }
    }

    protected async toggleMenu(): Promise<void> {
        await this.sidenav().toggle();
    }

    protected async logout(): Promise<void> {
        await this.authService.logout();
        await this.router.navigate([ '/', 'login', ]);
    }

    // public currentTime: Date = new Date();
    // public loadingTime: boolean = false;
    // public updatingTime: boolean = false;
    // public isSidebarOpen: boolean = false;
    // public settingsOpen: boolean = false;
    //
    // public constructor(
    //     private readonly clockService: ClockService,
    //     private readonly snackBar: MatSnackBar,
    //     private readonly router: Router
    // ) {}
    //
    // public async ngOnInit(): Promise<void> {
    //     // await this.refreshTime();
    //     // setInterval(async() => this.refreshTime(), 10000); // Refresh every 10 sec
    // }
    //
    // public async refreshTime(): Promise<void> {
    //     try {
    //         this.loadingTime = true;
    //         const timestamp: number = await this.clockService.getClock();
    //         this.currentTime = new Date(timestamp);
    //     } catch (err) {
    //         this.snackBar.open('Failed to fetch time.', 'Close', { duration: 3000, });
    //         console.error(err);
    //     } finally {
    //         this.loadingTime = false;
    //     }
    // }
    //
    // public async setClock(newDate: Date): Promise<void> {
    //     try {
    //         this.updatingTime = true;
    //         await this.clockService.setClock(newDate);
    //         this.snackBar.open('Time updated successfully!', 'Close', { duration: 3000, });
    //         await this.refreshTime();
    //     } catch (err) {
    //         this.snackBar.open('Failed to update time.', 'Close', { duration: 3000, });
    //         console.error(err);
    //     } finally {
    //         this.updatingTime = false;
    //     }
    // }
    //
    // public async logout(): Promise<void> {
    //     localStorage.removeItem('access_token');
    //     await this.router.navigate([ '/login', ]);
    // }
    //
    // public toggleSidebar(): void {
    //     this.isSidebarOpen = !this.isSidebarOpen;
    // }
    //
    // public toggleSettings(): void {
    //     this.settingsOpen = !this.settingsOpen;
    // }
}
