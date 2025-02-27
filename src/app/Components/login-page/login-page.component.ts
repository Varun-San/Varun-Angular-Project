import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Login } from '../../Model/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  loginObj: Login = new Login();
  router = inject(Router);

  hardcodedUsers = [
    { email: 'test@123gmail.com', password: '123' },
    { email: 'varun@gmail.com', password: 'Vs@1718' },
    {
      email: 'sathiya',
      password: 'Vs@1718',
    },
  ];

  message: string = ''; // To store the login message
  messageType: string = ''; // To control the message style (success/error)

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
        this.router.navigateByUrl('home');
      }, 1500); // Redirect after 1.5 seconds
    } else {
      this.message = 'Invalid credentials! Try again.';
      this.messageType = 'error';
    }
  }
}
