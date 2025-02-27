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

  hardcodedUser = { email: 'test@123gmai.com', password: '123' };

  login() {
    if (
      this.loginObj.EmailId === this.hardcodedUser.email &&
      this.loginObj.Password === this.hardcodedUser.password
    ) {
      const fakeToken = 'fake-jwt-token-1234567890';
      localStorage.setItem('authToken', fakeToken);
      alert('Login successful! Token stored.');
      this.router.navigateByUrl('layout');
    } else {
      alert('Invalid credentials! Try again.');
    }
  }
}
