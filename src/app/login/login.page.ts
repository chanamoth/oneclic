import { Component } from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage {

    passwordType: string = 'password';
    passwordIcon: string = 'eye-off-outline';

    constructor() { }

    togglePasswordVisibility() {
        this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
        this.passwordIcon = this.passwordIcon === 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline';
    }
}