import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Login } from '../../Model/login';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  loginObj: Login = new Login();
  router = inject(Router);

  hardcodedUsers = [
    { email: 'test@123gmail.com', password: '123' },
    { email: 'varun', password: 'Vs@1718' },
    { email: 'sathiya', password: 'Vs@1718' },
  ];

  message: string = '';
  messageType: string = '';

  login() {
    const user = this.hardcodedUsers.find(
      (u) =>
        u.email === this.loginObj.EmailId &&
        u.password === this.loginObj.Password
    );

    if (user) {
      const fakeToken = 'fake-jwt-token-1234567890';
      sessionStorage.setItem('authToken', fakeToken);
      this.message = 'Login successful!';
      this.messageType = 'success';
      setTimeout(() => {
        this.router.navigateByUrl('personal');
      }, 1000);
    } else {
      this.message = 'Invalid credentials! Try again.';
      this.messageType = 'error';
    }
  }
}
