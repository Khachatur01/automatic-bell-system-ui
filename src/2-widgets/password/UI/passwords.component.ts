import { Component } from '@angular/core';
import {
    ChangeAccessPointPasswordComponent
} from '@widgets/password/UI/change-access-point-password/change-access-point-password.component';
import { ChangeUserPasswordComponent } from '@widgets/password/UI/change-user-password/change-user-password.component';

@Component({
    selector: 'widget-passwords',
    imports: [
        ChangeAccessPointPasswordComponent,
        ChangeUserPasswordComponent,
    ],
    templateUrl: './passwords.component.html',
    styleUrl: './passwords.component.css',
})
export class PasswordsComponent {

}
