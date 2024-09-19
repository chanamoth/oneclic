import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    //styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    //loginForm: FormGroup; // Verifica que esto esté declarado correctamente

    constructor(private formBuilder: FormBuilder, private router: Router) { }

    ngOnInit() {
        /*this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });*/
    }

    onSubmit() {
        /*if (this.loginForm.valid) {
            // Lógica para iniciar sesión
            this.router.navigate(['/home']);
        }*/
    }
}